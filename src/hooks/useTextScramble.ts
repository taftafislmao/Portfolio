import { useCallback, useEffect, useRef, useState } from 'react'

/** Glyphs the scramble cycles through — digits and technical punctuation. */
const SCRAMBLE_GLYPHS = '0123457#@%/\\_<>+='

/** How often a scrambling character swaps to a new glyph, in ms. */
const GLYPH_INTERVAL = 55

/** Fraction of the run that passes before the first character settles. */
const SETTLE_START = 0.4

/**
 * Total run time in ms. Shared by every caller — the navbar wordmark and the
 * hero name both use the hook's default, so this one value paces both.
 */
const DEFAULT_DURATION = 900

function randomGlyph() {
  return SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)]
}

/**
 * Scrambles `text` for `duration` ms, settling one character at a time from left
 * to right until the original string is restored.
 *
 * Spaces are left alone so the word shape never breaks. Nothing is randomised
 * outside the glyph set, and the run always ends on the exact input text.
 */
export function useTextScramble(text: string, duration = DEFAULT_DURATION) {
  const [display, setDisplay] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const frameRef = useRef<number | null>(null)

  const cancel = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }, [])

  useEffect(() => cancel, [cancel])

  const scramble = useCallback(() => {
    cancel()

    const target = [...text]
    const live = target
      .map((char, index) => (char === ' ' ? -1 : index))
      .filter((index) => index >= 0)

    if (live.length === 0) return

    // Rapid glyph churn is the one thing here that could bother someone who has
    // asked for reduced motion, so skip straight to the settled state.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text)
      setIsScrambling(false)
      return
    }

    // Each character settles in turn, left to right.
    const settlesAt = new Map<number, number>()
    live.forEach((index, order) => {
      const progress = live.length === 1 ? 1 : order / (live.length - 1)
      settlesAt.set(index, duration * (SETTLE_START + (1 - SETTLE_START) * progress))
    })

    const glyphs = target.map((char) => (char === ' ' ? ' ' : randomGlyph()))
    const startedAt = performance.now()
    let lastGlyphSwap = -1

    setDisplay(glyphs.join(''))
    setIsScrambling(true)

    const tick = (now: number) => {
      const elapsed = now - startedAt

      const swap = Math.floor(elapsed / GLYPH_INTERVAL)
      if (swap !== lastGlyphSwap) {
        lastGlyphSwap = swap
        for (const index of live) {
          if (elapsed < (settlesAt.get(index) ?? duration)) glyphs[index] = randomGlyph()
        }
      }

      if (live.every((index) => elapsed >= (settlesAt.get(index) ?? duration))) {
        setDisplay(text)
        setIsScrambling(false)
        frameRef.current = null
        return
      }

      setDisplay(glyphs.join(''))
      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
  }, [cancel, duration, text])

  return { display, isScrambling, scramble }
}
