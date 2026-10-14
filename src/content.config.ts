import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { iconNames } from '@/data/icons';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Part of the title (its end) set in bold on the project page, e.g. "Telkomsel" in "MyTelkomsel" */
      emphasis: z.string().optional(),
      /** Position on the homepage; also numbers the projects */
      order: z.number(),
      summary: z.string(),
      /** Shown in search results; defaults to `summary`. Keep it under 160 characters. */
      description: z.string().max(160).optional(),
      platform: z.string().default('Android'),
      role: z.string().optional(),
      // YAML reads `year: 2022` as a number, so accept numbers too
      year: z.coerce.string().optional(),
      team: z.coerce.string().optional(),

      // Homepage card
      tags: z.array(z.string()),
      icon: z.enum(iconNames),
      iconTone: z.enum(['primary', 'secondary', 'tertiary']).default('primary'),
      featured: z.boolean().default(false),
      badge: z.string().optional(),

      // Project page
      stack: z.array(z.string()),
      statChip: z.string().optional(),
      screens: z.array(z.object({ src: image(), alt: z.string() })).max(3).default([]),
      features: z.array(z.object({ icon: z.enum(iconNames), title: z.string(), text: z.string() })).default([]),
      highlights: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
      next: reference('projects').optional(),
    }),
});

export const collections = { projects };
