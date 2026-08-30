#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { SHARE, extractQuoted } from "./lib/kit.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const catalogPath = join(root, "lib/templates/catalog.ts")
const entriesDir = join(root, "lib/templates/entries")

const HELP = `Verify that every shareUrl in the catalog resolves on x.ai.

Usage:
  pnpm template:verify-shares
  pnpm template:verify-shares -- --slug deck-lens

Checks the HTML title/body for a bot preview page. Does not scrape third-party directories.
`

function parseArgs(argv) {
  const flags = { slug: null }
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (token === "--help" || token === "-h") {
      flags.help = true
    } else if (token === "--slug") {
      flags.slug = argv[i + 1]
      if (!flags.slug) fail("missing value for --slug")
      i += 1
    }
  }
  return flags
}

function fail(message) {
  console.error(`template:verify-shares: ${message}`)
  process.exit(1)
}

function loadShareUrls(slugFilter) {
  const files = [catalogPath]
  if (existsSync(entriesDir)) {
    for (const file of readdirSync(entriesDir)) {
      if (file.endsWith(".ts") && file !== "index.ts") {
        files.push(join(entriesDir, file))
      }
    }
  }

  const rows = []
  for (const file of files) {
    const source = readFileSync(file, "utf8")
    const slugs = extractQuoted(source, "slug")
    const shares = extractQuoted(source, "shareUrl")
    for (let i = 0; i < Math.min(slugs.length, shares.length); i += 1) {
      if (slugFilter && slugs[i] !== slugFilter) continue
      rows.push({ slug: slugs[i], shareUrl: shares[i], file: file.slice(root.length + 1) })
    }
  }
  return rows
}

async function verifyShare(row) {
  const response = await fetch(row.shareUrl, {
    headers: { "User-Agent": "grokbot-templates-share-verify" },
    redirect: "follow",
  })

  if (!response.ok) {
    return `${row.slug}: ${response.status} ${response.statusText}`
  }

  const html = await response.text()
  if (!html.includes("Add to Grok Bot") && !html.includes("Grok Bot")) {
    return `${row.slug}: page loaded but does not look like a Grok Bot share link`
  }

  return null
}

async function main() {
  const flags = parseArgs(process.argv.slice(2))
  if (flags.help) {
    process.stdout.write(HELP)
    return
  }

  const rows = loadShareUrls(flags.slug)
  if (rows.length === 0) {
    fail(flags.slug ? `no listing for slug ${flags.slug}` : "no share URLs found")
  }

  const problems = []
  const batch = 8

  for (let i = 0; i < rows.length; i += batch) {
    const slice = rows.slice(i, i + batch)
    const results = await Promise.all(slice.map((row) => verifyShare(row)))
    for (const problem of results) {
      if (problem) problems.push(problem)
    }
  }

  if (problems.length > 0) {
    console.error(`template:verify-shares failed (${problems.length}/${rows.length})`)
    for (const problem of problems) console.error(`- ${problem}`)
    process.exit(1)
  }

  console.log(`ok: ${rows.length} share links resolve on x.ai`)
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error))
})
