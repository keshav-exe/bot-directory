import { categories, type Template } from "./types"

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const SHARE = /^https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+$/
const SECRET =
  /\bsk-[a-zA-Z0-9]{16,}\b|BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY|xox[baprs]-/i

export function getCatalogProblems(templates: Template[]): string[] {
  const problems: string[] = []
  const slugs = new Map<string, number>()
  const shares = new Map<string, string>()

  for (const template of templates) {
    const n = (slugs.get(template.slug) ?? 0) + 1
    slugs.set(template.slug, n)
    if (n === 2) {
      problems.push(`duplicate slug: ${template.slug}`)
    }

    if (!SLUG.test(template.slug)) {
      problems.push(`${template.slug}: slug must be kebab-case`)
    }

    if (!(categories as readonly string[]).includes(template.category)) {
      problems.push(`${template.slug}: unknown category ${template.category}`)
    }

    for (const field of [
      "name",
      "title",
      "description",
      "why",
      "firstTask",
    ] as const) {
      const value = template[field]?.trim() ?? ""
      if (!value || /^\{fill in[:}]/.test(value)) {
        problems.push(`${template.slug}: ${field} needs a real value`)
      }
    }

    if (template.memory.length === 0) {
      problems.push(`${template.slug}: memory is empty`)
    }

    if (template.skills.length === 0) {
      problems.push(`${template.slug}: skills is empty`)
    }

    if (template.shareUrl) {
      if (!SHARE.test(template.shareUrl)) {
        problems.push(`${template.slug}: shareUrl must be https://x.ai/bot/…`)
      }
      const owner = shares.get(template.shareUrl)
      if (owner) {
        problems.push(
          `duplicate shareUrl on ${owner} and ${template.slug}: ${template.shareUrl}`
        )
      } else {
        shares.set(template.shareUrl, template.slug)
      }
    }

    const blob = JSON.stringify(template)
    if (SECRET.test(blob)) {
      problems.push(`${template.slug}: looks like a secret leaked in`)
    }
  }

  return problems
}
