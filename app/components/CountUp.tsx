'use client'
import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  value: string       // e.g. "800+", "15+", "100%", "2009", "$45"
  duration?: number   // ms
  className?: string
  startOnView?: boolean
}

function parseValue(raw: string): { num: number; prefix: string; suffix: string } {
  const prefix = raw.startsWith('$') ? '$' : ''
  const clean   = raw.replace(/^\$/, '')
  const suffix  = clean.replace(/[\d,]/g, '')   // everything after digits: +, %, ★, /7 etc.
  const num     = parseInt(clean.replace(/[^\d]/g, ''), 10) || 0
  return { num, prefix, suffix }
}

export default function CountUp({ value, duration = 1800, className = '', startOnView = true }: CountUpProps) {
  const [display, setDisplay] = useState('0')
  const [started, setStarted]  = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!startOnView) { setStarted(true); return }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [startOnView])

  useEffect(() => {
    if (!started) return
    const { num, prefix, suffix } = parseValue(value)

    // Non-numeric values just flip in
    if (isNaN(num) || num === 0) { setDisplay(value); return }

    const start     = Date.now()
    const startVal  = Math.max(0, num - Math.round(num * 0.85))
    let   frame: number

    const tick = () => {
      const elapsed  = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      // ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3)
      const current  = Math.round(startVal + (num - startVal) * eased)
      setDisplay(`${prefix}${current.toLocaleString()}${suffix}`)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, value, duration])

  return <span ref={ref} className={className}>{display}</span>
}
