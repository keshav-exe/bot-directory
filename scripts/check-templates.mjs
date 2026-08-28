#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { CATEGORIES, SECRET, SHARE, SLUG, extractQuoted } from "./lib/kit.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const catalogPath = join(root, "lib/templates/catalog.ts")
const entriesDir = join(root, "lib/templates/entries")
const indexPath = join(entriesDir, "index.ts")

function files() {
  const list = [catalogPath]
  if (!existsSync(entriesDir)) return list
  for (const file of readdirSync(entriesDir)) {
    if (file.endsWith(".ts")) list.push(join(entriesDir, file))
  }
  return list
}

function main() {
  const problems = []
  const slugs = new Map()
  const shares = new Map()
  const entryFiles = existsSync(entriesDir)
    ? readdirSync(entriesDir).filter(
        (file) => file.endsWith(".ts") && file !== "index.ts"
      )
    : []

  if (existsSync(indexPath) && entryFiles.length > 0) {
    const index = readFileSync(indexPath, "utf8")
    for (const file of entryFiles) {
      const slug = file.replace(/\.ts$/, "")
      if (!index.includes(`"./${slug}"`)) {
        problems.push(`entries/index.ts missing import for ${slug}`)
      }
    }
  }

  for (const file of files()) {
    const source = readFileSync(file, "utf8")
    const relative = file.slice(root.length + 1)

    if (SECRET.test(source)) {
      problems.push(`${relative}: looks like a secret leaked in`)
    }

    const fileSlugs = extractQuoted(source, "slug")
    const fileShares = extractQuoted(source, "shareUrl")
    const fileCategories = extractQuoted(source, "category")

    for (const slug of fileSlugs) {
      if (!SLUG.test(slug)) {
        problems.push(`${relative}: bad slug ${slug}`)
      }
      if (slugs.has(slug)) {
        problems.push(`duplicate slug ${slug} (${slugs.get(slug)} and ${relative})`)
      } else {
        slugs.set(slug, relative)
      }
    }

    for (const url of fileShares) {
      if (!SHARE.test(url)) {
        problems.push(`${relative}: bad shareUrl ${url}`)
      }
      if (shares.has(url)) {
        problems.push(
          `duplicate shareUrl ${url} (${shares.get(url)} and ${relative})`
        )
      } else {
        shares.set(url, relative)
      }
    }

    for (const category of fileCategories) {
      if (!CATEGORIES.includes(category)) {
        problems.push(`${relative}: unknown category ${category}`)
      }
    }

    if (relative.includes("/entries/") && relative.endsWith(".ts") && !relative.endsWith("index.ts")) {
      for (const key of ["why:", "firstTask:", "name:", "title:", "description:"]) {
        if (!source.includes(key)) {
          problems.push(`${relative}: missing ${key.slice(0, -1)}`)
        }
      }
    }
  }

  if (problems.length > 0) {
    console.error(`template:check failed (${problems.length})`)
    for (const problem of problems) console.error(`- ${problem}`)
    process.exit(1)
  }

  console.log(`ok: ${slugs.size} templates`)
}

main()
