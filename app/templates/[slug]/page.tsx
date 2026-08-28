import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { CopyButton } from "@/components/copy-button"
import { PageContainer } from "@/components/page-container"
import { RecipeBlock } from "@/components/recipe-block"
import { TemplateCard } from "@/components/template-card"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"
import {
  categoryLabels,
  formatRecipe,
  getRelatedTemplates,
  getTemplate,
  templates,
} from "@/lib/templates"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const template = getTemplate(slug)
  if (!template) {
    return { title: "Template" }
  }

  return {
    title: template.name,
    description: template.description,
  }
}

export default async function TemplatePage({ params }: Props) {
  const { slug } = await params
  const template = getTemplate(slug)
  if (!template) {
    notFound()
  }

  const related = getRelatedTemplates(template.slug)
  const recipe = formatRecipe(template)

  return (
    <main>
      <PageContainer className="py-12 sm:py-16">
        <p className="text-base/7 sm:text-sm/6">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
          >
            Templates
          </Link>
        </p>
        <div className="mt-8 flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,38fr)_minmax(0,22fr)] lg:items-start lg:gap-16">
          <article className="min-w-0">
            <p className="font-mono text-sm tracking-wide text-muted-foreground uppercase">
              {categoryLabels[template.category]}
            </p>
            <h1 className="mt-4 max-w-[35ch] text-4xl font-semibold tracking-tight text-balance">
              {template.name}
            </h1>
            <p className="mt-3 max-w-[40ch] text-xl text-pretty text-muted-foreground">
              {template.title}.
            </p>
            <p className="mt-5 max-w-[56ch] text-base/7 text-pretty">
              {template.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {template.shareUrl ? (
                <Button
                  nativeButton={false}
                  render={
                    <a
                      href={template.shareUrl}
                      target="_blank"
                      rel="noreferrer"
                    />
                  }
                >
                  Add to Grok Bot
                </Button>
              ) : null}
              <CopyButton
                value={recipe}
                variant={template.shareUrl ? "outline" : "default"}
              />
            </div>
            {template.author && template.shareUrl ? (
              <p className="mt-4 text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
                Live template from{" "}
                <a
                  href={template.author.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:underline hover:underline-offset-4"
                >
                  {template.author.handle}
                </a>
                . The recipe below is our write-up of the job, not a dump of
                their machine.
              </p>
            ) : (
              <p className="mt-4 text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
                No public share link yet. Paste the recipe into a new bot.
              </p>
            )}

            <section className="mt-14">
              <h2 className="text-xl font-semibold text-balance">
                Why this job
              </h2>
              <p className="mt-3 max-w-[56ch] text-base/7 text-pretty">
                {template.why}
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-semibold text-balance">First task</h2>
              <p className="mt-3 max-w-[56ch] text-base/7 text-pretty">
                After you add it, connect the plugins it asks for, then give it
                this:
              </p>
              <blockquote className="mt-4 max-w-[56ch] border-l-2 border-border pl-4 text-base/7 text-pretty">
                {template.firstTask}
              </blockquote>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-semibold text-balance">Memory</h2>
              <ul className="mt-3 max-w-[56ch] list-disc space-y-2 pl-5 text-base/7 text-pretty">
                {template.memory.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-semibold text-balance">Skills</h2>
              <p className="mt-3 max-w-[56ch] text-base/7 text-pretty text-muted-foreground">
                Reusable jobs. A skill is how. A routine is when.
              </p>
              <div className="mt-6 flex flex-col gap-8">
                {template.skills.map((skill) => (
                  <div key={skill.name}>
                    <h3 className="text-lg font-medium">{skill.name}</h3>
                    <p className="mt-1 text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
                      Use when {skill.useWhen}
                    </p>
                    <ol className="mt-3 list-decimal space-y-2 pl-5 text-base/7 text-pretty">
                      {skill.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-semibold text-balance">Routines</h2>
              <dl className="mt-4 flex flex-col gap-6">
                {template.routines.map((routine) => (
                  <div key={routine.name}>
                    <dt className="font-medium text-foreground">
                      {routine.name}
                    </dt>
                    <dd className="mt-2 max-w-[56ch] text-base/7 text-pretty text-muted-foreground">
                      <span className="text-foreground">When:</span>{" "}
                      {routine.when}
                      <span className="mt-1 block">
                        <span className="text-foreground">Do:</span>{" "}
                        {routine.do}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-semibold text-balance">Plugins</h2>
              {template.plugins.length > 0 ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-base/7 text-pretty">
                  {template.plugins.map((plugin) => (
                    <li key={plugin}>{plugin}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 max-w-[56ch] text-base/7 text-pretty text-muted-foreground">
                  None required to start. Browser and files are enough for the
                  first task.
                </p>
              )}
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-semibold text-balance">Leave out</h2>
              <p className="mt-3 max-w-[56ch] text-base/7 text-pretty">
                {template.leaveOut.join(", ")}.
              </p>
            </section>

            <div className="mt-14">
              <RecipeBlock template={template} />
            </div>
          </article>

          <aside className="min-w-0 lg:sticky lg:top-20">
            <h2 className="text-xl font-semibold text-balance">Install</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-base/7 text-pretty sm:text-sm/6">
              {template.shareUrl ? (
                <>
                  <li>
                    Open the share link. Read the preview: name, job, skills,
                    routines, plugins.
                  </li>
                  <li>Hit Add to Grok Bot. Confirm Add to Bot.</li>
                  <li>
                    Connect plugins it asks for, then give it the first task.
                  </li>
                </>
              ) : (
                <>
                  <li>Create a new bot. Paste the recipe.</li>
                  <li>
                    Say turn this into a public template. Review what it packed.
                  </li>
                  <li>
                    Connect plugins, then give it the first task on this page.
                  </li>
                </>
              )}
            </ol>
            <p className="mt-6 max-w-[40ch] text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
              You can also paste the {template.shareUrl ? "link or " : ""}
              recipe in a chat and say import this as a new bot. It should show
              the plan and wait for a yes.
            </p>
            <p className="mt-4 text-base/7 sm:text-sm/6">
              <Link
                href="/guide#install"
                className="text-foreground hover:underline hover:decoration-foreground/30 hover:underline-offset-4"
              >
                Full install notes
              </Link>
            </p>
            {template.shareUrl ? (
              <p className="mt-6">
                <a
                  href={template.shareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm break-all text-muted-foreground hover:text-foreground"
                >
                  {template.shareUrl.replace("https://", "")}
                </a>
              </p>
            ) : null}
            <p className="mt-8 text-base/7 sm:text-sm/6">
              <a
                href={site.docs}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                Grok Bot docs
              </a>
            </p>
          </aside>
        </div>

        {related.length > 0 ? (
          <section className="mt-20">
            <h2 className="text-xl font-semibold text-balance">Related jobs</h2>
            <div className="@container mt-6">
              <ul
                className="grid grid-cols-1 gap-6 @lg:grid-cols-3"
                role="list"
              >
                {related.map((item) => (
                  <li key={item.slug} className="min-w-0">
                    <TemplateCard template={item} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </PageContainer>
    </main>
  )
}
