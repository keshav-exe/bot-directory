import type { Metadata } from "next"
import Link from "next/link"

import { PageContainer } from "@/components/page-container"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Guide",
  description:
    "What a Grok Bot is, what a template includes, how to install one, and how to write your own.",
}

export default function GuidePage() {
  return (
    <main>
      <PageContainer className="py-12 sm:py-16">
        <article className="prose max-w-[65ch]">
          <h1>How templates work</h1>
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

          <h2>What a template is</h2>
          <p>
            A template is a copy of the setup, not of the bot. It includes the
            name, job, selected memories, skills, routines, and which plugins it
            needs. It strips personal data. It never includes the computer,
            logins, or chat history.
          </p>
          <p>
            Open the{" "}
            <a href={site.url} target="_blank" rel="noreferrer">
              x.ai/bot/…
            </a>{" "}
            link, hit Add to Grok Bot, and you get a fresh copy on your account.
            Same playbook, your machine, your approvals. That is the difference
            from a pasted prompt: you are handing over a working job, not a
            paragraph.
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
            not a form. Write the job, publish a share link if you have one,
            then <Link href="/write">submit the recipe</Link>.
          </p>
          <ol>
            <li>Fork {site.githubRepo}.</li>
            <li>
              Run <code>pnpm template:new</code> with your recipe, category,
              why, first task, and optional <code>x.ai/bot/…</code> link.
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
            machine.
          </p>

          <h2>How to write one</h2>
          <p>
            Get a bot good at the job, then tell it to export itself as a public
            template. It stages a draft. You review what it packed, publish, and
            copy the x.ai/bot/… link.
          </p>
          <p>
            Writing from scratch? Paste a recipe into a new bot and say turn
            this into a public template.{" "}
            <Link href="/write">The fill-in recipe is here</Link>.
          </p>
          <p>The parts:</p>
          <ul>
            <li>
              <strong>Description</strong> is the card blurb.
            </li>
            <li>
              <strong>Skills</strong> are reusable jobs.
            </li>
            <li>
              <strong>Routines</strong> are timed or event jobs, with fill-in
              spots for where the work actually lives.
            </li>
            <li>
              <strong>Plugins</strong> are connectors, not API keys.
            </li>
            <li>
              <strong>Memory</strong> is job rules only. No personal stuff.
            </li>
          </ul>
          <p>
            Leave out secrets, names, private URLs, and one-off chat residue.
          </p>

          <h2>Keep the roster small</h2>
          <p>
            Make a separate bot when the work has a distinct goal, tool set,
            working style, approval boundary, or schedule. A job such as General
            Helper gives the bot less guidance and makes its saved context
            harder to reuse.
          </p>
          <p>
            Put the safety in the description: never send, buy, delete, or
            publish without approval. Use the conversation for the task in front
            of you.
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
