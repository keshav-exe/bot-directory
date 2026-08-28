const CATEGORIES = [
  "assistants",
  "engineering",
  "research",
  "money",
  "sales",
  "creative",
  "life",
]

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const SHARE = /^https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_-]+)?$/
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
  const ident = slug.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase())
  return /^[A-Za-z]/.test(ident) ? ident : `bot${ident}`
}

export function parseAuthor(value) {
  if (!value) return undefined
  const trimmed = value.trim()
  const fromUrl = trimmed.match(/x\.com\/([^/?#]+)/i)
  const handle = (fromUrl ? fromUrl[1] : trimmed).replace(/^@/, "")
  if (!handle) return undefined
  return { handle: `@${handle}`, url: `https://x.com/${handle}` }
}

export function serializeTemplate(template) {
  const lines = ["{"]
  const field = (key, value, trailing = true) => {
    lines.push(`    ${key}: ${value}${trailing ? "," : ""}`)
  }

  field("slug", JSON.stringify(template.slug))
  field("name", JSON.stringify(template.name))
  field("description", wrapString(template.description, 6))
  field("category", JSON.stringify(template.category))
  field("shareUrl", JSON.stringify(template.shareUrl))
  if (template.author) {
    field(
      "author",
      `{ handle: ${JSON.stringify(template.author.handle)}, url: ${JSON.stringify(template.author.url)} }`,
      false
    )
  }
  lines.push("  }")
  return lines.join("\n")
}

function wrapString(value, indent) {
  const json = JSON.stringify(value)
  if (json.length <= 68) return json
  return `\n${" ".repeat(indent)}${json}`
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
