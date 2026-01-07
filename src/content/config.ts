import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		pubDate: z.date(),
        link: z.string().optional(),
		heroImage: z.string().optional(),
        priority: z.number().default(0), // Higher number = shown first
	}),
});

export const collections = {
	projects: projectsCollection,
};
