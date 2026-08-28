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
  parseRecipe,
  slugify,
  splitRecipeDocument,
  templateModuleSource,
} from "./lib/kit.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const catalogPath = join(root, "lib/templates/catalog.ts")
const entriesDir = join(root, "lib/templates/entries")
const indexPath = join(entriesDir, "index.ts")

const HELP = `Add a template entry under lib/templates/entries/.

Usage:
  pnpm template:new -- --name "DeckLens" --title "Pitch deck screener" --category sales --why "..." --first-task "..." --share https://x.ai/bot/... --author @you
  pnpm template:new -- --from recipe.md --category life --why "..." --first-task "..." --share https://x.ai/bot/... --author @you

Flags:
  --from <file>       Recipe markdown (optionally with YAML frontmatter)
  --name --title --slug --category --description --why --first-task
  --share             https://x.ai/bot/… (optional; recipe-only listings are fine)
  --author            @handle or https://x.com/handle
  --featured          Maintainers only
  --force             Overwrite an existing entries/<slug>.ts
  --dry-run           Print the file, do not write
  --sync              Only regenerate entries/index.ts from the folder

Frontmatter keys: slug, category, shareUrl, author, why, firstTask, featured, name, title, description

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
    if (token === "--featured") {
      flags.featured = true
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

function stubRecipe(name, title, description) {
  return `# Profile
name: ${name}
title: ${title}
description: ${description}
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

  let fromText = ""
  if (flags.from) {
    const fromPath = join(process.cwd(), flags.from)
    if (!existsSync(fromPath)) fail(`no file at ${flags.from}`)
    fromText = readFileSync(fromPath, "utf8")
  }

  const { frontmatter } = fromText
    ? splitRecipeDocument(fromText)
    : { frontmatter: {}, body: "" }

  const recipe = fromText
    ? parseRecipe(fromText)
    : parseRecipe(
        stubRecipe(
          flags.name ?? frontmatter.name ?? "{fill in}",
          flags.title ?? frontmatter.title ?? "{fill in: one-line job}",
          flags.description ??
            frontmatter.description ??
            "{fill in: card blurb. What it does, and what it refuses.}"
        )
      )

  const name = flags.name ?? frontmatter.name ?? recipe.name
  const title = flags.title ?? frontmatter.title ?? recipe.title
  const description =
    flags.description ?? frontmatter.description ?? recipe.description
  const slug = slugify(flags.slug ?? frontmatter.slug ?? name)
  const category = flags.category ?? frontmatter.category
  const why = flags.why ?? frontmatter.why
  const firstTask = flags["first-task"] ?? frontmatter.firstTask
  const shareUrl = flags.share ?? frontmatter.shareUrl
  const author = parseAuthor(flags.author ?? frontmatter.author)
  const featured = Boolean(flags.featured || frontmatter.featured)

  if (!name || name.startsWith("{fill in")) fail("missing --name")
  if (!title || title.startsWith("{fill in")) fail("missing --title")
  if (!description || description.startsWith("{fill in")) {
    fail("missing --description")
  }
  if (!slug || !SLUG.test(slug)) fail(`bad slug: ${slug || "(empty)"}`)
  if (!category || !CATEGORIES.includes(category)) {
    fail(`--category must be one of ${CATEGORIES.join(", ")}`)
  }
  if (!why || why.startsWith("{fill in")) fail("missing --why")
  if (!firstTask || firstTask.startsWith("{fill in")) {
    fail("missing --first-task")
  }
  if (shareUrl && !SHARE.test(shareUrl)) {
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
  if (shareUrl) {
    const shareOwner = existingShares().get(shareUrl)
    if (
      shareOwner &&
      shareOwner !== `lib/templates/entries/${slug}.ts`
    ) {
      fail(`shareUrl already used in ${shareOwner}`)
    }
  }

  if (recipe.memory.length === 0) fail("recipe needs at least one memory rule")
  if (recipe.skills.length === 0) fail("recipe needs at least one skill")

  const template = {
    slug,
    name,
    title,
    description,
    category,
    why,
    firstTask,
    memory: recipe.memory,
    skills: recipe.skills,
    routines: recipe.routines,
    plugins: recipe.plugins,
    leaveOut:
      recipe.leaveOut.length > 0
        ? recipe.leaveOut
        : ["secrets", "names", "private URLs", "one-off chat residue"],
  }

  if (featured) template.featured = true
  if (shareUrl) template.shareUrl = shareUrl
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
