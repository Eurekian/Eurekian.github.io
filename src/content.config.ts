import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 四类作品（数学/物理/代码/文章）共用同一套 frontmatter 校验，
// Sveltia CMS（P7）的编辑器字段与本 schema 一一对应。
const workSchema = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	tags: z.array(z.string()).default([]),
	// 为 true 时详情页才加载 KaTeX 样式，纯文字页不背负公式 CSS
	math: z.boolean().default(false),
	// 完整源码仓库链接（代码类作品常用）
	githubUrl: z.string().url().optional(),
	// 附件 PDF（如 LaTeX 笔记原版）在 public/files/ 下的路径
	pdfUrl: z.string().optional(),
	draft: z.boolean().default(false),
});

const workCollection = (base: string) =>
	defineCollection({
		loader: glob({ base, pattern: '**/*.{md,mdx}' }),
		schema: workSchema,
	});

// 个人信息 singleton：后台“站点设置”编辑此文件，前台首页/关于页读取
const settings = defineCollection({
	loader: glob({ base: './src/content/settings', pattern: '*.json' }),
	schema: z.object({
		name: z.string(),
		tagline: z.string(),
		bio: z.string(),
		research: z.array(z.string()).default([]),
		email: z.string().email().optional(),
		socials: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
	}),
});

export const collections = {
	math: workCollection('./src/content/math'),
	physics: workCollection('./src/content/physics'),
	code: workCollection('./src/content/code'),
	essays: workCollection('./src/content/essays'),
	settings,
};
