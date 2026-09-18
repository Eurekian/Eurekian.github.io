// 管理后台部署状态条：保存文章后刷新后台即可看到构建状态；
// 失败时给出常见原因与解决步骤（数据来自 GitHub 公共 API，无需登录）。
(function () {
	'use strict';

	var API =
		'https://api.github.com/repos/Eurekian/Eurekian.github.io/actions/runs?per_page=1';

	function el(tag, styles, text) {
		var e = document.createElement(tag);
		if (styles) Object.keys(styles).forEach(function (k) { e.style[k] = styles[k]; });
		if (text) e.textContent = text;
		return e;
	}

	function banner(level, html) {
		var colors = {
			fail: { background: '#b3261e', color: '#fff' },
			building: { background: '#8a5a00', color: '#fff' },
		};
		var c = colors[level];
		var bar = el('div', {
			position: 'fixed',
			top: '0',
			left: '0',
			right: '0',
			zIndex: '9999',
			padding: '10px 16px',
			fontSize: '14px',
			lineHeight: '1.7',
			boxSizing: 'border-box',
			background: c.background,
			color: c.color,
			boxShadow: '0 2px 8px rgba(0,0,0,.3)',
		});
		var inner = el('div', {
			maxWidth: '52em',
			margin: '0 auto',
		});
		inner.innerHTML = html;
		bar.appendChild(inner);
		var close = el('button', {
			position: 'absolute',
			top: '8px',
			right: '12px',
			background: 'transparent',
			border: 'none',
			color: c.color,
			fontSize: '16px',
			cursor: 'pointer',
		}, '×');
		close.setAttribute('aria-label', '关闭提示');
		close.addEventListener('click', function () { bar.remove(); });
		bar.appendChild(close);
		document.body.appendChild(bar);
		// 避免遮挡页面顶部内容
		document.body.style.paddingTop = bar.offsetHeight + 'px';
	}

	function successPill(timeText) {
		var pill = el('div', {
			position: 'fixed',
			right: '14px',
			bottom: '14px',
			zIndex: '9999',
			padding: '6px 14px',
			borderRadius: '999px',
			background: '#1b7f3b',
			color: '#fff',
			fontSize: '13px',
			boxShadow: '0 2px 8px rgba(0,0,0,.25)',
			transition: 'opacity .6s',
		}, '✓ 最近部署成功 · ' + timeText);
		document.body.appendChild(pill);
		setTimeout(function () { pill.style.opacity = '0'; }, 6000);
		setTimeout(function () { pill.remove(); }, 7000);
	}

	function fmtTime(iso) {
		try {
			return new Date(iso).toLocaleString('zh-CN', { hour12: false });
		} catch (e) {
			return iso;
		}
	}

	function show(run) {
		var title = (run.head_commit && run.head_commit.message ? run.head_commit.message : '')
			.split('\n')[0].slice(0, 40);
		var t = fmtTime(run.created_at);
		if (run.status !== 'completed') {
			banner('building',
				'<strong>⟳ 正在构建部署中</strong>（提交：' + title + '）<br>' +
				'保存后约需 1–2 分钟；完成后刷新本页可看到结果。');
			return;
		}
		if (run.conclusion === 'failure') {
			banner('fail',
				'<strong>⚠ 最新一次部署失败，本次修改未上线</strong>（提交：' + title + ' · ' + t + '）<br>' +
				'常见原因与解法：<br>' +
				'1. <b>内容自检拦截</b>——富文本模式损坏了公式/表格 → 在编辑器里切换到<b>源码模式</b>，按 <a style="color:#ffd6d3" href="' + run.html_url + '" target="_blank" rel="noopener">构建日志</a> 中给出的文件与行号修复后重新保存；<br>' +
				'2. <b>必填字段缺失</b>（标题/简介/日期）→ 打开该文章补全；<br>' +
				'3. <b>公式语法错误</b> → 对照源码修正 LaTeX。<br>' +
				'<a style="color:#ffd6d3" href="' + run.html_url + '" target="_blank" rel="noopener">→ 点此查看详细日志（GitHub Actions）</a>');
			return;
		}
		successPill(t);
	}

	function boot() {
		var testFail = location.hash === '#test-fail';
		var testBuilding = location.hash === '#test-building';
		fetch(API, { headers: { Accept: 'application/vnd.github+json' } })
			.then(function (r) { return r.json(); })
			.then(function (d) {
				var run = d.workflow_runs && d.workflow_runs[0];
				if (!run) return;
				if (testFail) run = Object.assign({}, run, { status: 'completed', conclusion: 'failure' });
				if (testBuilding) run = Object.assign({}, run, { status: 'in_progress' });
				show(run);
			})
			.catch(function () { /* 网络不可达（如未开 VPN）时静默，不打扰 */ });
	}

	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
	else boot();
})();
