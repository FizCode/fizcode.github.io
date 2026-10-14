import { site } from '@/data/site';
import type { Project } from '@/lib/projects';

/** Structured data (schema.org) that search engines read next to the page's text. */
export type JsonLd = Record<string, unknown>;

const author = { '@type': 'Person', name: site.author, url: site.url };

export const personSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.author,
  alternateName: site.name,
  jobTitle: site.jobTitle,
  url: site.url,
  description: site.description,
  knowsAbout: site.skills,
  sameAs: site.socials.map((social) => social.href),
});

export const projectSchema = (project: Project): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.data.title,
  description: project.data.description ?? project.data.summary,
  url: `${site.url}/projects/${project.id}/`,
  keywords: project.data.stack.join(', '),
  author,
});
