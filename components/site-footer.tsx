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
            {site.host}. Independent directory. Not affiliated with xAI. Share
            links open third-party templates on x.ai. Open source on GitHub.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul
            className="flex flex-col gap-3 text-base/7 sm:text-sm/6 lg:items-end"
            role="list"
          >
            <li>
              <Link href="/" className="link-muted font-normal">
                Templates
              </Link>
            </li>
            <li>
              <Link href="/guide" className="link-muted font-normal">
                Guide
              </Link>
            </li>
            <li>
              <Link href="/write" className="link-muted font-normal">
                Submit a template
              </Link>
            </li>
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="link-muted font-normal"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={site.docs}
                target="_blank"
                rel="noreferrer"
                className="link-muted font-normal"
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
