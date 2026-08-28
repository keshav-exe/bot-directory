import type { Skill, Routine, Template } from "./types"

export type RecipeFields = Pick<
  Template,
  | "name"
  | "title"
  | "description"
  | "memory"
  | "skills"
  | "routines"
  | "plugins"
  | "leaveOut"
>

export type RecipeFrontmatter = {
  slug?: string
  category?: string
  shareUrl?: string
  author?: string
  why?: string
  firstTask?: string
  featured?: boolean
}

export function formatRecipe(template: RecipeFields): string {
  const skills = template.skills
    .map((skill) => {
      const steps = skill.steps
        .map((step, stepIndex) => `${stepIndex + 1}. ${step}`)
        .join("\n")
      return `## ${skill.name}\nUse when ${skill.useWhen}\n${steps}`
    })
    .join("\n")

  const routines = template.routines
    .map((routine) => {
      return `## ${routine.name}\nWhen: ${routine.when}\nDo: ${routine.do}`
    })
    .join("\n")

  const plugins =
    template.plugins.length > 0
      ? template.plugins.map((plugin) => `- ${plugin}`).join("\n")
      : "- (none required to start)"
  const memory = template.memory.map((rule) => `- ${rule}`).join("\n")

  return `# Profile
name: ${template.name}
title: ${template.title}
description: ${template.description}
# Memory (job rules only, no personal stuff)
${memory}
# Skills
${skills}
# Routines
${routines}
# Plugins
${plugins}
# Leave out
${template.leaveOut.join(", ")}`
}

export const blankRecipe = `# Profile
name: {fill in}
title: {fill in: one-line job}
description: {fill in: card blurb. What it does, and what it refuses.}
# Memory (job rules only, no personal stuff)
- Never send, publish, buy, or delete without approval.
- {fill in: the rule that makes this job specific}
# Skills
## {fill in: reusable job name}
Use when {fill in: the trigger}.
1. {fill in}
2. {fill in}
3. Return {fill in: the deliverable}. Do not decide for the user.
# Routines
## {fill in: timed job name}
When: {fill in: weekdays 9:00 local}
Do: {fill in}. {fill in: where the work arrives}
# Plugins
- {fill in: connectors the job actually needs}
# Leave out
secrets, names, private URLs, one-off chat residue`

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

export function splitRecipeDocument(raw: string): {
  frontmatter: RecipeFrontmatter
  body: string
} {
  const trimmed = raw.replace(/^\uFEFF/, "")
  const match = trimmed.match(FRONTMATTER)
  if (!match) {
    return { frontmatter: {}, body: trimmed.trim() }
  }

  return {
    frontmatter: parseFrontmatter(match[1]),
    body: trimmed.slice(match[0].length).trim(),
  }
}

function parseFrontmatter(block: string): RecipeFrontmatter {
  const frontmatter: RecipeFrontmatter = {}

  for (const line of block.split(/\r?\n/)) {
    const cut = line.indexOf(":")
    if (cut === -1) {
      continue
    }
    const key = line.slice(0, cut).trim()
    const value = line
      .slice(cut + 1)
      .trim()
      .replace(/^["']|["']$/g, "")
    if (!key || !value) {
      continue
    }

    if (key === "slug") frontmatter.slug = value
    if (key === "category") frontmatter.category = value
    if (key === "shareUrl" || key === "share") frontmatter.shareUrl = value
    if (key === "author") frontmatter.author = value
    if (key === "why") frontmatter.why = value
    if (key === "firstTask" || key === "first-task") {
      frontmatter.firstTask = value
    }
    if (key === "featured") frontmatter.featured = value === "true"
  }

  return frontmatter
}

export function parseRecipe(markdown: string): RecipeFields {
  const { body } = splitRecipeDocument(markdown)
  const sections = splitSections(body)

  const profile = parseProfile(sections.get("profile") ?? "")
  const memory = parseList(sections.get("memory") ?? "")
  const skills = parseSkills(sections.get("skills") ?? "")
  const routines = parseRoutines(sections.get("routines") ?? "")
  const plugins = parseList(sections.get("plugins") ?? "").filter(
    (plugin) => plugin !== "(none required to start)"
  )
  const leaveOut = parseLeaveOut(sections.get("leave out") ?? "")

  return {
    name: profile.name,
    title: profile.title,
    description: profile.description,
    memory,
    skills,
    routines,
    plugins,
    leaveOut,
  }
}

function splitSections(markdown: string): Map<string, string> {
  const sections = new Map<string, string>()
  const parts = markdown.split(/^# /m).slice(1)

  for (const part of parts) {
    const newline = part.indexOf("\n")
    const heading = (newline === -1 ? part : part.slice(0, newline))
      .trim()
      .toLowerCase()
    const body = newline === -1 ? "" : part.slice(newline + 1).trim()
    const key = heading.replace(/ \(.*\)$/, "")
    sections.set(key, body)
  }

  return sections
}

function parseProfile(block: string): {
  name: string
  title: string
  description: string
} {
  const fields: Record<string, string> = {}
  for (const line of block.split(/\r?\n/)) {
    const cut = line.indexOf(":")
    if (cut === -1) {
      continue
    }
    const key = line.slice(0, cut).trim().toLowerCase()
    const value = line.slice(cut + 1).trim()
    if (key) {
      fields[key] = value
    }
  }

  return {
    name: fields.name ?? "",
    title: fields.title ?? "",
    description: fields.description ?? "",
  }
}

function parseList(block: string): string[] {
  return block
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim())
    .filter(Boolean)
}

function parseSkills(block: string): Skill[] {
  return splitSubsections(block).map((section) => {
    const lines = section.body.split(/\r?\n/).map((line) => line.trim())
    const useLine = lines.find((line) => /^use when\b/i.test(line)) ?? ""
    const useWhen = useLine.replace(/^use when\s+/i, "")
    const steps = lines
      .filter((line) => /^\d+\.\s+/.test(line))
      .map((line) => line.replace(/^\d+\.\s+/, ""))

    return {
      name: section.name,
      useWhen: useWhen || "{fill in: the trigger}",
      steps:
        steps.length > 0
          ? steps
          : [
              "{fill in}",
              "Return {fill in: the deliverable}. Do not decide for the user.",
            ],
    }
  })
}

function parseRoutines(block: string): Routine[] {
  return splitSubsections(block).map((section) => {
    const lines = section.body.split(/\r?\n/).map((line) => line.trim())
    const whenLine = lines.find((line) => /^when:/i.test(line)) ?? ""
    const doLine = lines.find((line) => /^do:/i.test(line)) ?? ""

    return {
      name: section.name,
      when: whenLine.replace(/^when:\s*/i, "") || "{fill in}",
      do: doLine.replace(/^do:\s*/i, "") || "{fill in}",
    }
  })
}

function splitSubsections(block: string): { name: string; body: string }[] {
  const parts = block.split(/^## /m).slice(1)
  return parts.map((part) => {
    const newline = part.indexOf("\n")
    const name = (newline === -1 ? part : part.slice(0, newline)).trim()
    const body = newline === -1 ? "" : part.slice(newline + 1).trim()
    return { name, body }
  })
}

function parseLeaveOut(block: string): string[] {
  const items = parseList(block)
  if (items.length > 0) {
    return items
  }

  return block
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}
