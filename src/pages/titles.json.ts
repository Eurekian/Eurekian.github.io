// 全站作品标题索引：搜索框「标题」模式的数据源。
// 子串匹配在客户端完成，不依赖分词，因此标题搜索零漏报零误报。
import { getCollection } from 'astro:content';
import { COLLECTIONS } from '../consts';

export async function GET() {
	const items = (
		await Promise.all(
			COLLECTIONS.map(async (c) => {
				const entries = await getCollection(c.name, ({ data }) => !data.draft);
				return entries.map((e) => ({
					title: e.data.title,
					url: `/${c.name}/${e.id}/`,
					category: c.label,
					// 悬停预览用：标题命中时展示文章简介
					description: e.data.description,
				}));
			})
		)
	).flat();

	return new Response(JSON.stringify({ items }), {
		headers: { 'Content-Type': 'application/json' },
	});
}
