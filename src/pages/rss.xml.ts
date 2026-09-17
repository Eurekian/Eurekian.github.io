import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

const WORK_COLLECTIONS = ['math', 'physics', 'code', 'essays'] as const;

export async function GET(context) {
	const items = (
		await Promise.all(
			WORK_COLLECTIONS.map(async (collection) => {
				const entries = await getCollection(collection, ({ data }) => !data.draft);
				return entries.map((entry) => ({
					title: entry.data.title,
					description: entry.data.description,
					pubDate: entry.data.pubDate,
					link: `/${collection}/${entry.id}/`,
				}));
			})
		)
	).flat();

	items.sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
	});
}
