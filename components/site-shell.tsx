import { Suspense } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getGitHubStars } from "@/lib/github"

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="isolate flex min-h-dvh flex-col">
      <a
        href="#content"
        className="sr-only bg-primary text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-(--z-toast) focus:rounded-lg focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <Suspense fallback={<SiteHeader />}>
        <HeaderWithStars />
      </Suspense>
      <div className="flex min-w-0 flex-1 flex-col" id="content">
        {children}
      </div>
      <SiteFooter />
    </div>
  )
}

async function HeaderWithStars() {
  const stars = await getGitHubStars()
  return <SiteHeader stars={stars} />
}
