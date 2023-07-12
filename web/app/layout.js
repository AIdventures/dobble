import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dobble: Discover your artistic doppelgänger',
  description: 'Discover your artistic doppelgänger at the Prado Museum with our AI-powered tool that matches your face to the closest resemblance in famous masterpieces.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
