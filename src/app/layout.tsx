import './globals.css'
import Providers from '@/providers'
import { Inter } from 'next/font/google'
import { twMerge } from 'tailwind-merge'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Brewery',
  description: 'List of favorite beers',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={twMerge('light text-slate-900 antialiased', inter.className)}
    >
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
