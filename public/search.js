// 站内搜索（Pagefind 本地索引，首次打开才加载）
// 独立外部脚本：动态 import 不经打包器改写，兼容严格 CSP（无 unsafe-eval）
(function () {
	'use strict';

	var pagefind = null;
	var loading = false;
	var debounceTimer = undefined;

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
		if (!backdrop || !dialog || !input) return;

		function open() {
			backdrop.hidden = false;
			dialog.hidden = false;
			input.focus();
		}
		function close() {
			backdrop.hidden = true;
			dialog.hidden = true;
		}

		function ensurePagefind() {
			if (pagefind) return Promise.resolve(pagefind);
			if (loading) return Promise.resolve(null);
			loading = true;
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
					loading = false;
				});
		}

		function escapeHtml(s) {
			return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		}

		function runSearch() {
			var q = input.value.trim();
			ensurePagefind().then(function (pf) {
				if (!pf) return;
				if (q.length < 2) {
					statusEl.textContent = '';
					resultsEl.innerHTML = '';
					return;
				}
				statusEl.textContent = '搜索中…';
				pf.search(q).then(function (res) {
					statusEl.textContent = '共 ' + res.results.length + ' 条结果';
					return Promise.all(res.results.slice(0, 8).map(function (r) { return r.data(); }));
				}).then(function (items) {
					resultsEl.innerHTML = items
						.map(function (i) {
							return (
								'<a class="hit" href="' + i.url + '">' +
								'<span class="hit-title">' + escapeHtml((i.meta && i.meta.title) || '(无标题)') + '</span>' +
								'<span class="hit-excerpt">' + (i.excerpt || '') + '</span></a>'
							);
						})
						.join('');
					if (items.length === 0) resultsEl.innerHTML = '<div class="empty">没有匹配的内容。</div>';
				});
			});
		}

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
