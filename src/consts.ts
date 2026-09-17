// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Eurekian的博客';
export const SITE_DESCRIPTION = '数学 · 物理 · 计算 · 文章：Eurekian 的个人作品站';

// 四类作品集合的展示元数据：导航、首页分类卡、列表页共用
export const COLLECTIONS = [
	{
		name: 'math',
		label: '数学',
		description: '数学笔记、定理与证明、LaTeX 模板与速查手册',
	},
	{
		name: 'physics',
		label: '物理',
		description: '物理学习笔记与计算物理项目',
	},
	{
		name: 'code',
		label: '代码',
		description: '代码作品、脚本与工具',
	},
	{
		name: 'essays',
		label: '文章',
		description: '个人文章与讲解',
	},
] as const;

export type CollectionName = (typeof COLLECTIONS)[number]['name'];
