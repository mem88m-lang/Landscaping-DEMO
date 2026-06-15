import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Martinez Landscaping | Massachusetts Premier Landscape Services',
  description: 'Professional landscaping, lawn care, hardscaping, snow removal and property maintenance throughout Massachusetts. Serving residential and commercial clients year-round.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  )
}
