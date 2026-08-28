import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { PageContainer } from "@/components/page-container"
import { TemplateCard } from "@/components/template-card"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"
import { getRelatedTemplates, getTemplate, templates } from "@/lib/templates"

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
  const shareHost = template.shareUrl.replace(/^https:\/\//, "")

  return (
    <main>
      <PageContainer className="py-12 sm:py-16">
        <p className="text-base/7 sm:text-sm/6">
          <Link href="/" className="link-muted">
            Templates
          </Link>
        </p>
        <article className="mt-8 max-w-[56ch]">
          <h1 className="text-4xl font-semibold tracking-tight text-balance">
            {template.name}
          </h1>
          <p className="mt-5 text-base/7 text-pretty text-muted-foreground">
            {template.description}
          </p>
          {template.author ? (
            <p className="mt-4 text-base/7 sm:text-sm/6">
              <a
                href={template.author.url}
                target="_blank"
                rel="noreferrer"
                className="link-muted"
              >
                {template.author.handle}
              </a>
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              nativeButton={false}
              render={
                <a href={template.shareUrl} target="_blank" rel="noreferrer" />
              }
            >
              Add to Grok Bot
            </Button>
          </div>
          <p className="mt-6">
            <a
              href={template.shareUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm break-all link-muted"
            >
              {shareHost}
            </a>
          </p>
          <p className="mt-10 text-base/7 sm:text-sm/6">
            <a
              href={site.docs}
              target="_blank"
              rel="noreferrer"
              className="link-muted"
            >
              Grok Bot docs
            </a>
          </p>
        </article>

        {related.length > 0 ? (
          <section className="mt-20">
            <h2 className="text-xl font-semibold text-balance">Related jobs</h2>
            <div className="@container mt-6">
              <ul
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
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
