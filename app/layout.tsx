import type { Metadata } from "next"
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SiteShell } from "@/components/site-shell"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans antialiased", sans.variable, fontMono.variable)}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider delay={200}>
            <SiteShell>{children}</SiteShell>
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
