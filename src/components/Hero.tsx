import { heroFacts, profile } from '../data/profile'
import { usePointerTilt } from '../hooks/usePointerTilt'
import './Hero.css'

/**
 * Asymmetric two-column hero: identity on the left, a narrow factual rail on
 * the right, joined by a vertical hairline. Collapses to one column below
 * 1024px — the rail becomes a horizontal band so the hierarchy survives.
 */
export function Hero() {
  // Rotates the name toward the pointer while it is hovered. The hook only
  // writes CSS custom properties — see Hero.css for the transform that reads
  // them — and it never attaches without a fine pointer.
  const nameRef = usePointerTilt<HTMLSpanElement>({ max: 6 })

  const handleNameClick = () => {
    // The name shows a pointer cursor, so a click has to do something. Same
    // behaviour as the navbar wordmark: return to the top. `scroll-behavior:
    // smooth` on <html> supplies the easing.
    window.scrollTo({ top: 0 })
  }

  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__identity">
          <p className="hero__label">
            <span className="mono-label">{profile.label}</span>
            <span className="hero__label-rule" aria-hidden="true" />
          </p>

          <h1 className="hero__name">
            <span
              className="hero__name-inner"
              ref={nameRef}
              // Duplicated by the ::before extrusion layer in CSS — the copy
              // behind the text that gives the letters their depth.
              data-text={profile.name}
              onClick={handleNameClick}
            >
              {profile.name}
            </span>
          </h1>

          <p className="hero__intro">{profile.intro}</p>

          <div className="hero__actions">
            <a className="btn btn--primary depth-lift" href="#projects">
              View Projects
            </a>
            <a
              className="btn btn--secondary depth-lift"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <dl className="hero__facts">
          {heroFacts.map((fact) => (
            <div className="hero__fact" key={fact.label}>
              <dt className="hero__fact-label">{fact.label}</dt>
              <dd className="hero__fact-value">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
