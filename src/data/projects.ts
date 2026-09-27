/**
 * Project data — the single source of truth for the Projects section.
 *
 * Kept entirely separate from the UI so projects can be added, removed or
 * reordered without touching `ProjectList.tsx`. To add a project, append an
 * object to `projects` below — the grid, the card numbering and the layout all
 * follow automatically.
 *
 * Rules for this data:
 * - Nothing invented. No fake metrics, user counts, revenue or claims.
 * - A project with no GitHub or live URL yet is `null`, not a made-up link.
 */

/** Optional preview image. Reserved for richer project visuals. */
export interface ProjectImage {
  src: string
  alt: string
}

export interface Project {
  /** Stable identifier — also used as the React key. Use a lowercase slug. */
  id: string
  name: string
  description: string
  technologies: string[]
  /** Repository URL, or null when there isn't one yet. */
  githubUrl: string | null
  /** Live URL, or null when there isn't one yet. */
  liveUrl: string | null
  /**
   * Preview image, or null.
   *
   * Reserved for richer project visuals — lightweight 3D previews, interactive
   * embeds and similar can hang off this later without reshaping the type. The
   * card ignores it for now: nothing is rendered and no 3D library is involved.
   */
  image: ProjectImage | null
  /**
   * Marks a project as one worth promoting. Carries no layout meaning yet —
   * there is deliberately no separate featured section.
   */
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'project-one',
    name: 'Project one',
    description: 'Replace this with a sentence or two on what the project does and what you built.',
    technologies: ['TypeScript', 'React', 'Node.js'],
    githubUrl: null,
    liveUrl: null,
    image: null,
    featured: true,
  },
  {
    id: 'project-two',
    name: 'Project two',
    description: 'Replace this with a sentence or two on what the project does and what you built.',
    technologies: ['Python', 'PostgreSQL'],
    githubUrl: null,
    liveUrl: null,
    image: null,
    featured: false,
  },
  {
    id: 'project-three',
    name: 'Project three',
    description: 'Replace this with a sentence or two on what the project does and what you built.',
    technologies: ['Go', 'SQLite'],
    githubUrl: null,
    liveUrl: null,
    image: null,
    featured: false,
  },
]
