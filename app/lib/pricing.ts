// ─── Pricing Engine ───────────────────────────────────────────────────────────
// All estimates are ranges in USD. Owner sees these; client gets the range.

export interface QuoteAnswers {
  name: string
  email: string
  phone: string
  contactMethod: string   // 'email' | 'text' | 'whatsapp'
  address: string
  propertyType: string    // 'Residential' | 'Commercial'
  lotSize: string         // sq ft bucket
  services: string[]      // multiple
  lawmFrequency: string
  snowDetails: string     // 'Driveway only' | 'Driveway + walkways' | 'Full property'
  hardscapeType: string   // 'Patio' | 'Walkway' | 'Retaining wall' | 'Multiple'
  gardenBudget: string
  startDate: string
  notes: string
}

export interface LineItem {
  service: string
  detail: string
  low: number
  high: number
  unit: string
}

export interface Quote {
  lines: LineItem[]
  totalLow: number
  totalHigh: number
  isMonthly: boolean   // true for recurring, false for one-time project
}

// Map lot-size label → sq ft midpoint
const LOT_SQ: Record<string, number> = {
  'Under 2,000 sq ft':    1500,
  '2,000 – 5,000 sq ft':  3500,
  '5,000 – 10,000 sq ft': 7500,
  '10,000 – 20,000 sq ft':15000,
  'Over 20,000 sq ft':    25000,
  'Not sure':              5000,
}

const FREQ_MULT: Record<string, number> = {
  'Weekly':    4.3,
  'Bi-weekly': 2.15,
  'Monthly':   1,
  'One-time':  1,
}

function lawnMowing(a: QuoteAnswers): LineItem {
  const sqft = LOT_SQ[a.lotSize] ?? 5000
  const mult  = FREQ_MULT[a.lawmFrequency] ?? 2
  const commercial = a.propertyType === 'Commercial' ? 1.3 : 1

  let [low, high] =
    sqft < 2000  ? [45,  65]  :
    sqft < 5000  ? [65,  95]  :
    sqft < 10000 ? [95,  135] :
    sqft < 20000 ? [135, 195] :
                   [195, 295]

  low  = Math.round(low  * commercial)
  high = Math.round(high * commercial)

  const monthly_low  = Math.round(low  * mult)
  const monthly_high = Math.round(high * mult)

  return {
    service: 'Lawn Mowing & Maintenance',
    detail:  `${a.lawmFrequency} · ${a.lotSize}`,
    low:  monthly_low,
    high: monthly_high,
    unit: '/month',
  }
}

function snowPlowing(a: QuoteAnswers): LineItem {
  const scope = a.snowDetails || 'Driveway only'
  const commercial = a.propertyType === 'Commercial' ? 1.5 : 1
  let [low, high] =
    scope === 'Driveway only'          ? [75,  95]  :
    scope === 'Driveway + walkways'    ? [95,  145] :
                                         [150, 250]

  low  = Math.round(low  * commercial)
  high = Math.round(high * commercial)

  return {
    service: 'Snow Plowing & Ice Management',
    detail:  scope,
    low, high,
    unit: '/push',
  }
}

function fertilization(a: QuoteAnswers): LineItem {
  const sqft = LOT_SQ[a.lotSize] ?? 5000
  let [low, high] =
    sqft < 2000  ? [65,  85]  :
    sqft < 5000  ? [85,  120] :
    sqft < 10000 ? [120, 175] :
                   [175, 260]

  return { service: 'Fertilization & Weed Control', detail: 'Per application (4–6/yr)', low, high, unit: '/application' }
}

function aeration(a: QuoteAnswers): LineItem {
  const sqft = LOT_SQ[a.lotSize] ?? 5000
  let [low, high] = sqft < 5000 ? [120, 175] : sqft < 10000 ? [175, 260] : [260, 380]
  return { service: 'Aeration & Overseeding', detail: 'One-time or seasonal', low, high, unit: '/visit' }
}

function mulching(a: QuoteAnswers): LineItem {
  const sqft = LOT_SQ[a.lotSize] ?? 5000
  let [low, high] = sqft < 2000 ? [150, 250] : sqft < 5000 ? [250, 450] : [450, 750]
  return { service: 'Mulching & Bed Maintenance', detail: 'Materials + labor', low, high, unit: '/season' }
}

function trimming(): LineItem {
  return { service: 'Tree & Shrub Trimming', detail: 'Per visit (varies by count)', low: 125, high: 350, unit: '/visit' }
}

function irrigation(): LineItem {
  return { service: 'Irrigation Installation', detail: 'Design + installation', low: 1800, high: 4500, unit: ' (project)' }
}

function hardscaping(a: QuoteAnswers): LineItem {
  const type = a.hardscapeType || 'Patio'
  let [low, high] =
    type === 'Walkway'        ? [1200, 4500]  :
    type === 'Retaining wall' ? [2500, 8000]  :
    type === 'Multiple'       ? [5000, 18000] :
                                 [3500, 12000]  // Patio
  return { service: 'Hardscaping', detail: type + ' — design & installation', low, high, unit: ' (project)' }
}

function gardenDesign(a: QuoteAnswers): LineItem {
  const budget = a.gardenBudget || 'Mid-range'
  let [low, high] =
    budget === 'Under $1,000'    ? [750,   1200] :
    budget === '$1,000 – $3,000' ? [1000,  3000] :
    budget === '$3,000 – $8,000' ? [3000,  8000] :
                                    [8000,  20000]
  return { service: 'Garden Design & Planting', detail: budget + ' budget', low, high, unit: ' (project)' }
}

function holidayLighting(): LineItem {
  return { service: 'Holiday Lighting', detail: 'Install, maintenance & removal', low: 450, high: 1400, unit: '/season' }
}

const SERVICE_FN: Record<string, (a: QuoteAnswers) => LineItem> = {
  'Lawn Mowing & Maintenance':       lawnMowing,
  'Snow Plowing & Ice Management':   snowPlowing,
  'Fertilization & Weed Control':    fertilization,
  'Aeration & Overseeding':          aeration,
  'Mulching & Bed Maintenance':      mulching,
  'Tree & Shrub Trimming':           trimming,
  'Irrigation Installation':         irrigation,
  'Hardscaping':                     hardscaping,
  'Garden Design & Planting':        gardenDesign,
  'Holiday Lighting':                holidayLighting,
}

export function calculateQuote(a: QuoteAnswers): Quote {
  const lines: LineItem[] = []

  for (const svc of a.services) {
    const fn = SERVICE_FN[svc]
    if (fn) lines.push(fn(a))
  }

  const totalLow  = lines.reduce((s, l) => s + l.low,  0)
  const totalHigh = lines.reduce((s, l) => s + l.high, 0)

  // isMonthly if any recurring service selected
  const recurring = ['Lawn Mowing & Maintenance','Snow Plowing & Ice Management','Fertilization & Weed Control','Mulching & Bed Maintenance','Tree & Shrub Trimming']
  const isMonthly = a.services.some(s => recurring.includes(s))

  return { lines, totalLow, totalHigh, isMonthly }
}

export function formatQuoteForEmail(a: QuoteAnswers, q: Quote): string {
  const lines = q.lines.map(l =>
    `• ${l.service}: $${l.low.toLocaleString()}–$${l.high.toLocaleString()}${l.unit} (${l.detail})`
  ).join('\n')

  return `
NEW QUOTE REQUEST — Martinez Landscaping
==========================================
Client: ${a.name}
Email:  ${a.email}
Phone:  ${a.phone}  (prefers: ${a.contactMethod})
Address: ${a.address}
Property: ${a.propertyType} · ${a.lotSize}
Start date: ${a.startDate || 'ASAP'}
Notes: ${a.notes || 'None'}

SERVICES REQUESTED:
${lines}

TOTAL ESTIMATE: $${q.totalLow.toLocaleString()}–$${q.totalHigh.toLocaleString()}${q.isMonthly ? '/month' : ' (project)'}
==========================================
Sent from Martinez Landscaping website chat.
  `.trim()
}

export function formatQuoteForClient(a: QuoteAnswers, q: Quote): string {
  const lines = q.lines.map(l =>
    `• ${l.service}: $${l.low.toLocaleString()}–$${l.high.toLocaleString()}${l.unit}`
  ).join('\n')

  return `
Hi ${a.name},

Thank you for reaching out to Martinez Landscaping! We've reviewed your request and prepared a custom estimate for your property at ${a.address}.

YOUR ESTIMATE:
${lines}

TOTAL: $${q.totalLow.toLocaleString()}–$${q.totalHigh.toLocaleString()}${q.isMonthly ? '/month' : ' (project total)'}

This is an estimated range based on the information you provided. A member of our team will follow up within the hour to confirm pricing and schedule a free on-site visit.

Questions? Reply to this email or call us at (617) 555-0182.

— The Martinez Team
Martinez Landscaping Co. | Licensed & Insured | Massachusetts
  `.trim()
}
