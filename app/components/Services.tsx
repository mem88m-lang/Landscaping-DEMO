'use client'
import { useState, useEffect, useRef } from 'react'

const summer = [
  { icon: '🌿', title: 'Lawn Mowing & Maintenance', desc: 'Weekly or bi-weekly cuts with edging, trimming, and cleanup for a pristine lawn all season.' },
  { icon: '🌸', title: 'Garden Design & Planting', desc: 'Custom garden beds, seasonal flower installation, and native plant landscaping tailored to MA climate.' },
  { icon: '🪵', title: 'Mulching & Bed Maintenance', desc: 'Premium mulch application to retain moisture, suppress weeds, and enhance curb appeal.' },
  { icon: '💧', title: 'Irrigation Installation', desc: 'Smart irrigation systems with zone control — efficient watering that saves water and money.' },
  { icon: '🌱', title: 'Fertilization & Weed Control', desc: 'Customized lawn nutrition programs and selective weed treatments for a thick, healthy turf.' },
  { icon: '🪨', title: 'Hardscaping', desc: 'Patios, walkways, retaining walls, and outdoor living spaces built to last with premium materials.' },
  { icon: '✂️', title: 'Tree & Shrub Trimming', desc: 'Expert pruning and shaping to promote healthy growth and maintain property aesthetics.' },
  { icon: '🌾', title: 'Aeration & Overseeding', desc: 'Core aeration and premium seed application to revitalize compacted, thin, or stressed lawns.' },
]

const winter = [
  { icon: '🚜', title: 'Snow Plowing', desc: 'Commercial and residential plowing with fast response times throughout Greater Boston and MetroWest.' },
  { icon: '🧂', title: 'Ice Management & De-icing', desc: 'Pre-treatment and reactive salting/sanding to keep driveways, lots, and walkways safe.' },
  { icon: '⚡', title: '24/7 Storm Response', desc: 'Around-the-clock monitoring and dispatch during active storms — we never sleep so you can.' },
  { icon: '🧹', title: 'Sidewalk Clearing', desc: 'Hand-shoveling and snow blowing for walkways, stairs, and entrances to maintain safe access.' },
  { icon: '🍂', title: 'Fall & Winter Cleanup', desc: 'Leaf removal, bed cleanup, and property winterization to protect your landscape investment.' },
  { icon: '💡', title: 'Holiday Lighting', desc: 'Professional installation, maintenance, and takedown of stunning exterior holiday displays.' },
  { icon: '🏔️', title: 'Snow Hauling & Relocation', desc: 'When accumulation is heavy, we haul snow off-site to prevent spring runoff and property damage.' },
  { icon: '🔍', title: 'Winter Property Monitoring', desc: 'Regular property checks during extended cold snaps to identify and report issues immediately.' },
]

function ServiceCard({ service, delay, isSummer }: { service: typeof summer[0], delay: number, isSummer: boolean }) {
  return (
    <div
      className={`reveal reveal-delay-${delay} group relative p-6 rounded-2xl border bg-ge-surface
        ${isSummer ? 'border-ge-border card-glow' : 'border-[#1B3A52] card-glow-winter'}
        transition-all duration-300`}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4
        ${isSummer ? 'bg-ge-green-deep' : 'bg-[#1B3A52]'}`}>
        {service.icon}
      </div>
      <h3 className="font-display text-ge-cream text-lg font-semibold mb-2">{service.title}</h3>
      <p className="text-ge-text-muted text-sm leading-relaxed">{service.desc}</p>

      <div className={`absolute bottom-0 left-6 right-6 h-px transition-all duration-300 opacity-0 group-hover:opacity-100
        ${isSummer ? 'bg-gradient-to-r from-transparent via-ge-green-mid to-transparent' : 'bg-gradient-to-r from-transparent via-ge-winter to-transparent'}`} />
    </div>
  )
}

export default function Services() {
  const [season, setSeason] = useState<'summer' | 'winter'>('summer')
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'))
        }
      }),
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [season])

  const services = season === 'summer' ? summer : winter
  const isSummer = season === 'summer'

  return (
    <section id="services" ref={sectionRef} className="py-28 bg-ge-black relative">
      <div className="gold-line absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-ge-text-dim text-xs uppercase tracking-[0.3em]">What We Do</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-ge-cream mt-3 mb-6">
            Services Built for <em className="not-italic text-ge-gold">Every Season</em>
          </h2>
          <p className="text-ge-text-muted max-w-xl mx-auto">
            Massachusetts weather demands year-round expertise. We&apos;ve built our service menu around your property&apos;s needs — summer to winter.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-14 reveal reveal-delay-2">
          <div className="flex gap-1 p-1 rounded-full bg-ge-surface border border-ge-border">
            <button
              onClick={() => setSeason('summer')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                ${isSummer ? 'bg-ge-green-mid text-ge-cream shadow-lg shadow-ge-green-mid/30' : 'text-ge-text-muted hover:text-ge-cream'}`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 7a5 5 0 100 10A5 5 0 0012 7zm0-5a1 1 0 011 1v2a1 1 0 01-2 0V3a1 1 0 011-1zm0 16a1 1 0 011 1v2a1 1 0 01-2 0v-2a1 1 0 011-1zm9-9h2a1 1 0 010 2h-2a1 1 0 010-2H3a1 1 0 010-2h2zm13.66-5.66l-1.41 1.41a1 1 0 01-1.41-1.41l1.41-1.41a1 1 0 011.41 1.41zM5.34 18.66l-1.41 1.41a1 1 0 01-1.41-1.41l1.41-1.41a1 1 0 011.41 1.41zM18.66 18.66l1.41 1.41a1 1 0 01-1.41 1.41l-1.41-1.41a1 1 0 011.41-1.41zM5.34 5.34L3.93 3.93a1 1 0 011.41-1.41l1.41 1.41a1 1 0 01-1.41 1.41z"/>
              </svg>
              Summer Services
            </button>
            <button
              onClick={() => setSeason('winter')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                ${!isSummer ? 'bg-ge-winter text-ge-cream shadow-lg shadow-ge-winter/30' : 'text-ge-text-muted hover:text-ge-cream'}`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 11h-4.17l2.24-2.24-1.41-1.42L15 11h-2V9l3.66-3.66-1.42-1.41L13 6.17V2h-2v4.17l-2.24-2.24-1.41 1.41L11 9v2H9L5.34 7.34 3.93 8.75 6.17 11H2v2h4.17l-2.24 2.24 1.41 1.42L9 13h2v2l-3.66 3.66 1.42 1.41L11 17.83V22h2v-4.17l2.24 2.24 1.41-1.41L13 15v-2h2l3.66 3.66 1.41-1.41L17.83 13H22z"/>
              </svg>
              Winter Services
            </button>
          </div>
        </div>

        {/* Service grid */}
        <div key={season} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} delay={(i % 4) + 1} isSummer={isSummer} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14 reveal">
          <a href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 border border-ge-gold/40 hover:border-ge-gold text-ge-gold text-sm font-medium rounded-full transition-all duration-300 hover:bg-ge-gold/10">
            Request a Custom Service Quote
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
