// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkDirective from 'remark-directive';
import { katexMacros } from './src/lib/katex-macros.mjs';
import { remarkContainers } from './src/lib/remark-containers.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://eurekian.github.io',
	// 旧网址跳转（静态模式生成 meta-refresh 页）：两篇 LaTeX 工具文从数学移入代码
	redirects: {
		'/math/latex-cheatsheet-web': '/code/latex-cheatsheet-web/',
		'/math/latex-mathnotes-template': '/code/latex-mathnotes-template/',
	},
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [remarkMath, remarkDirective, remarkContainers],
		rehypePlugins: [
			[
				rehypeKatex,
				{
					macros: katexMacros,
					// 对非标准写法降级为警告而不是构建失败；真正的语法错误仍会报错拦截
					strict: false,
				},
			],
		],
		shikiConfig: {
			// 双主题：CSS 变量切换，深浅色跟随站点主题（见 global.css）
			themes: {
				light: 'github-light',
				dark: 'github-dark',
			},
		},
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
