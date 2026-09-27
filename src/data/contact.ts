/**
 * Contact details, kept separate from the UI so they can be replaced in one
 * place.
 *
 * TODO: replace every value below. These are deliberately bare — no invented
 * usernames, handles or addresses. `you@example.com` is the usual placeholder
 * and is obviously not a real address.
 */

export type ContactLink = {
  /** Short label, e.g. "Email". */
  label: string
  /** What the visitor reads — the address or the bare domain. */
  value: string
  href: string
}

export const contactLinks: ContactLink[] = [
  { label: 'Email', value: 'you@example.com', href: 'mailto:you@example.com' },
  { label: 'GitHub', value: 'github.com', href: 'https://github.com/' },
  { label: 'Fiverr', value: 'fiverr.com', href: 'https://fiverr.com/' },
  { label: 'Upwork', value: 'upwork.com', href: 'https://upwork.com/' },
]

export const contactHeading = "Let's build something."

export const contactInvite =
  'Got a project, some freelance work, or an idea worth building? Email is the quickest way to reach me.'
