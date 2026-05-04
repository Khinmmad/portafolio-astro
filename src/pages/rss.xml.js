import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { siteConfig } from '../data/site';

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: `${siteConfig.title} - Blog`,
    description: siteConfig.description,
    site: `${siteConfig.url}${siteConfig.basePath}`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `${siteConfig.basePath}/blog/${post.id}`,
    })),
    customData: `<language>es</language>`,
  });
}
