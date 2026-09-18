// 站内搜索：三种模式
//   标题 — /titles.json 客户端子串匹配（精确，零漏报零误报）
//   正文 — Pagefind 本地索引（中文按分词匹配，建议搜词组）
//   全部 — 标题命中在前 + 正文命中去重合并
// 结果渲染：每条一行 = [分类徽标] 标题（命中处高亮）；仅正文来源附一行短摘要。
(function () {
	'use strict';

	var MODES = ['all', 'title', 'body'];
	var MODE_LABELS = { all: '全部', title: '标题', body: '正文' };
	var mode = 'all';
	var pagefind = null;
	var pagefindLoading = false;
	var titlesCache = null;
	var debounceTimer = undefined;
	var currentItems = [];

	function ready(fn) {
		if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
		else fn();
	}

	ready(function () {
		var backdrop = document.getElementById('search-backdrop');
		var dialog = document.getElementById('search-dialog');
		var input = document.getElementById('search-input');
		var statusEl = document.getElementById('search-status');
		var resultsEl = document.getElementById('search-results');
		var modeBar = document.getElementById('search-modes');
		if (!backdrop || !dialog || !input || !modeBar) return;

		function open() {
			backdrop.hidden = false;
			dialog.hidden = false;
			input.focus();
		}
		function close() {
			backdrop.hidden = true;
			dialog.hidden = true;
			hidePopover();
		}

		/* ---------- 数据源 ---------- */

		function ensurePagefind() {
			if (pagefind) return Promise.resolve(pagefind);
			if (pagefindLoading) return Promise.resolve(null);
			pagefindLoading = true;
			return import('/pagefind/pagefind.js')
				.then(function (m) {
					pagefind = m;
					return m;
				})
				.catch(function () {
					statusEl.textContent = '搜索索引加载失败，请刷新重试';
					return null;
				})
				.finally(function () {
					pagefindLoading = false;
				});
		}

		function ensureTitles() {
			if (titlesCache) return Promise.resolve(titlesCache);
			return fetch('/titles.json')
				.then(function (r) {
					return r.json();
				})
				.then(function (d) {
					titlesCache = d.items || [];
					return titlesCache;
				})
				.catch(function () {
					statusEl.textContent = '标题索引加载失败，请刷新重试';
					return null;
				});
		}

		/* ---------- 两种检索 ---------- */

		function searchTitleMode(q) {
			return ensureTitles().then(function (items) {
				if (!items) return [];
				var ql = q.toLowerCase();
				return items
					.filter(function (i) {
						return i.title.toLowerCase().indexOf(ql) !== -1;
					})
					.map(function (i) {
						return { title: i.title, url: i.url, category: i.category, excerpt: null };
					});
			});
		}

		function searchBodyMode(q) {
			return ensurePagefind().then(function (pf) {
				if (!pf) return [];
				return pf.search(q).then(function (res) {
					return Promise.all(
						res.results.slice(0, 8).map(function (r) {
							return r.data().then(function (d) {
								return {
									title: (d.meta && d.meta.title) || '(无标题)',
									url: d.url,
									category: null,
									excerpt: trimExcerpt(d.excerpt || '', q),
								};
							});
						})
					);
				});
			});
		}

		// 摘要压缩：去掉标签、以命中词附近为中心截 ~40 字、单行
		function trimExcerpt(html, q) {
			var text = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
			var i = text.toLowerCase().indexOf(q.toLowerCase());
			if (i > 18) text = '…' + text.slice(i - 14);
			if (text.length > 52) text = text.slice(0, 52) + '…';
			return text;
		}

		/* ---------- 渲染 ---------- */

		function escapeHtml(s) {
			return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		}

		function highlight(title, q) {
			var escaped = escapeHtml(title);
			var i = title.toLowerCase().indexOf(q.toLowerCase());
			if (i === -1) return escaped;
			return (
				escapeHtml(title.slice(0, i)) +
				'<mark>' + escapeHtml(title.slice(i, i + q.length)) + '</mark>' +
				escapeHtml(title.slice(i + q.length))
			);
		}

		// 每条结果独立卡片：分类徽标 + 标题。悬停/聚焦时由浮层展示关联内容。
		function render(items, q) {
			currentItems = items;
			statusEl.textContent = '共 ' + items.length + ' 条结果';
			if (items.length === 0) {
				resultsEl.innerHTML = '<div class="empty">没有匹配的内容。</div>';
				return;
			}
			resultsEl.innerHTML = items
				.map(function (i, idx) {
					var badge = i.category ? '<span class="badge">' + escapeHtml(i.category) + '</span>' : '';
					return '<a class="hit" href="' + i.url + '" data-idx="' + idx + '">' + badge +
						'<span class="hit-title">' + highlight(i.title, q) + '</span></a>';
				})
				.join('');
		}

		/* ---------- 悬停浮层（行右侧，fixed 定位挂在 body，避免被弹窗滚动容器裁剪） ---------- */

		var popover = document.getElementById('search-popover');
		var canHover = window.matchMedia && window.matchMedia('(hover: hover)').matches;

		function showPopover(item, row) {
			if (!popover || !canHover || !item) return;
			var body = '';
			if (item.category) body += '<div class="pop-cat">' + escapeHtml(item.category) + '</div>';
			body += '<div class="pop-title">' + escapeHtml(item.title) + '</div>';
			var text = item.excerpt || item.description || '';
			if (text) body += '<div class="pop-text">' + escapeHtml(text) + '</div>';
			popover.innerHTML = body;
			popover.hidden = false;

			var r = row.getBoundingClientRect();
			var gap = 10;
			var margin = 8;
			var rightSpace = window.innerWidth - margin - (r.right + gap);
			var leftSpace = r.left - gap - margin;
			var pw;
			var left;
			if (rightSpace >= 180) {
				// 右侧空间足够：行右侧浮出（宽度按剩余空间收缩，上限 320）
				pw = Math.min(320, rightSpace);
				left = r.right + gap;
			} else if (leftSpace >= 180) {
				pw = Math.min(320, leftSpace);
				left = r.left - gap - pw;
			} else {
				// 两侧都窄（极窄视口）：贴边全宽
				pw = window.innerWidth - 2 * margin;
				left = margin;
			}
			popover.style.maxWidth = pw + 'px';
			var top = Math.max(margin, Math.min(r.top, window.innerHeight - 80));
			popover.style.left = left + 'px';
			popover.style.top = top + 'px';
		}

		function hidePopover() {
			if (popover) popover.hidden = true;
		}

		if (popover) document.body.appendChild(popover);

		resultsEl.addEventListener('mouseover', function (e) {
			var row = e.target && e.target.closest ? e.target.closest('a.hit') : null;
			if (!row) return;
			var idx = parseInt(row.dataset.idx, 10);
			showPopover(currentItems[idx], row);
		});
		resultsEl.addEventListener('mouseout', function (e) {
			var row = e.target && e.target.closest ? e.target.closest('a.hit') : null;
			if (row) hidePopover();
		});
		resultsEl.addEventListener('focusin', function (e) {
			var row = e.target && e.target.closest ? e.target.closest('a.hit') : null;
			if (!row) return;
			var idx = parseInt(row.dataset.idx, 10);
			showPopover(currentItems[idx], row);
		});
		resultsEl.addEventListener('focusout', hidePopover);
		window.addEventListener('scroll', hidePopover, true);
		window.addEventListener('resize', hidePopover);

		function runSearch() {
			var q = input.value.trim();
			if (q.length < 2) {
				statusEl.textContent = '';
				resultsEl.innerHTML = '';
				return;
			}
			statusEl.textContent = '搜索中…';
			var job;
			if (mode === 'title') job = searchTitleMode(q);
			else if (mode === 'body') job = searchBodyMode(q);
			else {
				// 全部：标题命中在前，正文命中去重合并
				job = Promise.all([searchTitleMode(q), searchBodyMode(q)]).then(function (parts) {
					var seen = {};
					var merged = [];
					parts[0].concat(parts[1]).forEach(function (item) {
						if (seen[item.url]) return;
						seen[item.url] = true;
						merged.push(item);
					});
					return merged;
				});
			}
			job.then(function (items) {
				render(items, q);
			});
		}

		/* ---------- 事件 ---------- */

		modeBar.addEventListener('click', function (e) {
			var btn = e.target && e.target.closest ? e.target.closest('button[data-mode]') : null;
			if (!btn || MODES.indexOf(btn.dataset.mode) === -1) return;
			mode = btn.dataset.mode;
			modeBar.querySelectorAll('button').forEach(function (b) {
				b.classList.toggle('active', b === btn);
			});
			if (input.value.trim().length >= 2) runSearch();
			else input.focus();
		});

		document.addEventListener('click', function (e) {
			var el = e.target && e.target.closest ? e.target.closest('[data-search-open]') : null;
			if (el) {
				e.preventDefault();
				open();
			}
		});

		backdrop.addEventListener('click', close);
		document.addEventListener('keydown', function (e) {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				if (dialog.hidden) open();
				else close();
			}
			if (e.key === 'Escape' && !dialog.hidden) close();
		});

		input.addEventListener('input', function () {
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(runSearch, 180);
		});
	});
})();
