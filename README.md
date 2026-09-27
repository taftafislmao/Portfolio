# Portfolio — Mostafa Samir

Personal developer portfolio. Single page, dark, minimal.

## Stack

- **Vite 8** + **React 19** + **TypeScript**
- Plain CSS with custom properties — no Tailwind, no UI library, no CSS-in-JS
- `oxlint` for linting

## Getting started

```bash
npm install
npm run dev      # http://localhost:5183
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on port **5183** |
| `npm run build` | Type-check (`tsc -b`) then production build to `dist/` |
| `npm run preview` | Serve the production build on port 5183 |
| `npm run lint` | Run oxlint |

> The dev port is pinned in `vite.config.ts` with `strictPort: true`, so the URL
> never drifts. If 5183 is taken, Vite fails loudly instead of silently moving to
> another port — free it or change `server.port`.

## Colour system — "Slate & Steel"

Defined once in `src/styles/tokens.css`.

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#0A0A0B` | Page background |
| `--surface` | `#18181B` | Panels |
| `--raised` | `#232326` | Raised fills (logo mark) |
| `--border` | `#333336` | Hairlines and dividers |
| `--grey` | `#5A5F6B` | Signature grey — decorative only |
| `--blue` | `#4C8DFF` | Signature blue — CTAs, links, active states |
| `--blue-hover` | `#2E5CB8` | Blue hover / pressed |
| `--text` | `#E4E4E7` | Primary text |
| `--muted` | `#8B8B8F` | Secondary text |

Two rules keep the palette honest:

1. **Black and grey carry ~85% of the visual weight.** Blue is never used for
   decoration, headings, or large fills.
2. **Blue is reserved for things that are interactive or active** — the primary
   CTA, link hovers, the active nav marker, the wordmark hover rule.

Tokens are also defined for type scale, spacing, radii (deliberately small — no
pill or mega-rounded cards) and motion (`--dur: 160ms`, short and functional).

## Structure

```
src/
  main.tsx              entry — imports tokens.css then global.css
  App.tsx               page composition — Projects, About, Skills, Contact
  data/
    profile.ts          name, label, intro, facts, about paragraphs, nav items
    projects.ts         project entries — edit this to add/remove projects
    skills.ts           skill groups — add, rename, or reorder freely
    contact.ts          contact links + heading + invite
  hooks/
    useTextScramble.ts  scrambles a string, settling one char at a time
    usePointerTilt.ts   tilts a card toward the pointer (CSS variables only)
  styles/
    tokens.css          colour, type, spacing, layout, motion
    global.css          reset, base type, .container, .btn, .mono-label
    depth.css           lightweight 3D foundation (perspective, translateZ)
  components/
    Navbar.tsx/.css     sticky nav + scroll-spy + wordmark scramble
    Hero.tsx/.css       asymmetric hero: identity + factual rail
    ProjectList.tsx/.css  responsive card grid
    About.tsx/.css       editorial two-column: copy + supporting rail
    Skills.tsx/.css      labelled technical inventory, hairlined rows
    Contact.tsx/.css     raised contact panel with label|value link rows
    ScrambleText.tsx    renders a useTextScramble frame (shared)
    Section.tsx/.css    shared shell for the four sections
    Footer.tsx/.css     copyright + GitHub, understated
```

Content lives in `src/data/`. The GitHub URLs in both files are placeholders.

## What's built

- **Navbar** — monogram + name on the left, section anchors on the right.
  Sticky, with an `IntersectionObserver` scroll-spy so the current section's link
  keeps a thin blue marker. Collapses to the monogram alone below 640px.
- **Hero — asymmetric composition.** Two columns: an identity block on the left
  (mono label with a hairline running to the column edge, the uppercase display
  name, the intro, the two CTAs) and a narrow factual rail on the right, divided
  by a full-height vertical hairline with its facts pushed to the bottom. Split at
  1024px; below that it collapses to one column and the rail becomes a horizontal
  band under a top rule, so the hierarchy survives rather than just shrinking.
  Fills the first screen on desktop (capped at 46rem); on mobile it is capped at
  36rem so the next section peeks in as a scroll cue.
- **Hero facts** — `BASED IN / Egypt`, `STATUS / Available for projects`,
  `YEAR / <current year>` (derived, so it never goes stale). Factual only — no
  invented metrics. Edit them in `heroFacts` in `src/data/profile.ts`.
- **Projects** — a responsive card grid: three columns on large screens, two on
  medium (≥680px), one on mobile. Cards sit on `#18181B` with a subtle dark box
  shadow, `12px` corners and a hairline border. On hover the card lifts
  `3px`, the background steps to `#232326`, the border warms to `#5A5F6B`, the
  project name turns `--blue`, the shadow deepens, and each link's arrow nudges
  3px right. Links stay pinned to the card floor via `margin-top: auto`, so short
  cards in a grid still align. `demo: null` projects render only the GitHub link.
  Below 640px the link rows get a 2.75rem tap target.
- **About** — an editorial two-column: three short paragraphs of running copy on
  the left (the opening one in primary text, the others muted) and a narrow
  supporting rail on the right labelled `Currently learning` with the stack
  currently being picked at. Below 900px the columns collapse; the rail sits
  below the paragraphs without the dividing hairline.
- **Skills** — a technical inventory, not a card grid. Each group is a single
  row: a mono label in a narrow left column and its technologies inline after
  it, separated by middots. Rows are divided by hairlines. Each technology has
  a subtle hover — a `--raised` background and a `--blue` label. Nothing implies
  a proficiency level.
- **Contact** — a single raised panel with a strong heading, a one-line invite
  and a hairline-separated list of label|value link rows for Email / GitHub /
  Fiverr / Upwork. The panel uses the same `--surface`, `--border`, `12px` radius
  and dark box shadow as the project cards, so it reads as part of the page
  rather than a marketing CTA. Mail links open in the email client; everything
  else opens in a new tab. Mobile taps are 44px.
- **Footer** — `© {year} {name}` and a small GitHub link, side by side with a
  border-top hairline. No navigation, no icons. Mobile links get a 44px tap
  target to match.
- **Navbar wordmark — hidden signature.** `cursor: pointer` at all times. Hovering
  scrambles the name for ~900ms: every character churns through
  `0123457#@%/\_<>+=` in the monospace stack, then settles one at a time from
  left to right until `Mostafa Samir` is restored. Unsettled glyphs carry `--blue`
  and drop back to `--text` the moment they land, so the blue drains out of the
  word. The name reserves an `8em` min-width so the mono↔sans switch never
  reflows the navbar, and the `MS` mark's border turns blue in sync.
  Clicking scrolls back to the top; clicking while already at the top replays the
  scramble instead of doing nothing.
- **Hero name** — 3D typography instead of a scramble. The heading establishes a
  perspective; the inner span rotates toward the pointer (`max: 6°`) while
  hovered, lifted in `Z`, and paired with a second `::before` copy of the text
  sitting at negative `Z` so the letters get a thin, dark extruded side that
  only opens up as the name tilts. The DOM text stays `Mostafa Samir` and is
  rendered uppercase via `text-transform`, so the extrusion copy uses the same
  source string. A 2px `--blue` underline still draws in from the left on hover
  (blue stays an accent). `cursor: pointer`; clicking returns to the top, the
  same behaviour as the navbar wordmark. Under reduced motion the rotation and
  lift are dropped and the extrusion copy is hidden — the underline still
  appears on hover, so the heading remains clearly interactive.

Both timings come from one place: `DEFAULT_DURATION` in
`src/hooks/useTextScramble.ts` (and `GLYPH_INTERVAL`, how fast each character
swaps glyphs). Change it there to re-pace the wordmark effect.

## Depth foundation

`src/styles/depth.css` is a lightweight 3D layer using only CSS `transform` —
no WebGL, no canvas, no 3D library, no JS animation loop. Everything here is
GPU-compositable, so hovering never triggers layout or paint.

The system is:

- `.depth-scene` — sets `perspective` on a wrapper so its child is viewed from
  its own centre. Used once per card.
- `.depth-object` — `transform-style: preserve-3d`, keeps the object's layers in
  one 3D space.
- `.depth-xs` / `.depth-sm` / `.depth-md` — small `translateZ` offsets for inner
  layers.

The project card already uses all three: each card is wrapped in a
`.depth-scene`, the card itself is a `.depth-object`, and its layers sit at
three shallow depths so they separate when the card tilts — description at the
surface (`translateZ(0)`), then the number, title and tags at `--depth-xs`
(6px), then the link row at `--depth-sm` (12px). Card hover lifts `3px` and
pushes forward `12px`.

### Surface highlight

A soft radial sheen tracks the pointer across the card surface, so it reads as a
lit object rather than a flat rectangle. It is a plain CSS `radial-gradient`
whose centre is driven by `--mx` / `--my` (written by the same hook, on the same
frame as the tilt). Deliberately a neutral light rather than blue — a blue glow
would fight the rule that blue is an accent.

`border-radius: inherit` on the pseudo-element clips the gradient to the card's
rounded box. That detail matters: `overflow: hidden` would clip too, but it would
also force the card to flatten and silently kill the `preserve-3d` layers.

### Pointer tilt

`src/hooks/usePointerTilt.ts` writes `--tilt-x` / `--tilt-y` / `--mx` / `--my` on
the card while the pointer is over it, with rotation capped at `MAX_TILT`
(6 degrees, inside the intended 4–7 range) at the card's edge. Because the card's
own `transform` already reads the tilt variables, the hook never touches the
transform declaration — it just sets custom properties and the existing
`transition: transform` carries the motion.

Built to stay cheap:

- **No React state.** Values go straight to `el.style`, so moving the pointer
  never re-renders a component.
- **No idle rAF loop.** A frame is scheduled only when there is something to
  write, and never more than one is pending — writes are capped at one per frame
  even on a 1000Hz mouse. Tilt and highlight are written together, so a move
  never costs two style passes.
- **No layout reads while moving.** The bounding rect is cached on
  `pointerenter`. This also stops the tilt feeding back into its own
  measurements: a rotated element has a different rect, so measuring on every
  move would make the card chase itself.
- **Not attached at all** without a fine pointer, or when reduced motion is
  requested — the guard runs before any listener is added.
- **Listeners are removed** on unmount, along with the custom properties they set.

### Reduced motion and touch

`prefers-reduced-motion: reduce` flips the whole system off: perspective goes to
`none`, `transform-style` to `flat`, inner-layer translations to `none`, and the
card hover collapses to a flat `translateY(-3px)` with no depth or rotation. The
hook also refuses to attach, so no pointer listeners exist at all.

Touch devices are detected via `(hover: hover) and (pointer: fine)` and get the
same treatment — cards stay static with their normal hover/press styling. There
is deliberately no device-orientation fallback.

Deliberately **not** included yet: animations beyond the above, 3D, a blog, a
contact form, or any data fetching.

## Accessibility notes

- Skip-to-content link, `:focus-visible` rings, `aria-current` on the active nav
  link, and a labelled `<nav>`.
- The scrambled glyphs are decorative: the brand link carries an `aria-label`, so
  screen readers announce `Mostafa Samir — back to top` and never the churn.
- All CSS transitions are neutralised by `prefers-reduced-motion: reduce` (which
  sets `--dur: 0ms`). `useTextScramble` also skips the scramble entirely for those
  users rather than flashing text at them — the name turns `--blue` on hover
  instead, so the interaction still reads as interactive. Click behaviour is
  unaffected.

## Adding a project

**The only file you need to touch is `src/data/projects.ts`.** Append an object
to the `projects` array — the grid, the card numbering and the layout all follow
automatically. You never need to edit `ProjectList.tsx`.

```ts
{
  id: 'thing-i-built',          // stable slug — also the React key
  name: 'Thing I built',
  description: 'What it does and what you built. Two sentences is plenty.',
  technologies: ['Rust', 'SQLite'],
  githubUrl: 'https://github.com/you/thing',
  liveUrl: null,                // null = no Live Demo link rendered
  image: null,                  // reserved for future previews
  featured: false,              // no layout effect yet
}
```

Field behaviour:

| Field | Notes |
| --- | --- |
| `id` | Lowercase slug, must be unique. Used as the React key. |
| `name` / `description` | Plain strings. |
| `technologies` | String array, rendered as tag chips. |
| `githubUrl` | `null` hides the GitHub link. |
| `liveUrl` | `null` hides the Live Demo link. |
| `image` | `{ src, alt }` or `null`. Reserved for richer visuals — 3D previews, interactive embeds. Not rendered yet, and no 3D library is installed. |
| `featured` | Boolean, no layout meaning yet — there is deliberately no featured section. |

If **both** URLs are `null`, the link row is omitted entirely rather than
rendering a link to nowhere.

Card numbers are derived from array position (`01`, `02`, `03`, …), so adding or
reordering a project renumbers the cards with no edit to the data.

Keep every claim true — no invented metrics, user counts or revenue.

## Known follow-ups

- Replace the placeholder URLs: `profile.github` in `src/data/profile.ts` (used by
  the hero button and footer), and `githubUrl` / `liveUrl` on the three
  placeholder projects in `src/data/projects.ts` — all currently `null`.
- Swap the three placeholder projects for real ones.
- Fill in the four sections.
- `--grey` (`#5A5F6B`) is currently unused. It fails WCAG AA as small text on both
  `--bg` (~3.1:1) and `--surface` (~2.8:1), so every small label uses `--muted`
  instead. `--grey` stays in the palette for decorative, non-text use.
