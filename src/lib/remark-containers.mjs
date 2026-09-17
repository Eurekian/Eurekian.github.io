// remark-directive 容器 → 定理/定义/提示框。
// 写法（Markdown 正文中）：
//   :::theorem title="勾股定理"
//   $a^2+b^2=c^2$
//   :::
// 支持的类型见 LABELS；渲染为 <div class="thm thm-theorem" data-label="定理：勾股定理">。
const LABELS = {
	theorem: '定理',
	lemma: '引理',
	corollary: '推论',
	proposition: '命题',
	definition: '定义',
	example: '例',
	remark: '注',
	note: '提示',
	warning: '注意',
};

export function remarkContainers() {
	return (tree) => {
		walk(tree);
	};
}

function walk(node) {
	if (!node || typeof node !== 'object') return;
	if (node.type === 'containerDirective' && LABELS[node.name]) {
		const label = LABELS[node.name];
		const title = node.attributes?.title;
		node.data = node.data ?? {};
		node.data.hName = 'div';
		node.data.hProperties = {
			className: ['thm', `thm-${node.name}`],
			'data-label': title ? `${label}：${title}` : label,
		};
	}
	for (const child of node.children ?? []) walk(child);
}
