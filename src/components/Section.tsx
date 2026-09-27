import type { ReactNode } from 'react'
import './Section.css'

type SectionProps = {
  id: string
  /** Display index, e.g. "01". Purely typographic. */
  index: string
  title: string
  lead: string
  children: ReactNode
}

/**
 * Shared shell for every content section: numbered heading, short lead,
 * then whatever the section renders. Keeps the four empty containers
 * visually consistent until real content lands.
 */
export function Section({ id, index, title, lead, children }: SectionProps) {
  const titleId = `${id}-title`

  return (
    <section className="section" id={id} aria-labelledby={titleId}>
      <div className="container">
        <header className="section__header">
          {/* Scene + object so the numeral and the title sit at real depths,
              and lift so the pair rises and turns together on hover. */}
          <div className="section__heading depth-scene depth-object depth-lift">
            <span className="section__index depth-xs" aria-hidden="true">
              {index}
            </span>
            <h2 className="section__title" id={titleId}>
              {title}
            </h2>
          </div>
          <p className="section__lead">{lead}</p>
        </header>

        {children}
      </div>
    </section>
  )
}
