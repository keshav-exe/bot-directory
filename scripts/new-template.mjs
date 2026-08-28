#!/usr/bin/env node

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"

import {
  CATEGORIES,
  SHARE,
  SLUG,
  camelCase,
  entriesIndexSource,
  extractQuoted,
  parseAuthor,
  slugify,
  templateModuleSource,
} from "./lib/kit.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const catalogPath = join(root, "lib/templates/catalog.ts")
const entriesDir = join(root, "lib/templates/entries")
const indexPath = join(entriesDir, "index.ts")

const HELP = `Add a listing under lib/templates/entries/.

Usage:
  pnpm template:new -- --name "Chieeeeefy" --category assistants --description "Field-engineer chief of staff." --share https://x.ai/bot/GiBPBQR2WrHNul4k9Tz6Q --author @you

Flags:
  --name --slug --category --description
  --share             https://x.ai/bot/… (required)
  --author            @handle or https://x.com/handle
  --force             Overwrite an existing entries/<slug>.ts
  --dry-run           Print the file, do not write
  --sync              Only regenerate entries/index.ts from the folder

Listing on grokbot.wtf is the merge. Open a PR after this writes.
`

function parseArgs(argv) {
  const flags = { _: [] }

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (token === "--") {
      continue
    }
    if (token === "--help" || token === "-h") {
      flags.help = true
      continue
    }
    if (token === "--dry-run") {
      flags.dryRun = true
      continue
    }
    if (token === "--force") {
      flags.force = true
      continue
    }
    if (token === "--sync") {
      flags.sync = true
      continue
    }
    if (token.startsWith("--")) {
      const key = token.slice(2)
      if (!key) {
        fail(`unknown flag ${token}`)
      }
      const value = argv[i + 1]
      if (!value || value.startsWith("--")) {
        fail(`missing value for --${key}`)
      }
      flags[key] = value
      i += 1
      continue
    }
    flags._.push(token)
  }

  return flags
}

function fail(message) {
  console.error(`template:new: ${message}`)
  process.exit(1)
}

function existingSlugs() {
  const found = new Map()
  const catalog = readFileSync(catalogPath, "utf8")
  for (const slug of extractQuoted(catalog, "slug")) {
    found.set(slug, "lib/templates/catalog.ts")
  }
  if (!existsSync(entriesDir)) return found
  for (const file of readdirSync(entriesDir)) {
    if (!file.endsWith(".ts") || file === "index.ts") continue
    const relative = `lib/templates/entries/${file}`
    const source = readFileSync(join(entriesDir, file), "utf8")
    for (const slug of extractQuoted(source, "slug")) found.set(slug, relative)
  }
  return found
}

function existingShares() {
  const shares = new Map()
  const files = [catalogPath]
  if (existsSync(entriesDir)) {
    for (const file of readdirSync(entriesDir)) {
      if (file.endsWith(".ts") && file !== "index.ts") {
        files.push(join(entriesDir, file))
      }
    }
  }
  for (const file of files) {
    const source = readFileSync(file, "utf8")
    const relative = file.slice(root.length + 1)
    for (const url of extractQuoted(source, "shareUrl")) {
      shares.set(url, relative)
    }
  }
  return shares
}

function entrySlugsOnDisk() {
  if (!existsSync(entriesDir)) return []
  return readdirSync(entriesDir)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts")
    .map((file) => file.replace(/\.ts$/, ""))
    .sort()
}

function writeIndex() {
  mkdirSync(entriesDir, { recursive: true })
  const source = entriesIndexSource(entrySlugsOnDisk())
  writeFileSync(indexPath, source)
  prettier(indexPath)
}

function prettier(file) {
  try {
    execFileSync("pnpm", ["exec", "prettier", "--write", file], {
      cwd: root,
      stdio: "ignore",
    })
  } catch {
    // prettier is best-effort; the file is still valid TS
  }
}

function main() {
  const flags = parseArgs(process.argv.slice(2))
  if (flags.help) {
    process.stdout.write(HELP)
    return
  }

  if (flags.sync) {
    writeIndex()
    console.log("updated lib/templates/entries/index.ts")
    return
  }

  const name = flags.name
  const description = flags.description
  const slug = slugify(flags.slug ?? name ?? "")
  const category = flags.category
  const shareUrl = flags.share
  const author = parseAuthor(flags.author)

  if (!name) fail("missing --name")
  if (!description) fail("missing --description")
  if (!slug || !SLUG.test(slug)) fail(`bad slug: ${slug || "(empty)"}`)
  if (!category || !CATEGORIES.includes(category)) {
    fail(`--category must be one of ${CATEGORIES.join(", ")}`)
  }
  if (!shareUrl || !SHARE.test(shareUrl)) {
    fail("--share must look like https://x.ai/bot/…")
  }
  if (!camelCase(slug) || /[^A-Za-z0-9]/.test(camelCase(slug))) {
    fail(`slug ${slug} does not camelCase cleanly`)
  }

  const slugs = existingSlugs()
  const dest = join(entriesDir, `${slug}.ts`)
  const owner = slugs.get(slug)
  if (owner === "lib/templates/catalog.ts") {
    fail(`${slug} already lives in catalog.ts`)
  }
  if (owner && !flags.force) {
    fail(`${slug} already exists. Pass --force to overwrite the entries file.`)
  }
  const shareOwner = existingShares().get(shareUrl)
  if (shareOwner && shareOwner !== `lib/templates/entries/${slug}.ts`) {
    fail(`shareUrl already used in ${shareOwner}`)
  }

  const template = {
    slug,
    name,
    description,
    category,
    shareUrl,
  }
  if (author) template.author = author

  const source = templateModuleSource(template)

  if (flags.dryRun) {
    process.stdout.write(source)
    return
  }

  mkdirSync(entriesDir, { recursive: true })
  writeFileSync(dest, source)
  prettier(dest)
  writeIndex()

  console.log(`wrote lib/templates/entries/${slug}.ts`)
  console.log("next: pnpm template:check && open a PR")
  console.log("https://github.com/keshav-exe/bot-directory/compare?expand=1")
}

main()
