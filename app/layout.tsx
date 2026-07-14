import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Dancing_Script, Sacramento, Lora, Inter } from 'next/font/google'
import './globals.css'

const dancing = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing' })
const sacramento = Sacramento({ subsets: ['latin'], weight: '400', variable: '--font-sacramento' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

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
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dancing.variable} ${sacramento.variable} ${lora.variable} ${inter.variable}`}>
      <body className="antialiased font-inter bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
