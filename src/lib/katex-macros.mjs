// 全局 KaTeX 宏：覆盖 physics 宏包常用记号与 siunitx 的 \qty 近似。
// 在构建时由 rehype-katex 应用（astro.config.mjs），写作时可直接使用。
export const katexMacros = {
	// 狄拉克记号
	'\\bra': '\\left\\langle #1 \\right\\rvert',
	'\\ket': '\\left\\lvert #1 \\right\\rangle',
	'\\braket': '\\left\\langle #1 \\middle| #2 \\right\\rangle',
	'\\mel': '\\left\\langle #1 \\middle| #2 \\middle| #3 \\right\\rangle',
	'\\ev': '\\left\\langle #1 \\right\\rangle',
	// 算符与括号
	'\\comm': '\\left[ #1, #2 \\right]',
	'\\abs': '\\left\\lvert #1 \\right\\rvert',
	'\\norm': '\\left\\lVert #1 \\right\\rVert',
	// 微分
	'\\dv': '\\frac{\\mathrm{d} #1}{\\mathrm{d} #2}',
	'\\pdv': '\\frac{\\partial #1}{\\partial #2}',
	'\\dd': '\\,\\mathrm{d}',
	// 矢量分析（\div 与 LaTeX 内建除号冲突，故用 \divergence）
	'\\grad': '\\nabla',
	'\\divergence': '\\nabla \\cdot',
	'\\curl': '\\nabla \\times',
	'\\laplacian': '\\nabla^{2}',
	// siunitx 的 \qty{数值}{单位} 近似（单位直立排版）
	'\\qty': '#1\\,\\mathrm{#2}',
};
