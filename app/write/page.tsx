import type { Metadata } from "next"
import Link from "next/link"

import { CopyButton } from "@/components/copy-button"
import { PageContainer } from "@/components/page-container"
import { blankRecipe } from "@/lib/templates"

export const metadata: Metadata = {
  title: "Write a recipe",
  description:
    "Fill-in recipe for a Grok Bot template. Paste it into a new bot and publish a share link.",
}

export default function WritePage() {
  return (
    <main>
      <PageContainer className="py-12 sm:py-16">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,28fr)_minmax(0,32fr)] lg:items-start lg:gap-16">
          <div>
            <h1 className="max-w-[35ch] text-4xl font-semibold tracking-tight text-balance">
              Write a recipe.
            </h1>
            <p className="mt-5 max-w-[48ch] text-lg text-pretty text-muted-foreground">
              Two ways: get a bot good at the job, then tell it to export
              itself. Or paste this into a new bot and say turn this into a
              public template.
            </p>
            <div className="mt-8 flex flex-col gap-6 text-base/7">
              <p className="max-w-[56ch] text-pretty">
                Description is the card blurb. Skills are reusable jobs.
                Routines are timed or event jobs with fill-in spots. Plugins are
                connectors, not API keys. Memory is job rules only.
              </p>
              <p className="max-w-[56ch] text-pretty">
                After it stages a draft, review what it packed. Strip secrets,
                names, private URLs, and chat residue. Publish, copy the
                x.ai/bot/… link, then give it one real task on your machine.
              </p>
              <p className="max-w-[56ch] text-pretty">
                Need a worked example?{" "}
                <Link
                  href="/templates/deck-lens"
                  className="text-foreground hover:underline hover:decoration-foreground/30 hover:underline-offset-4"
                >
                  DeckLens is the canonical fill-in
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="min-w-0">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-balance">
                Fill-in recipe
              </h2>
              <CopyButton value={blankRecipe} size="sm" />
            </div>
            <pre className="overflow-x-auto rounded-xl bg-muted p-4 font-mono text-sm/6 text-foreground dark:inset-ring dark:inset-ring-border">
              {blankRecipe}
            </pre>
          </div>
        </div>
      </PageContainer>
    </main>
  )
}
