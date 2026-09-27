import { aboutParagraphs, currentlyLearning } from '../data/profile'
import './About.css'

/**
 * Two-column editorial layout — running copy on the left, a narrow supporting
 * rail on the right divided by a hairline. Mirrors the hero's asymmetry so the
 * two sections read as the same hand. No card: the structure comes from type,
 * spacing and that one rule.
 */
export function About() {
  return (
    <div className="about">
      <div className="about__body">
        {aboutParagraphs.map((paragraph, index) => (
          <p
            className={
              index === 0 ? 'about__paragraph about__paragraph--lead' : 'about__paragraph'
            }
            // Static copy — position is a stable enough identity here.
            key={index}
          >
            {paragraph}
          </p>
        ))}
      </div>

      <aside className="about__aside">
        <p className="about__aside-label">Currently learning</p>
        <p className="about__aside-value">{currentlyLearning.join(' · ')}</p>
      </aside>
    </div>
  )
}
