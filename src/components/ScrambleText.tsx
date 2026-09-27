import type { HTMLAttributes } from 'react'

type ScrambleTextProps = HTMLAttributes<HTMLSpanElement> & {
  /** The final, correct string. */
  text: string
  /** Current frame produced by useTextScramble. */
  display: string
  /** True while a run is in progress. */
  isScrambling: boolean
}

/**
 * Renders the output of useTextScramble. Settled characters keep the inherited
 * colour; ones that have not landed yet take the blue accent, so the colour
 * drains out of the word from left to right.
 *
 * Parents own the hook because they may need to trigger a run themselves — the
 * navbar replays it on an at-the-top click.
 */
export function ScrambleText({
  text,
  display,
  isScrambling,
  className,
  ...rest
}: ScrambleTextProps) {
  const classes = [className, isScrambling ? 'scramble-text--active' : null]
    .filter(Boolean)
    .join(' ')

  if (!isScrambling) {
    return (
      <span className={classes} {...rest}>
        {text}
      </span>
    )
  }

  return (
    <span className={classes} {...rest}>
      {display.split('').map((char, index) => {
        const target = text[index]
        const isLive = target !== ' ' && char !== target

        return (
          <span
            // Position is the identity here — glyphs change every frame.
            key={index}
            className={isLive ? 'scramble__glyph scramble__glyph--live' : 'scramble__glyph'}
          >
            {target === ' ' ? '\u00A0' : char}
          </span>
        )
      })}
    </span>
  )
}
