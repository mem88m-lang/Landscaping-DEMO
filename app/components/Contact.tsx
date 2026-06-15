'use client'
import { useEffect, useRef } from 'react'

export default function Contact() {
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
    <section id="contact" ref={sectionRef} className="py-24 bg-ge-black relative">
      <div className="gold-line absolute top-0 inset-x-0" />

      <div className="max-w-5xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="reveal text-center mb-16">
          <span className="text-ge-text-dim text-xs uppercase tracking-[0.3em]">Reach Us</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-ge-cream mt-3 mb-4 leading-tight">
            Let&apos;s Talk About<br />
            <em className="not-italic text-ge-gold">Your Property</em>
          </h2>
          <div className="gold-line w-16 mx-auto" />
        </div>

        {/* Contact cards */}
        <div className="reveal reveal-delay-2 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {[
            { icon: '📞', label: 'Call Us', value: '(617) 862-8607', sub: 'Mon–Sat 7am–6pm' },
            { icon: '✉️', label: 'Email', value: 'mem88m@gmail.com', sub: 'We reply within hours' },
            { icon: '📍', label: 'Service Area', value: 'Greater Boston', sub: 'MetroWest, MA' },
            { icon: '⚡', label: 'Emergency', value: '24/7 Winter Response', sub: 'Snow & ice coverage' },
          ].map(item => (
            <div key={item.label} className="bg-ge-surface border border-ge-border rounded-2xl p-5 hover:border-ge-green-mid transition-colors duration-300">
              <div className="text-2xl mb-3">{item.icon}</div>
              <div className="text-ge-text-dim text-xs uppercase tracking-wider mb-1">{item.label}</div>
              <div className="text-ge-cream text-sm font-medium leading-snug">{item.value}</div>
              <div className="text-ge-text-muted text-xs mt-1">{item.sub}</div>
            </div>
          ))}
        </div>

        {/* Towns */}
        <div className="reveal reveal-delay-3 text-center">
          <div className="text-ge-text-dim text-xs uppercase tracking-[0.2em] mb-4">Towns We Serve</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Lexington', 'Wellesley', 'Newton', 'Needham', 'Concord', 'Sudbury', 'Natick', 'Weston', 'Wayland', 'Framingham', 'Waltham', 'Belmont'].map(t => (
              <span key={t} className="px-3 py-1 rounded-full bg-ge-surface border border-ge-border text-ge-text-muted text-xs hover:border-ge-green-mid hover:text-ge-cream transition-colors duration-200">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* CTA to quote */}
        <div className="reveal reveal-delay-4 text-center mt-14">
          <a href="#quote"
            className="inline-flex items-center gap-2 px-8 py-4 bg-ge-green-mid hover:bg-ge-green-bright text-white font-medium rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-ge-green-mid/40 hover:-translate-y-0.5">
            Get Your Free Quote Above ↑
          </a>
        </div>

      </div>
    </section>
  )
}
