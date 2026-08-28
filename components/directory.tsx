"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { TemplateCard } from "@/components/template-card"
import { Input } from "@/components/ui/input"
import {
  categories,
  categoryLabels,
  searchTemplates,
  type Category,
} from "@/lib/templates"
import { cn } from "@/lib/utils"

export function Directory() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") ?? ""
  const categoryParam = searchParams.get("category")
  const category: Category | "all" =
    categoryParam && categories.includes(categoryParam as Category)
      ? (categoryParam as Category)
      : "all"

  const [search, setSearch] = useState(query)
  const [prevQuery, setPrevQuery] = useState(query)
  if (query !== prevQuery) {
    setPrevQuery(query)
    setSearch(query)
  }

  useEffect(() => {
    const id = window.setTimeout(() => {
      const current = searchParams.get("q") ?? ""
      if (search === current) {
        return
      }

      const params = new URLSearchParams(searchParams.toString())
      if (search.trim()) {
        params.set("q", search)
      } else {
        params.delete("q")
      }
      const next = params.toString()
      router.replace(next ? `${pathname}?${next}` : pathname, {
        scroll: false,
      })
    }, 300)

    return () => window.clearTimeout(id)
  }, [search, router, pathname, searchParams])

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
    <div className="flex flex-col gap-6">
      <div className="relative max-w-xs min-w-0">
        <label htmlFor="template-search" className="sr-only">
          Search templates
        </label>
        <HugeiconsIcon
          icon={Search01Icon}
          strokeWidth={2}
          className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          id="template-search"
          name="q"
          type="search"
          value={search}
          placeholder="Search jobs, plugins, skills"
          className="h-10 px-2.5 pl-8 max-sm:text-base md:h-8 md:text-sm"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="-mx-4 min-w-0 flex-1 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          <div
            className="flex w-max gap-1 lg:w-full lg:flex-wrap"
            role="group"
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
          {results.length} {results.length === 1 ? "template" : "templates"}
        </p>
      </div>
      {results.length === 0 ? (
        <div className="flex min-h-56 flex-col justify-center gap-3 rounded-xl bg-muted px-5 py-10 dark:bg-card dark:inset-ring dark:inset-ring-border">
          <p className="font-medium text-foreground">No matching jobs</p>
          <p className="max-w-[48ch] text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
            Nothing in this search. Clear it or pick another category.
          </p>
          <p className="text-base/7 sm:text-sm/6">
            <button
              type="button"
              className="text-foreground hover:underline hover:underline-offset-4"
              onClick={() => {
                setSearch("")
                updateCategory("all")
              }}
            >
              Show all templates
            </button>
          </p>
        </div>
      ) : (
        <div className="@container">
          <ul
            className="grid grid-cols-1 gap-6 @lg:grid-cols-2 @3xl:grid-cols-3"
            role="list"
          >
            {results.map((template) => (
              <li key={template.slug} className="min-w-0">
                <TemplateCard template={template} />
              </li>
            ))}
          </ul>
        </div>
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
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "relative shrink-0 rounded-full px-3 py-1.5 text-base/7 sm:text-sm/6",
        pressed
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
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
