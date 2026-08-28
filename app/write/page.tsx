import type { Metadata } from "next"
import Link from "next/link"

import { CopyButton } from "@/components/copy-button"
import { PageContainer } from "@/components/page-container"
import { contributingUrl, newPrUrl, site } from "@/lib/site"
import { blankRecipe } from "@/lib/templates"

const cli = `pnpm template:new -- \\
  --name "DeckLens" \\
  --title "Pitch deck screener" \\
  --category sales \\
  --description "Interviews you on investment criteria, then scores decks." \\
  --why "Every memo is measured against your thesis." \\
  --first-task "Interview me on my investment criteria, then wait for a deck." \\
  --share https://x.ai/bot/… \\
  --author @you \\
  --from recipe.md`

export const metadata: Metadata = {
  title: "Submit a template",
  description:
    "Write a Grok Bot recipe, publish a share link, and open a pull request. Listing is the merge.",
}

export default function WritePage() {
  return (
    <main>
      <PageContainer className="py-12 sm:py-16">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,28fr)_minmax(0,32fr)] lg:items-start lg:gap-16">
          <div>
            <h1 className="max-w-[35ch] text-4xl font-semibold tracking-tight text-balance">
              Submit a job.
            </h1>
            <p className="mt-5 max-w-[48ch] text-lg text-pretty text-muted-foreground">
              Get a bot good at the job, publish a share link, open a PR. It
              shows up here when the PR merges.
            </p>
            <ol className="mt-8 flex max-w-[56ch] list-decimal flex-col gap-4 pl-5 text-base/7 text-pretty">
              <li>
                Write it in Grok Bot, or paste the fill-in recipe into a new bot
                and say turn this into a public template.
              </li>
              <li>
                Review the draft. Strip secrets, names, private URLs, and chat
                residue. Publish. Copy the{" "}
                <span className="font-mono text-sm">x.ai/bot/…</span> link.
              </li>
              <li>
                Fork{" "}
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:underline hover:decoration-foreground/30 hover:underline-offset-4"
                >
                  {site.githubRepo}
                </a>
                , then run the scaffold:
              </li>
            </ol>
            <div className="mt-4 max-w-[56ch]">
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Scaffold</p>
                <CopyButton value={cli} size="sm" label="Copy command" />
              </div>
              <pre className="overflow-x-auto rounded-xl bg-muted p-4 font-mono text-sm/6 text-foreground dark:inset-ring dark:inset-ring-border">
                {cli}
              </pre>
            </div>
            <div className="mt-8 flex flex-col gap-6 text-base/7">
              <p className="max-w-[56ch] text-pretty">
                <code className="font-mono text-sm">--from</code> is the
                markdown on the right. Category is assistants, engineering,
                research, money, sales, creative, or life. Share link is
                optional; recipe-only listings are fine.
              </p>
              <p className="max-w-[56ch] text-pretty">
                Then{" "}
                <code className="font-mono text-sm">pnpm template:check</code>,
                push a branch, and{" "}
                <a
                  href={newPrUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:underline hover:decoration-foreground/30 hover:underline-offset-4"
                >
                  open a pull request
                </a>
                . Full steps:{" "}
                <a
                  href={contributingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:underline hover:decoration-foreground/30 hover:underline-offset-4"
                >
                  CONTRIBUTING.md
                </a>
                .
              </p>
              <p className="max-w-[56ch] text-pretty">
                Need a worked example?{" "}
                <Link
                  href="/templates/deck-lens"
                  className="text-foreground hover:underline hover:decoration-foreground/30 hover:underline-offset-4"
                >
                  DeckLens is the fill-in to copy
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
