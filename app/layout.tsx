import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import AnimatedBackground from "@/components/animated-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Andi Muhammad Alief Fauzan | Portfolio",
  description: "Backend Developer and Cloud Computing Specialist",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-LNWNCKVCS3"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LNWNCKVCS3');
            `,
          }} />
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange enableColorScheme>
            <AnimatedBackground />
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
    </html>
  )
}
