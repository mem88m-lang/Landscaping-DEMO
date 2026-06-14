'use client'
import { useEffect, useRef, useState } from 'react'

const serviceOptions = [
  'Lawn Mowing & Maintenance',
  'Garden Design & Planting',
  'Mulching & Bed Care',
  'Irrigation Installation',
  'Fertilization & Weed Control',
  'Hardscaping (Patio / Walkway)',
  'Tree & Shrub Trimming',
  'Aeration & Overseeding',
  'Snow Plowing',
  'Ice Management',
  'Holiday Lighting',
  'Other / Not Sure Yet',
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1500)
  }

  return (
    <section id="contact" ref={sectionRef} className="py-28 bg-ge-black relative">
      <div className="gold-line absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left info */}
          <div>
            <div className="reveal">
              <span className="text-ge-text-dim text-xs uppercase tracking-[0.3em]">Get In Touch</span>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-ge-cream mt-3 mb-6 leading-tight">
                Let&apos;s Build Something<br />
                <em className="not-italic text-ge-gold">Beautiful Together</em>
              </h2>
              <div className="gold-line w-16 mb-8" />
              <p className="text-ge-text-muted leading-relaxed mb-10">
                Ready to transform your property? Tell us what you need and we&apos;ll get back to you within one business day with a free, no-obligation estimate.
              </p>
            </div>

            <div className="reveal reveal-delay-2 space-y-5">
              {[
                { icon: '📍', label: 'Service Area', value: 'Greater Boston & MetroWest, MA' },
                { icon: '📞', label: 'Phone',        value: '(617) 555-0182' },
                { icon: '✉️', label: 'Email',        value: 'hello@martinezlandscaping.com' },
                { icon: '🕐', label: 'Hours',        value: 'Mon–Sat 7am–6pm · 24/7 Winter Response' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-ge-surface border border-ge-border flex items-center justify-center text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-ge-text-dim text-xs uppercase tracking-wider mb-0.5">{item.label}</div>
                    <div className="text-ge-cream text-sm">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Service towns */}
            <div className="reveal reveal-delay-3 mt-10 pt-8 border-t border-ge-border">
              <div className="text-ge-text-dim text-xs uppercase tracking-[0.2em] mb-3">Towns We Serve</div>
              <div className="flex flex-wrap gap-2">
                {['Lexington', 'Wellesley', 'Newton', 'Needham', 'Concord', 'Sudbury', 'Natick', 'Weston', 'Wayland', 'Framingham', 'Waltham', 'Belmont'].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-ge-surface border border-ge-border text-ge-text-muted text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal reveal-delay-2">
            <div className="rounded-3xl bg-ge-surface border border-ge-border p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-ge-green-deep border border-ge-green-mid flex items-center justify-center mx-auto mb-5">
                    <svg className="w-8 h-8 text-ge-green-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 className="font-display text-ge-cream text-2xl mb-3">Request Received!</h3>
                  <p className="text-ge-text-muted text-sm">We&apos;ll be in touch within one business day with your free estimate.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display text-ge-cream text-xl mb-6">Free Quote Request</h3>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-ge-text-dim text-xs uppercase tracking-wider mb-2">Full Name *</label>
                      <input required type="text" placeholder="Jane Smith"
                        className="w-full bg-ge-dark border border-ge-border rounded-xl px-4 py-3 text-ge-cream text-sm placeholder-ge-text-dim focus:outline-none focus:border-ge-green-mid transition-colors" />
                    </div>
                    <div>
                      <label className="block text-ge-text-dim text-xs uppercase tracking-wider mb-2">Phone *</label>
                      <input required type="tel" placeholder="(617) 555-0100"
                        className="w-full bg-ge-dark border border-ge-border rounded-xl px-4 py-3 text-ge-cream text-sm placeholder-ge-text-dim focus:outline-none focus:border-ge-green-mid transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-ge-text-dim text-xs uppercase tracking-wider mb-2">Email *</label>
                    <input required type="email" placeholder="jane@email.com"
                      className="w-full bg-ge-dark border border-ge-border rounded-xl px-4 py-3 text-ge-cream text-sm placeholder-ge-text-dim focus:outline-none focus:border-ge-green-mid transition-colors" />
                  </div>

                  <div>
                    <label className="block text-ge-text-dim text-xs uppercase tracking-wider mb-2">Property Address</label>
                    <input type="text" placeholder="123 Main St, Lexington, MA"
                      className="w-full bg-ge-dark border border-ge-border rounded-xl px-4 py-3 text-ge-cream text-sm placeholder-ge-text-dim focus:outline-none focus:border-ge-green-mid transition-colors" />
                  </div>

                  <div>
                    <label className="block text-ge-text-dim text-xs uppercase tracking-wider mb-2">Service Needed *</label>
                    <select required
                      className="w-full bg-ge-dark border border-ge-border rounded-xl px-4 py-3 text-ge-cream text-sm focus:outline-none focus:border-ge-green-mid transition-colors appearance-none">
                      <option value="" className="text-ge-text-dim">Select a service...</option>
                      {serviceOptions.map(o => (
                        <option key={o} value={o} className="bg-ge-dark">{o}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-ge-text-dim text-xs uppercase tracking-wider mb-2">Tell Us More</label>
                    <textarea rows={3} placeholder="Describe your property and what you're looking for..."
                      className="w-full bg-ge-dark border border-ge-border rounded-xl px-4 py-3 text-ge-cream text-sm placeholder-ge-text-dim focus:outline-none focus:border-ge-green-mid transition-colors resize-none" />
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full py-4 bg-ge-green-mid hover:bg-ge-green-bright disabled:opacity-60 text-ge-cream font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-ge-green-mid/30 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Sending...
                      </>
                    ) : 'Request My Free Quote'}
                  </button>

                  <p className="text-ge-text-dim text-xs text-center">No contracts. No pressure. Just honest estimates.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
