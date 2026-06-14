'use client'
import { useEffect, useRef } from 'react'

const reviews = [
  {
    name: 'Sarah M.',
    town: 'Lexington, MA',
    stars: 5,
    text: 'Martinez Landscaping has maintained our lawn for 4 years and we couldn\'t be happier. They show up on time, every time, and our yard looks better than ever. The snow service is a lifesaver every winter.',
  },
  {
    name: 'James T.',
    town: 'Wellesley, MA',
    stars: 5,
    text: 'We hired them for a full backyard redesign — new patio, garden beds, and irrigation. The crew was professional, cleaned up every day, and the final result exceeded our expectations. Worth every penny.',
  },
  {
    name: 'Karen & David L.',
    town: 'Needham, MA',
    stars: 5,
    text: 'After the last blizzard I woke up to a completely clear driveway at 5 AM. That\'s the Martinez promise — 24/7 storm response. I\'ve been with them 6 years and I\'ll never switch.',
  },
  {
    name: 'Robert P.',
    town: 'Sudbury, MA',
    stars: 5,
    text: 'Incredible attention to detail. My lawn went from patchy and struggling to lush green in one season. Their fertilization and aeration program is exactly what it needed. Highly recommend.',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-ge-gold" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
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
    <section id="reviews" ref={sectionRef} className="py-28 bg-ge-dark relative">
      <div className="gold-line absolute top-0 inset-x-0" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-ge-green-deep/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16 reveal">
          <span className="text-ge-text-dim text-xs uppercase tracking-[0.3em]">Client Reviews</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-ge-cream mt-3 mb-4">
            What Our Clients <em className="not-italic text-ge-gold">Say</em>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Stars count={5} />
            <span className="text-ge-text-muted text-sm ml-1">5.0 · 200+ Google Reviews</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
            <div key={r.name}
              className={`reveal reveal-delay-${i + 1} p-6 rounded-2xl bg-ge-surface border border-ge-border
                hover:border-ge-green-deep transition-all duration-300 flex flex-col`}>
              <Stars count={r.stars} />
              <p className="text-ge-text-muted text-sm leading-relaxed mt-4 flex-1 italic">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-5 pt-4 border-t border-ge-border">
                <div className="text-ge-cream text-sm font-medium">{r.name}</div>
                <div className="text-ge-text-dim text-xs mt-0.5">{r.town}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Google review CTA */}
        <div className="text-center mt-12 reveal">
          <p className="text-ge-text-muted text-sm">
            Read all our reviews on{' '}
            <span className="text-ge-gold cursor-pointer hover:underline">Google Business</span>
          </p>
        </div>
      </div>
    </section>
  )
}
