'use client'
import { useEffect, useRef, useState } from 'react'

const projects = [
  { label: 'Residential Lawn', town: 'Lexington, MA',   category: 'Lawn Care',   gradient: 'from-ge-green-deep to-[#0A2009]',  accent: '#4A9442' },
  { label: 'Backyard Patio',   town: 'Wellesley, MA',   category: 'Hardscaping', gradient: 'from-[#2A2018] to-[#0F0B06]',       accent: '#C9A84C' },
  { label: 'Garden Design',    town: 'Concord, MA',     category: 'Planting',    gradient: 'from-[#1E3A1B] to-ge-black',          accent: '#72C469' },
  { label: 'Snow Removal',     town: 'Newton, MA',      category: 'Winter',      gradient: 'from-[#1B2E3A] to-[#06090F]',        accent: '#7FB4D0' },
  { label: 'Retaining Wall',   town: 'Sudbury, MA',     category: 'Hardscaping', gradient: 'from-[#2A2018] to-[#0F0B06]',       accent: '#C9A84C' },
  { label: 'Spring Cleanup',   town: 'Needham, MA',     category: 'Maintenance', gradient: 'from-ge-green-deep to-[#0A1508]',    accent: '#4A9442' },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'))
      }),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="gallery" ref={sectionRef} className="py-28 bg-ge-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="text-center mb-16 reveal">
          <span className="text-ge-text-dim text-xs uppercase tracking-[0.3em]">Portfolio</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-ge-cream mt-3 mb-4">
            Work We&apos;re <em className="not-italic text-ge-gold">Proud Of</em>
          </h2>
          <p className="text-ge-text-muted max-w-md mx-auto text-sm">
            From Newton to Concord, our work speaks for itself across Massachusetts neighborhoods.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <div
              key={p.label}
              className={`reveal reveal-delay-${(i % 3) + 1} relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer group border border-ge-border`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} transition-transform duration-700 group-hover:scale-105`} />

              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: `radial-gradient(circle at 30% 30%, ${p.accent}40, transparent 60%)` }} />

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border transition-all duration-300 group-hover:scale-110 flex items-center justify-center"
                  style={{ borderColor: p.accent + '60', background: p.accent + '20' }}>
                  <svg className="w-8 h-8" style={{ color: p.accent }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-13 2 0 0 2.5-2 6.5-2C19 3 19 1 19 1S17 2 17 8z"/>
                  </svg>
                </div>
              </div>

              {/* Overlay on hover */}
              <div className={`absolute inset-0 transition-opacity duration-300 ${active === i ? 'opacity-100' : 'opacity-0'}`}
                style={{ background: 'linear-gradient(to top, rgba(6,9,8,0.95) 0%, rgba(6,9,8,0.4) 60%, transparent 100%)' }} />

              {/* Bottom info */}
              <div className="absolute bottom-0 inset-x-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: p.accent }}>{p.category}</div>
                <div className="font-display text-ge-cream text-lg font-medium">{p.label}</div>
                <div className="text-ge-text-muted text-xs mt-0.5">{p.town}</div>
              </div>

              {/* Category badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest"
                style={{ background: p.accent + '25', color: p.accent, border: `1px solid ${p.accent}40` }}>
                {p.category}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <a href="#contact"
            className="inline-flex items-center gap-2 text-ge-text-muted hover:text-ge-cream text-sm transition-colors group">
            See more of our work — request a portfolio
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
