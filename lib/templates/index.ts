import { templates as bundled } from "./catalog"
import { templates as submitted } from "./entries"
import type { Category, Template } from "./types"

export type { Category, Template, Skill, Routine, Author } from "./types"
export { categories, categoryLabels } from "./types"
export { formatRecipe, blankRecipe, parseRecipe } from "./recipe"

export const templates: Template[] = [...bundled, ...submitted]

export function getTemplate(slug: string): Template | undefined {
  return templates.find((template) => template.slug === slug)
}

export function getTemplatesByCategory(category: Category | "all"): Template[] {
  const sorted = [...templates].sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) {
      return a.featured ? -1 : 1
    }
    return a.name.localeCompare(b.name)
  })

  if (category === "all") {
    return sorted
  }

  return sorted.filter((template) => template.category === category)
}

export function getRelatedTemplates(slug: string, limit = 3): Template[] {
  const current = getTemplate(slug)
  if (!current) {
    return []
  }

  return templates
    .filter((template) => template.slug !== slug)
    .sort((a, b) => {
      const aSame = a.category === current.category ? 1 : 0
      const bSame = b.category === current.category ? 1 : 0
      if (aSame !== bSame) {
        return bSame - aSame
      }
      return a.name.localeCompare(b.name)
    })
    .slice(0, limit)
}

export function searchTemplates(query: string): Template[] {
  const needle = query.trim().toLowerCase()
  if (!needle) {
    return getTemplatesByCategory("all")
  }

  return getTemplatesByCategory("all").filter((template) => {
    const haystack = [
      template.name,
      template.title,
      template.description,
      template.category,
      template.author?.handle ?? "",
      ...template.plugins,
      ...template.skills.map((skill) => skill.name),
    ]
      .join(" ")
      .toLowerCase()

    return haystack.includes(needle)
  })
}
