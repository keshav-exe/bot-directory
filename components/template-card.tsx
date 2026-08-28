import { categoryLabels, type Template } from "@/lib/templates"

export function TemplateCard({ template }: { template: Template }) {
  return (
    <article className="relative flex h-full surface-card flex-col rounded-[1.75rem] bg-card p-5 sm:p-6">
      <a
        href={template.shareUrl}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 rounded-[1.75rem] focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
        aria-label={`Open ${template.name} on Grok Bot`}
      />
      <div className="pointer-events-none relative flex min-h-0 flex-1 flex-col gap-3">
        <h2 className="text-lg font-medium text-balance sm:text-xl">
          {template.name}
        </h2>
        <p className="line-clamp-3 text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
          {template.description}
        </p>
        <p className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-4 text-sm text-muted-foreground">
          <span>{categoryLabels[template.category]}</span>
          {template.author ? (
            <>
              <span aria-hidden="true">·</span>
              <a
                href={template.author.url}
                target="_blank"
                rel="noreferrer"
                className="pointer-events-auto link-muted"
              >
                {template.author.handle}
              </a>
            </>
          ) : null}
        </p>
      </div>
    </article>
  )
}
