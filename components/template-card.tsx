import Link from "next/link"

import type { Template } from "@/lib/templates"

export function TemplateCard({ template }: { template: Template }) {
  return (
    <article className="surface-card relative flex h-full flex-col rounded-[1.75rem] bg-card p-6 sm:p-7">
      <Link
        href={`/templates/${template.slug}`}
        className="absolute inset-0 rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
        aria-label={`View ${template.name}`}
      />
      <div className="pointer-events-none relative flex min-h-0 flex-1 flex-col gap-3">
        <h2 className="text-lg font-medium text-balance sm:text-xl">
          {template.name}
        </h2>
        <p className="text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
          {template.title}
        </p>
        <p className="text-base/7 text-pretty sm:text-sm/6">
          {template.description}
        </p>
        {template.author ? (
          <p className="mt-auto pt-4 text-sm">
            <a
              href={template.author.url}
              target="_blank"
              rel="noreferrer"
              className="link-muted pointer-events-auto"
            >
              {template.author.handle}
            </a>
          </p>
        ) : null}
      </div>
    </article>
  )
}
