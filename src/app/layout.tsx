import type { Metadata } from 'next'
import css from './layout.module.css'
import "./globals.css"
import Header from './components/Head/Header'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Made by K. Liepkalns',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={css.body}>
        <Header />
        <div className={css.children}>
          {children}
        </div>
      </body>
    </html>
  )
}
