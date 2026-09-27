import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectsCollection = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
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
