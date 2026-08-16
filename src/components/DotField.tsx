import { useEffect, useRef, useState } from 'react'

const LINK_PX = 150
const MAX_DOTS = 70
const DRIFT = 0.22

/** dots scale with viewport area but stop at MAX_DOTS — see the O(n²) note below */
function dotCount(w: number, h: number) {
  return Math.max(12, Math.min(MAX_DOTS, Math.round((w * h) / 24000)))
}

type Dot = { x: number; y: number; vx: number; vy: number }

/**
 * Page-wide backdrop: slowly drifting dots that draw a line to any neighbour
 * within LINK_PX. Sits behind everything at low opacity.
 *
 * ponytail: the link pass is an O(n²) pair scan every frame, which is why the
 * dot count is capped rather than scaled with area without limit — 70 dots is
 * ~2.4k distance checks per frame, cheap. If the cap ever needs raising, the
 * upgrade path is a uniform grid bucket so only neighbouring cells are paired.
 */
export default function DotField() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [pastHero, setPastHero] = useState(false)

  // full strength over the hero, pulled back once the content sections start
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let dots: Dot[] = []

    const seed = () => {
      // cap DPR at 2: a 3x retina backing store triples fill cost for no gain here
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = Array.from({ length: dotCount(w, h) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * DRIFT,
        vy: (Math.random() - 0.5) * DRIFT,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalAlpha = 1
      ctx.fillStyle = '#2b63e0'
      ctx.strokeStyle = '#3f4756'
      ctx.lineWidth = 1

      for (const d of dots) {
        if (!still) {
          d.x += d.vx
          d.y += d.vy
          if (d.x <= 0 || d.x >= w) d.vx *= -1
          if (d.y <= 0 || d.y >= h) d.vy *= -1
        }
        ctx.beginPath()
        ctx.arc(d.x, d.y, 2.4, 0, Math.PI * 2)
        ctx.fill()
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y)
          if (dist > LINK_PX) continue
          ctx.globalAlpha = 1 - dist / LINK_PX
          ctx.beginPath()
          ctx.moveTo(dots[i].x, dots[i].y)
          ctx.lineTo(dots[j].x, dots[j].y)
          ctx.stroke()
        }
      }
    }

    let raf = 0
    const tick = () => {
      draw()
      raf = requestAnimationFrame(tick)
    }
    // never burn frames on a hidden tab
    const start = () => {
      if (!raf && !still && !document.hidden) raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    const onVisibility = () => (document.hidden ? stop() : start())
    const onResize = () => {
      seed()
      draw()
    }

    seed()
    draw()
    start()
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 transition-opacity duration-500 ${
        pastHero ? 'opacity-25' : 'opacity-65'
      }`}
    />
  )
}
