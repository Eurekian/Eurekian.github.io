import { getCollection, render } from 'astro:content';
import { experimental_AstroContainer } from 'astro/container';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

const WORK_COLLECTIONS = ['math', 'physics', 'code', 'essays'] as const;

export async function GET(context) {
	const entries = (
		await Promise.all(
			WORK_COLLECTIONS.map(async (collection) => {
				const list = await getCollection(collection, ({ data }) => !data.draft);
				return list.map((entry) => ({ entry, collection }));
			})
		)
	).flat();

	entries.sort((a, b) => b.entry.data.pubDate.valueOf() - a.entry.data.pubDate.valueOf());

	// 全文输出：容器 API 逐篇把 Markdown（含 KaTeX 公式 HTML）渲染为 HTML，
	// 相对链接补全为绝对地址以便阅读器解析
	const container = await experimental_AstroContainer.create();
	const items = await Promise.all(
		entries.map(async ({ entry, collection }) => {
			const { Content } = await render(entry);
			let html = '';
			try {
				html = await container.renderToString(Content);
				html = html.replace(/(src|href)="\//g, '$1="https://eurekian.github.io/');
			} catch {
				html = '';
			}
			return {
				title: entry.data.title,
				description: entry.data.description,
				pubDate: entry.data.pubDate,
				link: `/${collection}/${entry.id}/`,
				...(html ? { content: html } : {}),
			};
		})
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
	});
}
