import type { Project } from '../data/projects'
import { projects } from '../data/projects'
import { usePointerTilt } from '../hooks/usePointerTilt'
import './ProjectList.css'

/** Cards are numbered by their position in the grid, so adding or reordering a
 *  project renumbers them without any edit to the data. */
const ordinal = (index: number) => String(index + 1).padStart(2, '0')

/**
 * One card. A plain function of `Project` — no state, and it knows nothing
 * about where the data comes from.
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { githubUrl, liveUrl } = project
  const cardRef = usePointerTilt<HTMLElement>()

  return (
    <article className="project-card depth-object" ref={cardRef}>
      <p className="project-card__number depth-xs">{ordinal(index)}</p>
      <h3 className="project-card__name depth-xs">{project.name}</h3>
      <p className="project-card__description">{project.description}</p>

      <ul className="project-card__tags depth-xs">
        {project.technologies.map((tech) => (
          <li className="project-card__tag" key={tech}>
            {tech}
          </li>
        ))}
      </ul>

      {/* No URLs yet means no link row at all — never a link to nowhere. */}
      {(githubUrl || liveUrl) && (
        <div className="project-card__links depth-sm">
          {githubUrl && (
            <a
              className="project-card__link"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <span className="project-card__arrow" aria-hidden="true">
                →
              </span>
            </a>
          )}

          {liveUrl && (
            <a
              className="project-card__link"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo
              <span className="project-card__arrow" aria-hidden="true">
                →
              </span>
            </a>
          )}
        </div>
      )}
    </article>
  )
}

/**
 * Responsive card grid: three columns on large screens, two on medium, one on
 * mobile. The grid and every card derive from `projects` — this component holds
 * no project data of its own.
 */
export function ProjectList() {
  return (
    <div className="projects">
      {projects.map((project, index) => (
        // One scene per card, so each is viewed from its own centre.
        <div className="depth-scene" key={project.id}>
          <ProjectCard project={project} index={index} />
        </div>
      ))}
    </div>
  )
}
