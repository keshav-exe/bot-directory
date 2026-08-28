import type { Metadata } from "next"
import Link from "next/link"

import { PageContainer } from "@/components/page-container"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Guide",
  description:
    "What a Grok Bot is, how to install a share link, and how to list one here.",
}

export default function GuidePage() {
  return (
    <main>
      <PageContainer className="py-12 sm:py-16">
        <article className="prose max-w-[65ch]">
          <h1>How this directory works</h1>
          <p>
            A Grok Bot is a named job with its own chat and memory of how you
            like the work done. It has skills and routines, and it runs on a
            computer in the cloud, so it can sign into tools and keep going
            after you close the laptop.
          </p>
          <p>
            Every bot on your account shares that one computer: files, logins,
            browser. Separate chats, same machine. Give each bot a tight job,
            and keep send, buy, delete, and publish behind your approval.
          </p>

          <h2>What a listing is</h2>
          <p>
            A listing here is a public share link. Open{" "}
            <a href={site.url} target="_blank" rel="noreferrer">
              x.ai/bot/…
            </a>
            , hit Add to Grok Bot, and you get a fresh copy on your account.
            Same playbook, your machine, your approvals. We do not rehost packed
            configs or paste-in prompts.
          </p>

          <h2 id="install">How to install one</h2>
          <ol>
            <li>Open the share link.</li>
            <li>Read the preview: name, job, skills, routines, plugins.</li>
            <li>Hit Add to Grok Bot.</li>
            <li>
              Confirm Add to Bot in the second review. That creates a copy on
              your account.
            </li>
            <li>
              Connect any plugins it asks for, then give it one real task.
            </li>
          </ol>
          <p>
            You can also paste the link in a chat and say import this as a new
            bot, or merge it into this one. It should show the plan and wait for
            a yes before changing anything.
          </p>
          <p>
            Need the app first?{" "}
            <a href={site.docs} target="_blank" rel="noreferrer">
              Get started with Grok Bot
            </a>
            . Templates need the latest desktop or mobile app.
          </p>

          <h2 id="submit">List one on this site</h2>
          <p>
            This directory is open source. A listing is a merged pull request,
            not a form. Publish a share link, then{" "}
            <Link href="/write">submit it</Link>.
          </p>
          <ol>
            <li>Fork {site.githubRepo}.</li>
            <li>
              Run <code>pnpm template:new</code> with the name, category, blurb,
              author, and <code>x.ai/bot/…</code> link.
            </li>
            <li>
              Run <code>pnpm template:check</code>, open a PR, wait for the
              merge.
            </li>
          </ol>
          <p>
            Leave out secrets, names, private URLs, and one-off chat residue.
            The link is public. Anyone who has it can view the shared
            configuration. We will not merge a dump of someone else&apos;s
            machine, or a scrape of prompt directories.
          </p>

          <h2>Keep the roster small</h2>
          <p>
            Make a separate bot when the work has a distinct goal, tool set,
            working style, approval boundary, or schedule. A job such as General
            Helper gives the bot less guidance and makes its saved context
            harder to reuse.
          </p>
          <p>
            More from xAI:{" "}
            <a href={site.botsDocs} target="_blank" rel="noreferrer">
              Create and manage Bots
            </a>{" "}
            and{" "}
            <a href={site.skillsDocs} target="_blank" rel="noreferrer">
              Skills and routines
            </a>
            .
          </p>
        </article>
      </PageContainer>
    </main>
  )
}
