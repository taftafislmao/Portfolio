/**
 * Single place to edit the content that drives the page.
 * Everything here is placeholder copy except the name — swap it freely.
 */

export const profile = {
  name: 'Mostafa Samir',
  initials: 'MS',

  /** Short role label shown above the name. */
  label: 'Developer / Builder',

  intro:
    'I build software. Most of what I know comes from taking ideas apart, shipping rough versions, and keeping whatever holds up.',

  // TODO: replace with your real profile URL. Left as the bare domain on
  // purpose rather than guessing a username. Used by the hero GitHub button and
  // the footer link.
  github: 'https://github.com/',
} as const

export type HeroFact = {
  label: string
  value: string
}

/**
 * Small factual details shown beside the hero. Keep these true — no invented
 * metrics. The year is derived so it never goes stale.
 */
export const heroFacts: HeroFact[] = [
  { label: 'Based in', value: 'Egypt' },
  { label: 'Status', value: 'Available for projects' },
  { label: 'Year', value: String(new Date().getFullYear()) },
]

/**
 * About copy. Kept here rather than inline so it can be rewritten without
 * touching markup. Three short paragraphs — deliberately not a biography, and
 * deliberately free of portfolio filler ("passionate developer", "turning ideas
 * into reality", and so on). Just say how you actually work.
 */
export const aboutParagraphs: string[] = [
  'I got into software by wanting things to exist. Most of what I know started as a project I wanted for myself — a small tool, a script, something that removed a nagging annoyance — and turned into an excuse to find out how it worked.',
  'I tend to build first and read later. Picking something up, using it on a real problem and then breaking it teaches me more than working through it in order ever does. The trade-off is that I spend a lot of time confused, which turns out to be useful.',
  "These days that's mostly React and TypeScript on the web, drifting into backend and tooling as a project needs it. I care about code I can still read six months later.",
]

/** Narrow supporting detail shown beside the About copy. */
export const currentlyLearning: string[] = ['React', 'TypeScript', 'Node.js']

export type NavItem = {
  id: string
  label: string
}

/**
 * Section anchors shared by the navbar and the page sections. Order must match
 * the order the sections appear in `App.tsx`.
 */
export const navItems: NavItem[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]
