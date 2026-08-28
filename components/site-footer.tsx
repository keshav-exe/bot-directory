import Link from "next/link"

import { Wordmark } from "@/components/wordmark"
import { site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="flex flex-col gap-2">
          <p>
            <Wordmark />
          </p>
          <p className="max-w-[40ch] text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
            {site.tagline}. Not affiliated with xAI. Share links open
            third-party templates on x.ai.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul
            className="flex flex-col gap-3 text-base/7 sm:text-sm/6 lg:items-end"
            role="list"
          >
            <li>
              <Link
                href="/"
                className="font-normal text-muted-foreground hover:text-foreground"
              >
                Templates
              </Link>
            </li>
            <li>
              <Link
                href="/guide"
                className="font-normal text-muted-foreground hover:text-foreground"
              >
                Guide
              </Link>
            </li>
            <li>
              <Link
                href="/write"
                className="font-normal text-muted-foreground hover:text-foreground"
              >
                Write a recipe
              </Link>
            </li>
            <li>
              <a
                href={site.docs}
                target="_blank"
                rel="noreferrer"
                className="font-normal text-muted-foreground hover:text-foreground"
              >
                Grok Bot docs
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
