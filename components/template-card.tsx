import Link from "next/link"

import { categoryLabels, type Template } from "@/lib/templates"

export function TemplateCard({ template }: { template: Template }) {
  const plugins = template.plugins.filter((plugin) => !plugin.startsWith("{"))

  return (
    <article className="flex h-full flex-col gap-4 rounded-xl bg-card p-5 shadow-raised dark:shadow-none dark:inset-ring dark:inset-ring-border">
      <div className="flex min-w-0 flex-col gap-2">
        <p className="text-base/7 text-muted-foreground sm:text-sm/6">
          {categoryLabels[template.category]}
        </p>
        <h2 className="min-w-0 text-lg font-medium text-balance">
          <Link
            href={`/templates/${template.slug}`}
            className="text-foreground hover:underline hover:decoration-foreground/30 hover:underline-offset-4"
          >
            {template.name}
          </Link>
        </h2>
        <p className="text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
          {template.title}.
        </p>
      </div>
      <p className="text-base/7 text-pretty sm:text-sm/6">
        {template.description}
      </p>
      <dl className="mt-auto flex flex-wrap gap-x-3 gap-y-1 text-base/7 text-muted-foreground tabular-nums sm:text-sm/6">
        <div className="flex gap-1">
          <dt className="font-medium text-foreground">
            {template.skills.length}
          </dt>
          <dd>{template.skills.length === 1 ? "skill" : "skills"}</dd>
        </div>
        <div className="flex gap-1">
          <dt className="font-medium text-foreground">
            {template.routines.length}
          </dt>
          <dd>{template.routines.length === 1 ? "routine" : "routines"}</dd>
        </div>
      </dl>
      {plugins.length > 0 ? (
        <p className="text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
          {plugins.join(" · ")}
        </p>
      ) : null}
      <p className="text-base/7 sm:text-sm/6">
        <Link
          href={`/templates/${template.slug}`}
          className="text-foreground hover:underline hover:decoration-foreground/30 hover:underline-offset-4"
        >
          Read recipe
        </Link>
      </p>
    </article>
  )
}
