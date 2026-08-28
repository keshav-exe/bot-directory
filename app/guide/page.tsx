import type { Metadata } from "next"
import Link from "next/link"

import { PageContainer } from "@/components/page-container"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Guide",
  description:
    "What a Grok Bot is, what a template packs, how to install one, and how to write your own.",
}

export default function GuidePage() {
  return (
    <main>
      <PageContainer className="py-12 sm:py-16">
        <article className="prose max-w-[65ch]">
          <h1>How Grok Bot templates work</h1>
          <p>
            A Grok Bot is a named teammate, not a chat session. It keeps a job,
            a conversation, and some memory of how you like the work done. It
            has its own skills and routines, and it works on a computer in the
            cloud so it can log into tools, click around, and keep going after
            you close the laptop.
          </p>
          <p>
            The weird bit: every bot on your account shares that one computer —
            files, logins, browser. Separate chats, same machine. That is why
            you give each bot a tight job and keep dangerous actions behind your
            approval.
          </p>

          <h2>What a template is</h2>
          <p>
            A template is a shareable copy of the setup, not of the bot itself.
            It packs the name, job, selected memories, skills, routines, and
            which plugins it needs. It strips personal data. It never includes
            the computer, logins, or chat history.
          </p>
          <p>
            Someone opens the{" "}
            <a href={site.url} target="_blank" rel="noreferrer">
              x.ai/bot/…
            </a>{" "}
            link, hits Add to Grok Bot, and gets a fresh copy on their account.
            Same playbook, their machine, their approvals. That is why a
            template is useful in a way a pasted prompt is not: you are handing
            over a working job, not a paragraph.
          </p>

          <h2 id="install">How to install one</h2>
          <ol>
            <li>Open the share link.</li>
            <li>Read the preview: name, job, skills, routines, plugins.</li>
            <li>Hit Add to Grok Bot.</li>
            <li>
              The app opens a second review. Confirm Add to Bot. That creates a
              copy on your account.
            </li>
            <li>
              Connect any plugins it asks for, then give it one real task.
            </li>
          </ol>
          <p>
            You can also paste the link in a chat and say import this as a new
            bot (or merge it into this one). It should show the plan and wait
            for a yes before changing anything.
          </p>
          <p>
            Need the app first?{" "}
            <a href={site.docs} target="_blank" rel="noreferrer">
              Get started with Grok Bot
            </a>
            .
          </p>

          <h2>How to write one</h2>
          <p>
            Easiest path: get a bot actually good at the job, then tell it to
            export itself as a public template. It stages a draft. You review
            what it packed, publish, and copy the x.ai/bot/… link.
          </p>
          <p>
            If you are writing from scratch, paste a recipe into a new bot and
            say turn this into a public template.{" "}
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
            The link is public. Anyone who has it can view the shared
            configuration.
          </p>

          <h2>How to keep a roster small</h2>
          <p>
            Create a separate bot when the work has a distinct goal, tool set,
            working style, approval boundary, or schedule. A job such as General
            Helper gives the bot less guidance and makes its saved context
            harder to reuse.
          </p>
          <p>
            Put explicit safety in the description: never send, buy, delete, or
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
