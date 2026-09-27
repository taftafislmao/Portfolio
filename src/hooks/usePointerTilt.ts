import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

/**
 * Default maximum rotation at the edge, in degrees. Small on purpose — these
 * elements should read as physical objects catching the light, not as flipping
 * tiles.
 */
const MAX_TILT = 6

/**
 * Keeps a value inside 0..1.
 *
 * The pointer normally stays inside the tracked box, so this is a no-op in
 * practice — but the tilt is only bounded if it is enforced here. A synthetic
 * or edge-case event carrying a coordinate outside the box would otherwise
 * produce a rotation many times `max`, which is exactly the kind of motion
 * this hook is supposed to rule out.
 */
function clamp01(value: number) {
  return value < 0 ? 0 : value > 1 ? 1 : value
}

type TiltOptions = {
  /**
   * Element whose box maps the pointer position. Defaults to the tilted
   * element. Pass a larger ancestor when the pointer should drive the tilt from
   * further away — the hero object listens on the whole hero section.
   */
  source?: RefObject<HTMLElement | null>
  /** Maximum rotation in degrees at the edge. */
  max?: number
}

/**
 * Tilts an element toward the pointer by writing `--tilt-x` / `--tilt-y` /
 * `--mx` / `--my`, which the element's own `transform` and highlight read.
 * Nothing here re-renders React.
 *
 * Performance, since this runs on every pointer move:
 * - No state — values are written straight to the element's style.
 * - No idle rAF loop. A frame is scheduled only when there is something to
 *   write, and never more than one is pending, so writes are capped at one per
 *   frame even on a high-polling-rate mouse.
 * - The bounding rect is cached on enter. Moving never forces a layout read, and
 *   the tilt can't feed back into its own measurements (a rotated element has a
 *   different rect, which would otherwise make it chase itself).
 * - Skipped entirely without a fine pointer, and when reduced motion is asked
 *   for — the listeners are never even attached.
 */
export function usePointerTilt<T extends HTMLElement>({
  source,
  max = MAX_TILT,
}: TiltOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const track = source?.current ?? el

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canHover || reduceMotion) return

    let rect: DOMRect | null = null
    let frame: number | null = null
    let tiltX = 0
    let tiltY = 0
    let mx = 50
    let my = 50

    const write = () => {
      frame = null
      el.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`)
      el.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`)
      // Drives the surface highlight, which is painted from these. Written on
      // the same frame as the tilt so a move never costs two style passes.
      el.style.setProperty('--mx', `${mx.toFixed(1)}%`)
      el.style.setProperty('--my', `${my.toFixed(1)}%`)
    }

    const handleEnter = () => {
      rect = track.getBoundingClientRect()
    }

    const handleMove = (event: PointerEvent) => {
      if (!rect) rect = track.getBoundingClientRect()

      // 0..1 across the tracked box, clamped so the rotation below can never
      // exceed `max` even if a coordinate lands outside it.
      const fx = clamp01((event.clientX - rect.left) / rect.width)
      const fy = clamp01((event.clientY - rect.top) / rect.height)

      mx = fx * 100
      my = fy * 100

      // Rotating toward the pointer: moving right tips the right edge away.
      tiltY = (fx - 0.5) * 2 * max
      tiltX = -(fy - 0.5) * 2 * max

      if (frame === null) frame = requestAnimationFrame(write)
    }

    // Dropping the properties lets the transform fall back to its resting angle
    // and the existing transition carries the element home.
    const handleLeave = () => {
      rect = null
      if (frame !== null) {
        cancelAnimationFrame(frame)
        frame = null
      }
      el.style.removeProperty('--tilt-x')
      el.style.removeProperty('--tilt-y')
      el.style.removeProperty('--mx')
      el.style.removeProperty('--my')
    }

    track.addEventListener('pointerenter', handleEnter, { passive: true })
    track.addEventListener('pointermove', handleMove, { passive: true })
    track.addEventListener('pointerleave', handleLeave, { passive: true })

    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      track.removeEventListener('pointerenter', handleEnter)
      track.removeEventListener('pointermove', handleMove)
      track.removeEventListener('pointerleave', handleLeave)
      el.style.removeProperty('--tilt-x')
      el.style.removeProperty('--tilt-y')
      el.style.removeProperty('--mx')
      el.style.removeProperty('--my')
    }
  }, [source, max])

  return ref
}
