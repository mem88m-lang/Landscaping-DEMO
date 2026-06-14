'use client'
import { useEffect, useState } from 'react'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'About',    href: '#about' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Reviews',  href: '#reviews' },
  { label: 'Contact',  href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'nav-scrolled' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-ge-green-mid flex items-center justify-center group-hover:bg-ge-green-bright transition-colors">
            <svg className="w-5 h-5 text-ge-cream" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-13 2 0 0 2.5-2 6.5-2C19 3 19 1 19 1S17 2 17 8z"/>
            </svg>
          </div>
          <div>
            <div className="font-display text-ge-cream font-semibold text-lg leading-none tracking-wide">Martinez Landscaping</div>
            <div className="text-ge-text-muted text-[10px] uppercase tracking-[0.2em] leading-none mt-0.5">Landscaping Co.</div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-ge-text-muted hover:text-ge-cream text-sm tracking-wide transition-colors duration-200">
              {l.label}
            </a>
          ))}
          <a href="#contact"
            className="ml-4 px-5 py-2.5 bg-ge-green-mid hover:bg-ge-green-bright text-ge-cream text-sm font-medium rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-ge-green-mid/30">
            Free Quote
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-2">
          <span className={`block h-0.5 w-6 bg-ge-cream transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-ge-cream transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-ge-cream transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-ge-dark border-t border-ge-border px-6 py-6 flex flex-col gap-5">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-ge-text-primary text-lg font-display">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}
            className="mt-2 px-6 py-3 bg-ge-green-mid text-ge-cream text-sm font-medium rounded-full text-center">
            Free Quote
          </a>
        </div>
      </div>
    </nav>
  )
}
