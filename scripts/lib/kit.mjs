const CATEGORIES = [
  "assistants",
  "engineering",
  "research",
  "money",
  "sales",
  "creative",
  "life",
]

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const SHARE = /^https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+$/
const SECRET =
  /\bsk-[a-zA-Z0-9]{16,}\b|BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY|xox[baprs]-/i

export { CATEGORIES, SLUG, SHARE, SECRET }

export function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function camelCase(slug) {
  return slug.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase())
}

export function parseAuthor(value) {
  if (!value) return undefined
  const trimmed = value.trim()
  const fromUrl = trimmed.match(/x\.com\/([^/?#]+)/i)
  const handle = (fromUrl ? fromUrl[1] : trimmed).replace(/^@/, "")
  if (!handle) return undefined
  return { handle: `@${handle}`, url: `https://x.com/${handle}` }
}

export function splitRecipeDocument(raw) {
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

function parseFrontmatter(text) {
  const frontmatter = {}

  for (const line of text.split(/\r?\n/)) {
    const cut = line.indexOf(":")
    if (cut === -1) continue
    const key = line.slice(0, cut).trim()
    const value = line
      .slice(cut + 1)
      .trim()
      .replace(/^["']|["']$/g, "")
    if (!key || !value) continue

    if (key === "slug") frontmatter.slug = value
    if (key === "category") frontmatter.category = value
    if (key === "shareUrl" || key === "share") frontmatter.shareUrl = value
    if (key === "author") frontmatter.author = value
    if (key === "why") frontmatter.why = value
    if (key === "firstTask" || key === "first-task") frontmatter.firstTask = value
    if (key === "featured") frontmatter.featured = value === "true"
    if (key === "name") frontmatter.name = value
    if (key === "title") frontmatter.title = value
    if (key === "description") frontmatter.description = value
  }

  return frontmatter
}

export function parseRecipe(markdown) {
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

function splitSections(markdown) {
  const sections = new Map()
  const parts = markdown.split(/^# /m).slice(1)

  for (const part of parts) {
    const newline = part.indexOf("\n")
    const heading = (newline === -1 ? part : part.slice(0, newline))
      .trim()
      .toLowerCase()
    const body = newline === -1 ? "" : part.slice(newline + 1).trim()
    sections.set(heading.replace(/ \(.*\)$/, ""), body)
  }

  return sections
}

function parseProfile(block) {
  const fields = {}
  for (const line of block.split(/\r?\n/)) {
    const cut = line.indexOf(":")
    if (cut === -1) continue
    const key = line.slice(0, cut).trim().toLowerCase()
    const value = line.slice(cut + 1).trim()
    if (key) fields[key] = value
  }

  return {
    name: fields.name ?? "",
    title: fields.title ?? "",
    description: fields.description ?? "",
  }
}

function parseList(block) {
  return block
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim())
    .filter(Boolean)
}

function parseSkills(block) {
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

function parseRoutines(block) {
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

function splitSubsections(block) {
  return block
    .split(/^## /m)
    .slice(1)
    .map((part) => {
      const newline = part.indexOf("\n")
      const name = (newline === -1 ? part : part.slice(0, newline)).trim()
      const body = newline === -1 ? "" : part.slice(newline + 1).trim()
      return { name, body }
    })
}

function parseLeaveOut(block) {
  const items = parseList(block)
  if (items.length > 0) return items
  return block
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

export function serializeTemplate(template) {
  const lines = ["{"]
  const field = (key, value, trailing = true) => {
    lines.push(`    ${key}: ${value}${trailing ? "," : ""}`)
  }

  field("slug", JSON.stringify(template.slug))
  field("name", JSON.stringify(template.name))
  field("title", JSON.stringify(template.title))
  field("description", wrapString(template.description, 6))
  field("category", JSON.stringify(template.category))
  if (template.featured) field("featured", "true")
  if (template.shareUrl) field("shareUrl", JSON.stringify(template.shareUrl))
  if (template.author) {
    field(
      "author",
      `{ handle: ${JSON.stringify(template.author.handle)}, url: ${JSON.stringify(template.author.url)} }`
    )
  }
  field("why", wrapString(template.why, 6))
  field("firstTask", wrapString(template.firstTask, 6))
  field("memory", serializeStringArray(template.memory, 4))
  field("skills", serializeSkills(template.skills))
  field("routines", serializeRoutines(template.routines))
  field("plugins", serializeStringArray(template.plugins, 4))
  field("leaveOut", serializeStringArray(template.leaveOut, 4), false)
  lines.push("  }")
  return lines.join("\n")
}

function wrapString(value, indent) {
  const json = JSON.stringify(value)
  if (json.length <= 68) return json
  return `\n${" ".repeat(indent)}${json}`
}

function serializeStringArray(items, indent) {
  if (items.length === 0) return "[]"
  const pad = " ".repeat(indent + 2)
  const close = " ".repeat(indent)
  return `[\n${items.map((item) => `${pad}${JSON.stringify(item)},`).join("\n")}\n${close}]`
}

function serializeSkills(skills) {
  if (skills.length === 0) return "[]"
  const chunks = skills.map((skill) => {
    const steps = skill.steps
      .map((step) => `          ${JSON.stringify(step)},`)
      .join("\n")
    return `      {
        name: ${JSON.stringify(skill.name)},
        useWhen: ${wrapString(skill.useWhen, 10).trimStart()},
        steps: [
${steps}
        ],
      }`
  })
  return `[\n${chunks.join(",\n")},\n    ]`
}

function serializeRoutines(routines) {
  if (routines.length === 0) return "[]"
  const chunks = routines.map((routine) => {
    return `      {
        name: ${JSON.stringify(routine.name)},
        when: ${JSON.stringify(routine.when)},
        do: ${JSON.stringify(routine.do)},
      }`
  })
  return `[\n${chunks.join(",\n")},\n    ]`
}

export function templateModuleSource(template) {
  return `import type { Template } from "../types"

export const template: Template = ${serializeTemplate(template)}
`
}

export function entriesIndexSource(slugs) {
  const imports = slugs
    .map((slug) => {
      const ident = camelCase(slug)
      return `import { template as ${ident} } from "./${slug}"`
    })
    .join("\n")

  const list = slugs.map((slug) => camelCase(slug)).join(", ")

  if (slugs.length === 0) {
    return `import type { Template } from "../types"

export const templates: Template[] = []
`
  }

  return `import type { Template } from "../types"

${imports}

export const templates: Template[] = [${list}]
`
}

export function extractQuoted(source, key) {
  const matches = []
  const pattern = new RegExp(`${key}:\\s*"([^"]+)"`, "g")
  for (const match of source.matchAll(pattern)) {
    matches.push(match[1])
  }
  return matches
}
