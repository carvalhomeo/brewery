import './globals.css'
import { Inter } from 'next/font/google'
import { twMerge } from 'tailwind-merge'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Brewery',
  description: 'List of favorite beers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={twMerge("text-slate-900 antialiased light", inter.className)}>
      <body className="min-h-screen antialiased bg-gradient-to-tl from-blue-200 to-white">
        {children}
      </body>
    </html>
  )
}
