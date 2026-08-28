import Link from "next/link"
import { Suspense } from "react"

import { Directory } from "@/components/directory"
import { PageContainer } from "@/components/page-container"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const steps = [
  {
    title: "Open a share link",
    body: "Preview name, job, skills, routines, and plugins. Then add a copy to your account.",
  },
  {
    title: "Or paste a recipe",
    body: "Drop the markdown into a new bot and tell it to turn this into a public template.",
  },
  {
    title: "Connect, then one task",
    body: "You get the playbook, not their computer, logins, or chat history.",
  },
] as const

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-border">
        <PageContainer className="flex flex-col gap-12 py-16 sm:py-24">
          <div>
            <p className="font-mono text-sm tracking-wide text-muted-foreground uppercase">
              {site.tagline}
            </p>
            <h1 className="mt-3 max-w-[35ch] text-4xl font-semibold tracking-tight text-balance sm:max-w-[30ch] sm:text-5xl">
              Jobs you can copy.
            </h1>
            <p className="mt-5 max-w-[48ch] text-lg text-pretty text-muted-foreground">
              Named teammates for Grok Bot. Open a share link, or paste a recipe
              into a new bot.
            </p>
            <p className="mt-6 text-base/7 sm:text-sm/6">
              <Link
                href="/guide"
                className="text-foreground hover:underline hover:decoration-foreground/30 hover:underline-offset-4"
              >
                How templates work
              </Link>
            </p>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className={cn(
                  "flex flex-col gap-2 border-border",
                  "not-first:border-t not-first:pt-5 not-last:pb-5",
                  "sm:border-t-0 sm:px-6 sm:pt-0 sm:pb-0 sm:not-first:border-l sm:first:pl-0 sm:last:pr-0"
                )}
              >
                <dt className="font-medium text-foreground">{step.title}</dt>
                <dd className="max-w-[56ch] text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
                  {step.body}
                </dd>
              </div>
            ))}
          </dl>
        </PageContainer>
      </section>
      <section>
        <PageContainer className="py-12 sm:py-16">
          <h2 className="sr-only">Template library</h2>
          <Suspense fallback={<DirectoryFallback />}>
            <Directory />
          </Suspense>
        </PageContainer>
      </section>
    </main>
  )
}

function DirectoryFallback() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-10 max-w-xs rounded-full bg-muted" />
      <div className="h-9 rounded-full bg-muted" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-56 rounded-xl bg-muted" />
        <div className="h-56 rounded-xl bg-muted" />
        <div className="h-56 rounded-xl bg-muted" />
      </div>
    </div>
  )
}
