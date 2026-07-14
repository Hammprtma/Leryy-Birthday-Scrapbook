import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Dancing_Script, Sacramento, Lora, Inter, Special_Elite } from 'next/font/google'
import './globals.css'

const dancing = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing' })
const sacramento = Sacramento({ subsets: ['latin'], weight: '400', variable: '--font-sacramento' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const specialElite = Special_Elite({ subsets: ['latin'], weight: '400', variable: '--font-special-elite' })

export const metadata: Metadata = {
  title: 'Happy Birthday! 🎉',
  description: 'A special birthday greeting scrapbook',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#2a2421',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dancing.variable} ${sacramento.variable} ${lora.variable} ${inter.variable} ${specialElite.variable}`}>
      <body className="antialiased font-inter bg-[#2a2421] text-[#e5b769] overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

