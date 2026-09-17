// 主题初始化与切换。放在 <head> 中同步加载以避免深色模式闪白（FOUC）。
// 约定：html[data-theme="dark"|"light"]；无存储时跟随系统。
(function () {
	'use strict';
	var STORAGE_KEY = 'theme';
	var root = document.documentElement;

	function systemDark() {
		return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	function apply(theme) {
		root.dataset.theme = theme;
		try {
			localStorage.setItem(STORAGE_KEY, theme);
		} catch (e) {
			/* 隐私模式下 localStorage 不可用，忽略 */
		}
	}

	var stored = null;
	try {
		stored = localStorage.getItem(STORAGE_KEY);
	} catch (e) {
		/* 忽略 */
	}
	root.dataset.theme = stored === 'dark' || stored === 'light' ? stored : systemDark() ? 'dark' : 'light';

	// 事件委托：页面上任何带 data-theme-toggle 的按钮都可切换主题
	document.addEventListener('click', function (event) {
		var target = event.target && event.target.closest ? event.target.closest('[data-theme-toggle]') : null;
		if (!target) return;
		apply(root.dataset.theme === 'dark' ? 'light' : 'dark');
	});
})();
