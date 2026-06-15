'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import emailjs from '@emailjs/browser'
import { calculateQuote, formatQuoteForEmail, formatQuoteForClient, QuoteAnswers } from '../lib/pricing'

const EJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EJS_SERVICE_ID  ?? ''
const EJS_OWNER_TPL   = process.env.NEXT_PUBLIC_EJS_OWNER_TPL   ?? ''
const EJS_CLIENT_TPL  = process.env.NEXT_PUBLIC_EJS_CLIENT_TPL  ?? ''
const EJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EJS_PUBLIC_KEY  ?? ''
const OWNER_EMAIL     = process.env.NEXT_PUBLIC_OWNER_EMAIL      ?? 'mem88m@gmail.com'
const OWNER_SMS_EMAIL = process.env.NEXT_PUBLIC_OWNER_SMS_EMAIL  ?? '6178628607@tmomail.net'
const OWNER_WHATSAPP  = process.env.NEXT_PUBLIC_OWNER_WHATSAPP   ?? '16178628607'
const GOOGLE_API_KEY  = process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY ?? ''

const ALL_SERVICES = [
  'Lawn Mowing & Maintenance',
  'Snow Plowing & Ice Management',
  'Fertilization & Weed Control',
  'Aeration & Overseeding',
  'Mulching & Bed Maintenance',
  'Tree & Shrub Trimming',
  'Irrigation Installation',
  'Hardscaping',
  'Garden Design & Planting',
  'Holiday Lighting',
]

const LOT_SIZES = [
  'Under 2,000 sq ft',
  '2,000 – 5,000 sq ft',
  '5,000 – 10,000 sq ft',
  '10,000 – 20,000 sq ft',
  'Over 20,000 sq ft',
  'Not sure',
]

type Step =
  | 'idle' | 'name' | 'email' | 'phone' | 'contact_method'
  | 'address' | 'property_type' | 'lot_size' | 'services'
  | 'lawn_freq' | 'snow_detail' | 'hardscape_type' | 'garden_budget'
  | 'start_date' | 'notes' | 'sending' | 'done' | 'error'

interface Msg { from: 'bot' | 'user'; text: string }

const NEEDS_LAWN_FREQ   = (s: string[]) => s.includes('Lawn Mowing & Maintenance')
const NEEDS_SNOW_DETAIL = (s: string[]) => s.includes('Snow Plowing & Ice Management')
const NEEDS_HARDSCAPE   = (s: string[]) => s.includes('Hardscaping')
const NEEDS_GARDEN      = (s: string[]) => s.includes('Garden Design & Planting')

export default function QuoteSection() {
  const [visible, setVisible]   = useState(false)
  const [started, setStarted]   = useState(true)
  const [step, setStep]         = useState<Step>('name')
  const [msgs, setMsgs]         = useState<Msg[]>([])
  const [input, setInput]       = useState('')
  const [chips, setChips]       = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [answers, setAnswers]   = useState<Partial<QuoteAnswers>>({})
  const [waText, setWaText]     = useState('')

  const sectionRef  = useRef<HTMLDivElement>(null)
  const bottomRef   = useRef<HTMLDivElement>(null)
  const inputRef    = useRef<HTMLInputElement>(null)
  const addressRef  = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

  // Reveal section on scroll + auto-start chat
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          setTimeout(() => addBot("👋 Hi! I'm the Martinez quote assistant.\n\nI'll gather a few details and send a custom estimate straight to your phone or inbox — no waiting.\n\nWhat's your first name?"), 400)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // Load Google Places script
  useEffect(() => {
    if (!GOOGLE_API_KEY || document.getElementById('gplaces')) return
    const script = document.createElement('script')
    script.id  = 'gplaces'
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`
    script.async = true
    document.head.appendChild(script)
  }, [])

  // Init autocomplete when address step is active
  useEffect(() => {
    if (step !== 'address' || !GOOGLE_API_KEY) return
    const tryInit = () => {
      if (!addressRef.current || !(window as any).google?.maps?.places) {
        setTimeout(tryInit, 300)
        return
      }
      autocompleteRef.current = new (window as any).google.maps.places.Autocomplete(
        addressRef.current,
        { types: ['address'], componentRestrictions: { country: 'us' } }
      )
      autocompleteRef.current!.addListener('place_changed', () => {
        const place = autocompleteRef.current!.getPlace()
        if (place.formatted_address) {
          setInput(place.formatted_address)
        }
      })
    }
    tryInit()
  }, [step])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    if (!['services','sending','done','idle'].includes(step)) {
      setTimeout(() => {
        const el = step === 'address' ? addressRef.current : inputRef.current
        el?.focus()
      }, 120)
    }
  }, [msgs, step])

  function addBot(text: string, newChips: string[] = []) {
    setMsgs(m => [...m, { from: 'bot', text }])
    setChips(newChips)
  }
  function addUser(text: string) {
    setMsgs(m => [...m, { from: 'user', text }])
    setChips([])
  }

  function startChat() {
    setStarted(true)
    setStep('name')
    setTimeout(() => addBot("👋 Hi! I'm the Martinez quote assistant.\n\nI'll gather a few details and send a custom estimate straight to your phone or inbox — no waiting.\n\nWhat's your first name?"), 200)
  }

  function nextAfterServices(svc: string[], a: Partial<QuoteAnswers>) {
    if (NEEDS_LAWN_FREQ(svc)) {
      addBot('How often do you want lawn mowing?', ['Weekly', 'Bi-weekly', 'Monthly', 'One-time'])
      setStep('lawn_freq')
    } else if (NEEDS_SNOW_DETAIL(svc)) {
      addBot('What areas need snow service?', ['Driveway only', 'Driveway + walkways', 'Full property'])
      setStep('snow_detail')
    } else if (NEEDS_HARDSCAPE(svc)) {
      addBot('What type of hardscaping project?', ['Patio', 'Walkway', 'Retaining wall', 'Multiple'])
      setStep('hardscape_type')
    } else if (NEEDS_GARDEN(svc)) {
      addBot("What's your approximate garden budget?", ['Under $1,000', '$1,000 – $3,000', '$3,000 – $8,000', 'Over $8,000'])
      setStep('garden_budget')
    } else {
      addBot('When are you hoping to get started?', ['ASAP', 'Within 2 weeks', 'Next month', 'Just exploring'])
      setStep('start_date')
    }
  }

  function advance(value: string, currentStep: Step, currentAnswers: Partial<QuoteAnswers>) {
    const a = { ...currentAnswers }
    switch (currentStep) {
      case 'name':
        a.name = value; setAnswers(a)
        addBot(`Great to meet you, ${value}! 📧 What's your email address?`)
        setStep('email'); break
      case 'email':
        a.email = value; setAnswers(a)
        addBot("📱 What's your phone number?")
        setStep('phone'); break
      case 'phone':
        a.phone = value; setAnswers(a)
        addBot('How would you like to receive your quote?', ['Email', 'Text message', 'WhatsApp'])
        setStep('contact_method'); break
      case 'contact_method':
        a.contactMethod = value; setAnswers(a)
        addBot('📍 What\'s your property address?')
        setStep('address'); break
      case 'address':
        a.address = value; setAnswers(a)
        addBot('Is this a residential or commercial property?', ['Residential', 'Commercial'])
        setStep('property_type'); break
      case 'property_type':
        a.propertyType = value; setAnswers(a)
        addBot('How large is the property?', LOT_SIZES)
        setStep('lot_size'); break
      case 'lot_size':
        a.lotSize = value; setAnswers(a)
        addBot('Which services are you interested in? Select all that apply, then tap ✅ Done.')
        setStep('services'); break
      case 'lawn_freq':
        a.lawmFrequency = value; setAnswers(a)
        if (NEEDS_SNOW_DETAIL(a.services!)) { addBot('What areas need snow service?', ['Driveway only', 'Driveway + walkways', 'Full property']); setStep('snow_detail') }
        else if (NEEDS_HARDSCAPE(a.services!)) { addBot('What type of hardscaping project?', ['Patio', 'Walkway', 'Retaining wall', 'Multiple']); setStep('hardscape_type') }
        else if (NEEDS_GARDEN(a.services!)) { addBot("What's your approximate garden budget?", ['Under $1,000', '$1,000 – $3,000', '$3,000 – $8,000', 'Over $8,000']); setStep('garden_budget') }
        else { addBot('When are you hoping to get started?', ['ASAP', 'Within 2 weeks', 'Next month', 'Just exploring']); setStep('start_date') }
        break
      case 'snow_detail':
        a.snowDetails = value; setAnswers(a)
        if (NEEDS_HARDSCAPE(a.services!)) { addBot('What type of hardscaping project?', ['Patio', 'Walkway', 'Retaining wall', 'Multiple']); setStep('hardscape_type') }
        else if (NEEDS_GARDEN(a.services!)) { addBot("What's your approximate garden budget?", ['Under $1,000', '$1,000 – $3,000', '$3,000 – $8,000', 'Over $8,000']); setStep('garden_budget') }
        else { addBot('When are you hoping to get started?', ['ASAP', 'Within 2 weeks', 'Next month', 'Just exploring']); setStep('start_date') }
        break
      case 'hardscape_type':
        a.hardscapeType = value; setAnswers(a)
        if (NEEDS_GARDEN(a.services!)) { addBot("What's your approximate garden budget?", ['Under $1,000', '$1,000 – $3,000', '$3,000 – $8,000', 'Over $8,000']); setStep('garden_budget') }
        else { addBot('When are you hoping to get started?', ['ASAP', 'Within 2 weeks', 'Next month', 'Just exploring']); setStep('start_date') }
        break
      case 'garden_budget':
        a.gardenBudget = value; setAnswers(a)
        addBot('When are you hoping to get started?', ['ASAP', 'Within 2 weeks', 'Next month', 'Just exploring'])
        setStep('start_date'); break
      case 'start_date':
        a.startDate = value; setAnswers(a)
        addBot('Any additional details? (special requests, access instructions, etc.) — or press Enter to skip.')
        setStep('notes'); break
      case 'notes':
        a.notes = value || 'None'; setAnswers(a)
        submitQuote(a as QuoteAnswers); break
    }
  }

  async function submitQuote(a: QuoteAnswers) {
    setStep('sending')
    addBot('⏳ Calculating your quote and sending it now...')
    const quote   = calculateQuote(a)
    const ownerBody  = formatQuoteForEmail(a, quote)
    const clientBody = formatQuoteForClient(a, quote)
    const wa = encodeURIComponent(`Hi Martinez Landscaping! I just submitted a quote request. My name is ${a.name} — looking forward to hearing from you!`)
    setWaText(wa)
    try {
      if (EJS_SERVICE_ID && EJS_OWNER_TPL) {
        await emailjs.send(EJS_SERVICE_ID, EJS_OWNER_TPL, { to_email: OWNER_EMAIL, subject: `🌿 New Quote — ${a.name} (${a.phone})`, message: ownerBody }, EJS_PUBLIC_KEY)
        if (OWNER_SMS_EMAIL) await emailjs.send(EJS_SERVICE_ID, EJS_OWNER_TPL, { to_email: OWNER_SMS_EMAIL, subject: '', message: `Martinez lead: ${a.name} · ${a.phone} · ${a.services.join(', ')} · ${a.address}` }, EJS_PUBLIC_KEY)
        if (EJS_CLIENT_TPL) await emailjs.send(EJS_SERVICE_ID, EJS_CLIENT_TPL, { to_email: a.email, to_name: a.name, subject: 'Your Martinez Landscaping Estimate Is Ready', message: clientBody }, EJS_PUBLIC_KEY)
      }
      setStep('done')
      setMsgs(m => [...m, { from: 'bot', text: `✅ Done, ${a.name}! Your quote has been sent to ${a.contactMethod === 'Email' ? a.email : a.contactMethod === 'Text message' ? `${a.phone} via text` : 'your WhatsApp'}.\n\nOur team will follow up within the hour to confirm and schedule a free on-site visit. 🌿` }])
    } catch {
      setStep('error')
      addBot("⚠️ Something went wrong. Please call us directly at (617) 862-8607 and we'll help you right away.")
    }
  }

  function handleSend(value?: string) {
    const text = (value ?? input).trim()
    if (!text && step !== 'notes') return
    const val = text || 'No additional details'
    addUser(val)
    setInput('')
    setTimeout(() => advance(val, step, answers), 350)
  }

  function confirmServices() {
    if (selected.length === 0) return
    const a = { ...answers, services: selected }
    setAnswers(a)
    addUser(selected.join(', '))
    setSelected([])
    setTimeout(() => nextAfterServices(selected, a), 350)
  }

  return (
    <section id="quote" ref={sectionRef} className="relative bg-ge-black py-0 overflow-hidden">

      <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

        {/* ── Chat ─────────────────────────────────────────────────────── */}
        {(
          <div className="max-w-3xl mx-auto px-6 lg:px-10 py-16">
            <div className="bg-ge-surface border border-ge-border rounded-3xl overflow-hidden shadow-2xl shadow-black/40">

              {/* Chat header */}
              <div className="flex items-center gap-3 px-6 py-4 bg-ge-dark border-b border-ge-border">
                <div className="w-9 h-9 rounded-full bg-ge-green-mid flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-13 2 0 0 2.5-2 6.5-2C19 3 19 1 19 1S17 2 17 8z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-ge-cream text-sm font-medium">Martinez Quote Assistant</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ge-green-bright animate-pulse" />
                    <span className="text-ge-text-muted text-xs">Free estimate · Delivered to you</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="px-6 py-5 space-y-3 min-h-[260px] max-h-[420px] overflow-y-auto">
                {msgs.map((m, i) => (
                  <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                      ${m.from === 'bot'
                        ? 'bg-ge-dark border border-ge-border text-ge-text-primary rounded-tl-sm'
                        : 'bg-ge-green-mid text-white rounded-tr-sm'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}

                {/* Chips */}
                {chips.length > 0 && step !== 'services' && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {chips.map(c => (
                      <button key={c} onClick={() => handleSend(c)}
                        className="px-3 py-1.5 rounded-full border border-ge-green-mid text-ge-green-light text-xs hover:bg-ge-green-mid hover:text-white transition-all duration-200">
                        {c}
                      </button>
                    ))}
                  </div>
                )}

                {/* Multi-select services */}
                {step === 'services' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {ALL_SERVICES.map(svc => (
                      <button key={svc} onClick={() => setSelected(s => s.includes(svc) ? s.filter(x => x !== svc) : [...s, svc])}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border text-sm text-left transition-all duration-200
                          ${selected.includes(svc)
                            ? 'border-ge-green-mid bg-ge-green-deep text-ge-cream'
                            : 'border-ge-border bg-ge-surface text-ge-text-muted hover:border-ge-green-deep hover:text-ge-cream'}`}>
                        <span className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors
                          ${selected.includes(svc) ? 'border-ge-green-light bg-ge-green-mid' : 'border-ge-text-dim'}`}>
                          {selected.includes(svc) && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                            </svg>
                          )}
                        </span>
                        {svc}
                      </button>
                    ))}
                    <button onClick={confirmServices} disabled={selected.length === 0}
                      className="sm:col-span-2 py-3 mt-1 rounded-xl bg-ge-green-mid disabled:opacity-40 text-white text-sm font-medium hover:bg-ge-green-bright transition-colors">
                      ✅ Done — {selected.length} service{selected.length !== 1 ? 's' : ''} selected
                    </button>
                  </div>
                )}

                {/* Done — WhatsApp */}
                {step === 'done' && (
                  <a href={`https://wa.me/${OWNER_WHATSAPP}?text=${waText}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full max-w-xs py-3 rounded-xl bg-[#25D366] hover:bg-[#20bc5a] text-white text-sm font-medium transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Also message us on WhatsApp
                  </a>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input */}
              {!['services','done','sending','error','idle'].includes(step) && (
                <div className="px-6 py-4 border-t border-ge-border bg-ge-dark">
                  <div className="flex gap-3">
                    <input
                      ref={step === 'address' ? addressRef : inputRef}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSend()}
                      placeholder={step === 'notes' ? 'Optional — press Enter to skip' : step === 'address' ? 'Start typing your address...' : 'Type your answer…'}
                      autoComplete={step === 'address' ? 'street-address' : step === 'email' ? 'email' : step === 'phone' ? 'tel' : step === 'name' ? 'given-name' : 'off'}
                      className="flex-1 bg-ge-surface border border-ge-border rounded-xl px-4 py-3 text-ge-cream text-sm placeholder-ge-text-dim focus:outline-none focus:border-ge-green-mid transition-colors"
                    />
                    <button onClick={() => handleSend()}
                      className="px-5 py-3 rounded-xl bg-ge-green-mid hover:bg-ge-green-bright text-white text-sm font-medium transition-colors flex-shrink-0">
                      Send →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
