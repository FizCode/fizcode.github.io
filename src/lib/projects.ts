import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/** A project plus its position in the list, shown as "01", "02", … */
export type IndexedProject = Project & { index: string };

const formatIndex = (position: number) => String(position + 1).padStart(2, '0');

/** All projects in display order. The index follows the order, so reordering never leaves gaps. */
export async function getProjects(): Promise<IndexedProject[]> {
  const projects = await getCollection('projects');
  return projects
    .sort((a, b) => a.data.order - b.data.order)
    .map((project, position) => ({ ...project, index: formatIndex(position) }));
}
