'use client'
import { useEffect, useRef } from 'react'

const stats = [
  { value: '2009', label: 'Founded' },
  { value: '800+', label: 'Properties Served' },
  { value: '12', label: 'Service Towns' },
  { value: '100%', label: 'Satisfaction Guarantee' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

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
    <section id="about" ref={sectionRef} className="py-28 bg-ge-dark relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-ge-green-deep/30 opacity-40" />
      <div className="absolute -right-48 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-ge-green-deep/15 opacity-40" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: visual */}
          <div className="reveal relative">
            {/* Main card */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-ge-surface border border-ge-border">
              {/* Gradient stand-in for photo */}
              <div className="absolute inset-0 bg-gradient-to-br from-ge-green-deep via-ge-surface to-ge-black" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-ge-green-mid/30 border border-ge-green-mid flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-ge-green-light" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-13 2 0 0 2.5-2 6.5-2C19 3 19 1 19 1S17 2 17 8z"/>
                    </svg>
                  </div>
                  <p className="font-display text-ge-cream text-xl">GreenEdge Landscaping</p>
                  <p className="text-ge-text-muted text-sm mt-1">Est. 2009 · Massachusetts</p>
                </div>
              </div>
              {/* Bottom bar */}
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-ge-black to-transparent">
                <p className="font-display text-ge-cream text-sm italic">&ldquo;Your property, our pride — every season.&rdquo;</p>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 sm:right-4 bg-ge-surface border border-ge-border rounded-2xl p-5 shadow-2xl">
              <div className="font-display text-3xl text-ge-gold font-semibold">15+</div>
              <div className="text-ge-text-muted text-xs uppercase tracking-widest mt-1">Years of Excellence</div>
            </div>
          </div>

          {/* Right: text */}
          <div>
            <div className="reveal">
              <span className="text-ge-text-dim text-xs uppercase tracking-[0.3em]">Our Story</span>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] text-ge-cream mt-3 mb-6 leading-tight">
                Rooted in Massachusetts,<br />
                <em className="not-italic text-ge-gold">Built on Trust</em>
              </h2>
              <div className="gold-line w-16 mb-8" />
            </div>

            <div className="reveal reveal-delay-2 space-y-4 text-ge-text-muted leading-relaxed">
              <p>
                Founded in 2009 by Marcus Green, GreenEdge Landscaping began as a one-truck operation in Lexington and has grown into one of MetroWest&apos;s most trusted landscape companies — with a team of 18 dedicated professionals serving homes and businesses across 12 Massachusetts towns.
              </p>
              <p>
                We believe beautiful landscapes shouldn&apos;t come at the cost of your peace of mind. That&apos;s why every GreenEdge team member is fully licensed, insured, and trained to Massachusetts horticulture standards. From the first mow in April to the last snow push in March, we show up when it matters most.
              </p>
            </div>

            {/* Features */}
            <div className="reveal reveal-delay-3 mt-8 space-y-3">
              {['Licensed & Fully Insured', 'MA-Certified Horticulturists', 'No Contracts Required', 'Satisfaction Guaranteed'].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-ge-green-deep border border-ge-green-mid flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-ge-green-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span className="text-ge-text-primary text-sm">{f}</span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="reveal reveal-delay-4 grid grid-cols-2 gap-6 mt-10 pt-8 border-t border-ge-border">
              {stats.map(s => (
                <div key={s.label}>
                  <div className="font-display text-2xl text-ge-gold font-semibold">{s.value}</div>
                  <div className="text-ge-text-dim text-xs uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
