'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import CountUp from './CountUp'

export default function Hero() {
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = particlesRef.current
    if (!container) return
    for (let i = 0; i < 18; i++) {
      const el = document.createElement('div')
      el.className = 'leaf'
      el.style.cssText = `
        left: ${Math.random() * 100}%;
        bottom: -20px;
        animation-duration: ${8 + Math.random() * 10}s;
        animation-delay: ${Math.random() * 8}s;
        transform: scale(${0.5 + Math.random()});
        opacity: ${0.2 + Math.random() * 0.4};
      `
      container.appendChild(el)
    }
  }, [])

  const words = ['CRAFTING', 'BEAUTIFUL', 'LANDSCAPES,', 'EVERY', 'SEASON.']

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background photo */}
      <Image
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85"
        alt="Professional landscaped property"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Base darkening layer — 25% darker overall */}
      <div className="absolute inset-0 bg-black/25" />
      {/* Directional overlay: dark left for text, lighter right to show the home */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />
      {/* Bottom fade so stats row stays readable */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-ge-black to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24">
        <div className="max-w-4xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ge-border bg-ge-surface/50 mb-10 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-ge-green-bright animate-pulse" />
            <span className="text-ge-text-muted text-xs uppercase tracking-[0.2em]">Massachusetts Premier Landscaping</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] font-light leading-[1.05] tracking-tight text-ge-cream mb-8">
            {words.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.25em]">
                <span className="inline-block animate-fade-up"
                  style={{ animationDelay: `${0.1 + i * 0.12}s`, animationFillMode: 'both' }}>
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* Gold line */}
          <div className="gold-line w-24 mb-8 animate-line-grow origin-left" style={{ animationDelay: '0.8s', animationFillMode: 'both' }} />

          {/* Subtitle */}
          <p className="text-white/90 text-lg leading-relaxed max-w-xl mb-12 animate-fade-in drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
            From lush summer gardens to seamless winter snow management —
            Martinez Landscaping delivers premium property care for Massachusetts
            homeowners and businesses year-round.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 animate-fade-in" style={{ animationDelay: '1.1s', animationFillMode: 'both' }}>
            <a href="#services"
              className="px-8 py-4 bg-ge-green-mid hover:bg-ge-green-bright text-ge-cream font-medium rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-ge-green-mid/40 hover:-translate-y-0.5">
              View Our Services
            </a>
            <a href="#quote"
              className="px-8 py-4 border border-ge-gold/50 hover:border-ge-gold text-ge-gold hover:text-ge-cream font-medium rounded-full transition-all duration-300 hover:bg-ge-gold/10">
              Get a Free Quote ↓
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-10 mt-16 pt-10 border-t border-ge-border animate-fade-in" style={{ animationDelay: '1.3s', animationFillMode: 'both' }}>
            {[['15+', 'Years in Business'], ['800+', 'Properties Served'], ['24/7', 'Winter Response'], ['5★', 'Average Rating']].map(([n, l]) => (
              <div key={l}>
                <CountUp value={n} className="font-display text-3xl text-ge-gold font-semibold" duration={2000} />
                <div className="text-ge-text-dim text-xs uppercase tracking-[0.15em] mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-ge-text-dim text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-ge-text-dim to-transparent" />
      </div>
    </section>
  )
}
