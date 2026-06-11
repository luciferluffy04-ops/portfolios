import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Portfol.io — Build your developer portfolio in minutes',
  description: 'Upload your resume or fill in your details.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={`en`} className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}