import type { Metadata } from "next"

import { CopyButton } from "@/components/copy-button"
import { PageContainer } from "@/components/page-container"
import { contributingUrl, newPrUrl, site } from "@/lib/site"

const cli = `pnpm template:new -- \\
  --name "Chieeeeefy" \\
  --category assistants \\
  --description "Field-engineer chief of staff for calendar, Gmail, and Notion." \\
  --share https://x.ai/bot/GiBPBQR2WrHNul4k9Tz6Q \\
  --author @you`

export const metadata: Metadata = {
  title: "Submit a template",
  description:
    "Publish a Grok Bot share link and open a pull request. Listing is the merge.",
}

export default function WritePage() {
  return (
    <main>
      <PageContainer className="py-12 sm:py-16">
        <h1 className="max-w-[35ch] text-4xl font-semibold tracking-tight text-balance">
          Submit a job.
        </h1>
        <p className="mt-5 max-w-[48ch] text-lg text-pretty text-muted-foreground">
          Publish a share link, open a PR. It shows up here when the PR merges.
        </p>
        <ol className="mt-8 flex max-w-[56ch] list-decimal flex-col gap-4 pl-5 text-base/7 text-pretty">
          <li>
            Get the bot good at one job. Export it as a public template. Copy
            the <span className="font-mono text-sm">x.ai/bot/…</span> link.
          </li>
          <li>
            Fork{" "}
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="link-text"
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
        <div className="mt-8 flex max-w-[56ch] flex-col gap-6 text-base/7">
          <p className="text-pretty">
            Category is assistants, engineering, research, money, sales,
            creative, or life. Share link is required. We do not list copy-paste
            prompts.
          </p>
          <p className="text-pretty">
            Then <code className="font-mono text-sm">pnpm template:check</code>,
            push a branch, and{" "}
            <a
              href={newPrUrl}
              target="_blank"
              rel="noreferrer"
              className="link-text"
            >
              open a pull request
            </a>
            . Full steps:{" "}
            <a
              href={contributingUrl}
              target="_blank"
              rel="noreferrer"
              className="link-text"
            >
              CONTRIBUTING.md
            </a>
            .
          </p>
        </div>
      </PageContainer>
    </main>
  )
}
