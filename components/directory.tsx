"use client"

import Link from "next/link"
import { useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { TemplateCard } from "@/components/template-card"
import {
  categories,
  categoryLabels,
  searchTemplates,
  templates,
  type Category,
} from "@/lib/templates"
import { cn } from "@/lib/utils"

export function Directory({
  search,
  onSearchChange,
}: {
  search: string
  onSearchChange: (value: string) => void
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const category: Category | "all" =
    categoryParam && categories.includes(categoryParam as Category)
      ? (categoryParam as Category)
      : "all"

  const results = useMemo(() => {
    return searchTemplates(search).filter((template) =>
      category === "all" ? true : template.category === category
    )
  }, [search, category])

  function updateCategory(next: Category | "all") {
    const params = new URLSearchParams(searchParams.toString())
    if (search.trim()) {
      params.set("q", search)
    } else {
      params.delete("q")
    }
    if (next === "all") {
      params.delete("category")
    } else {
      params.set("category", next)
    }
    const nextSearch = params.toString()
    router.replace(nextSearch ? `${pathname}?${nextSearch}` : pathname, {
      scroll: false,
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:min-w-0 sm:flex-1 sm:overflow-x-auto sm:px-0">
          <div
            className="flex w-max gap-1 sm:gap-2"
            role="tablist"
            aria-label="Category"
          >
            <FilterChip
              pressed={category === "all"}
              onClick={() => updateCategory("all")}
            >
              All
            </FilterChip>
            {categories.map((item) => (
              <FilterChip
                key={item}
                pressed={category === item}
                onClick={() => updateCategory(item)}
              >
                {categoryLabels[item]}
              </FilterChip>
            ))}
          </div>
        </div>
        <p className="shrink-0 text-base/7 text-muted-foreground tabular-nums sm:text-sm/6">
          {results.length === templates.length
            ? `${results.length.toLocaleString("en")} ${results.length === 1 ? "template" : "templates"}`
            : `${results.length.toLocaleString("en")} of ${templates.length.toLocaleString("en")}`}
        </p>
      </div>
      {results.length === 0 ? (
        <div className="flex min-h-48 flex-col justify-center gap-3 rounded-[1.75rem] bg-card px-6 py-12">
          <p className="font-medium">No jobs match</p>
          <p className="max-w-[48ch] text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
            Clear the search or pick another category. Or{" "}
            <Link href="/write" className="link-text">
              submit a job
            </Link>
            .
          </p>
          <p className="text-base/7 sm:text-sm/6">
            <button
              type="button"
              className="link-text"
              onClick={() => {
                onSearchChange("")
                updateCategory("all")
              }}
            >
              Show all jobs
            </button>
          </p>
        </div>
      ) : (
        <ul
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
          role="list"
        >
          {results.map((template) => (
            <li key={template.slug} className="min-w-0">
              <TemplateCard template={template} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function FilterChip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={pressed}
      onClick={onClick}
      className={cn(
        "relative shrink-0 surface-chip rounded-full px-3 py-1.5 text-base/7 sm:text-sm/6",
        pressed
          ? "bg-card text-foreground"
          : "text-muted-foreground hover:bg-[color-mix(in_oklch,var(--card),var(--foreground)_3%)] hover:text-foreground"
      )}
    >
      {children}
      <span
        className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-1/2 pointer-fine:hidden"
        aria-hidden="true"
      />
    </button>
  )
}
