// 列表页标签筛选（纯客户端，外部脚本，兼容严格 CSP）
(function () {
	'use strict';

	function ready(fn) {
		if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
		else fn();
	}

	ready(function () {
		var group = document.querySelector('.tag-filter');
		var cards = document.querySelectorAll('#work-list .card');
		if (!group || cards.length === 0) return;

		group.addEventListener('click', function (e) {
			var btn = e.target && e.target.closest ? e.target.closest('button[data-tag]') : null;
			if (!btn) return;
			var tag = btn.dataset.tag;
			if (!tag) return;
			group.querySelectorAll('button').forEach(function (b) {
				b.classList.toggle('active', b === btn);
			});
			cards.forEach(function (card) {
				var tags = (card.getAttribute('data-tags') || '').split(' ').filter(Boolean);
				card.style.display = tag === 'all' || tags.indexOf(tag) !== -1 ? '' : 'none';
			});
		});
	});
})();
