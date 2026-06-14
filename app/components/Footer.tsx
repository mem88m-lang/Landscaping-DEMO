export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ge-dark border-t border-ge-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-ge-green-mid flex items-center justify-center">
                <svg className="w-5 h-5 text-ge-cream" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-13 2 0 0 2.5-2 6.5-2C19 3 19 1 19 1S17 2 17 8z"/>
                </svg>
              </div>
              <div>
                <div className="font-display text-ge-cream font-semibold text-lg leading-none">GreenEdge</div>
                <div className="text-ge-text-dim text-[10px] uppercase tracking-[0.2em]">Landscaping Co.</div>
              </div>
            </div>
            <p className="text-ge-text-muted text-sm leading-relaxed max-w-xs">
              Massachusetts&apos; trusted landscaping partner since 2009. Serving residential and commercial properties year-round throughout Greater Boston and MetroWest.
            </p>
            <div className="flex gap-3 mt-5">
              {['facebook', 'instagram', 'google'].map(s => (
                <div key={s} className="w-8 h-8 rounded-full bg-ge-surface border border-ge-border flex items-center justify-center hover:border-ge-green-mid transition-colors cursor-pointer">
                  <span className="text-ge-text-dim text-xs">{s[0].toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="text-ge-cream text-xs uppercase tracking-[0.2em] mb-4">Services</div>
            <ul className="space-y-2.5">
              {['Lawn Maintenance', 'Garden Design', 'Hardscaping', 'Irrigation', 'Snow Plowing', 'Ice Management'].map(s => (
                <li key={s}>
                  <a href="#services" className="text-ge-text-muted text-sm hover:text-ge-cream transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-ge-cream text-xs uppercase tracking-[0.2em] mb-4">Contact</div>
            <ul className="space-y-3 text-ge-text-muted text-sm">
              <li>(617) 555-0182</li>
              <li>hello@greenedgema.com</li>
              <li className="leading-relaxed">Greater Boston &<br />MetroWest, MA</li>
              <li className="pt-2">
                <a href="#contact"
                  className="inline-block px-4 py-2 bg-ge-green-deep border border-ge-green-mid text-ge-green-light text-xs rounded-full hover:bg-ge-green-mid hover:text-ge-cream transition-all">
                  Free Quote →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-line mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-ge-text-dim text-xs">
          <span>© {year} GreenEdge Landscaping Co. · All rights reserved.</span>
          <span>Licensed & Insured · MA Contractor #HIC-123456</span>
        </div>
      </div>
    </footer>
  )
}
