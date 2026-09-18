// 作品详情页目录侧栏：由正文 h2/h3 构建（外部脚本，兼容严格 CSP）
(function () {
	'use strict';

	function ready(fn) {
		if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
		else fn();
	}

	ready(function () {
		var content = document.getElementById('content');
		var toc = document.getElementById('toc');
		var aside = document.querySelector('.toc');
		if (!content || !toc || !aside) return;

		var headings = Array.prototype.slice.call(content.querySelectorAll('h2, h3'));
		if (headings.length === 0) {
			aside.setAttribute('hidden', '');
			return;
		}

		var usedIds = {};
		headings.forEach(function (h) {
			if (!h.id) {
				var base = (h.textContent || '').trim().replace(/\s+/g, '-').slice(0, 40) || 'section';
				var id = base;
				var n = 1;
				while (usedIds[id]) id = base + '-' + n++;
				usedIds[id] = true;
				h.id = encodeURIComponent(id);
			} else {
				usedIds[h.id] = true;
			}
		});

		headings.forEach(function (h) {
			var a = document.createElement('a');
			a.href = '#' + h.id;
			a.textContent = h.textContent || '';
			if (h.tagName === 'H3') a.className = 'sub';
			toc.appendChild(a);
		});
	});
})();
