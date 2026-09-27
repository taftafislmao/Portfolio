import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { navItems, profile } from '../data/profile'
import { useTextScramble } from '../hooks/useTextScramble'
import { ScrambleText } from './ScrambleText'
import './Navbar.css'

/** Anything below this counts as "already at the top". */
const TOP_THRESHOLD = 8

/**
 * Minimal sticky navbar: brand on the left, section anchors on the right.
 *
 * The active link is tracked with an IntersectionObserver against a thin band
 * in the middle of the viewport, so it stays correct while scrolling.
 *
 * The wordmark is a small hidden interaction: hovering scrambles it, clicking
 * returns to the top — see Navbar.css and useTextScramble.
 */
export function Navbar() {
  const [activeId, setActiveId] = useState<string>('')
  const { display, isScrambling, scramble } = useTextScramble(profile.name)

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const inBand = entries.filter((entry) => entry.isIntersecting)
        if (inBand.length === 0) return

        // Closest to the middle of the band wins.
        const top = inBand.reduce((best, entry) =>
          entry.intersectionRatio > best.intersectionRatio ? entry : best,
        )
        setActiveId(top.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Handled in JS so an at-the-top click can replay the signature instead of
    // doing nothing. `scroll-behavior: smooth` on <html> supplies the easing.
    event.preventDefault()

    if (window.scrollY > TOP_THRESHOLD) {
      window.scrollTo({ top: 0 })
      return
    }

    scramble()
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <a
          className="navbar__brand"
          href="#top"
          aria-label={`${profile.name} — back to top`}
          onClick={handleBrandClick}
        >
          <span className="navbar__mark" aria-hidden="true">
            {profile.initials}
          </span>

          <ScrambleText
            className="navbar__name"
            text={profile.name}
            display={display}
            isScrambling={isScrambling}
            onMouseEnter={scramble}
            onFocus={scramble}
          />
        </a>

        <nav aria-label="Sections">
          <ul className="navbar__links">
            {navItems.map((item) => {
              const isActive = activeId === item.id
              return (
                <li key={item.id}>
                  <a
                    className="navbar__link"
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
