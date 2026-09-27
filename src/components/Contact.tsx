import { contactHeading, contactInvite, contactLinks } from '../data/contact'
import './Contact.css'

/**
 * A single restrained raised panel — not a full-bleed CTA card. Copy stays
 * left-aligned, there is no oversized button, and the links are plain text on a
 * hairline grid rather than social-media tiles.
 */
export function Contact() {
  return (
    <div className="contact__panel depth-scene depth-object depth-lift">
      <h3 className="contact__heading">{contactHeading}</h3>
      <p className="contact__invite">{contactInvite}</p>

      {/* A step forward of the copy above it, so the panel has real layers to
          separate when it turns. */}
      <dl className="contact__links depth-xs">
        {contactLinks.map((link) => {
          const isEmail = link.href.startsWith('mailto:')

          return (
            <div className="contact__row" key={link.label}>
              <dt className="contact__label">{link.label}</dt>
              <dd className="contact__value">
                <a
                  className="contact__link depth-lift"
                  href={link.href}
                  target={isEmail ? undefined : '_blank'}
                  rel={isEmail ? undefined : 'noopener noreferrer'}
                >
                  {link.value}
                </a>
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
