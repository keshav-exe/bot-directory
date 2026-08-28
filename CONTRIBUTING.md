# Contributing templates

A listing on [grokbot.wtf](https://grokbot.wtf) is a **merged pull request**. Fork, add a file, open a PR.

This is an independent directory. Not affiliated with xAI.

## What a listing is

A Grok Bot template is a copy of the **job**, not the bot: name, description, selected memories, skills, routines, which plugins it needs. It never includes the computer, logins, or history.

The site stores a write-up of that job. If you have a public share link (`https://x.ai/bot/…`), put it on the entry so people can hit Add to Grok Bot. If you do not, the listing is still useful as a paste-ready recipe.

## Quick path

1. Get the bot good at one job. Tell it to export itself as a public template, or paste the fill-in recipe from `/write` and say turn this into a public template.
2. Review the draft. Strip secrets, names, private URLs, one-off chat residue.
3. Publish. Copy the share link if you published one.
4. Scaffold:

```bash
pnpm install
pnpm template:new -- \
  --name "Your bot" \
  --title "One-line job" \
  --category life \
  --description "Card blurb. What it does, and what it refuses." \
  --why "Why this job exists, and the refusal that makes it safe." \
  --first-task "The first real task after install." \
  --share https://x.ai/bot/yourid \
  --author @you \
  --from recipe.md
```

`--from` is optional. Without it, the script writes a fill-in skill/routine stub you must edit before the PR.

`--share` is optional. Recipe-only is fine.

5. `pnpm template:check`
6. Commit `lib/templates/entries/<slug>.ts` and `lib/templates/entries/index.ts`.
7. Open a PR against `main`.

That is the whole publish path. No dashboard.

## Recipe file

`recipe.md` is the markdown the site already uses. Optional YAML frontmatter:

```md
---
slug: home-robots
category: life
shareUrl: https://x.ai/bot/…
author: "@you"
why: Each robot has its own app. This job is the remote.
firstTask: List the robots you can reach. Do not send any of them anywhere.
---
# Profile
name: Home Robots
title: Mower, vacuum, the rest
description: One bot for the robots around the house. Nothing moves without a yes.
# Memory (job rules only, no personal stuff)
- Never send, dock, or start a robot without approval.
# Skills
## Status the fleet
Use when asked what's going on, or a robot looks stuck.
1. Check the vendor apps.
2. Return one line each.
# Routines
## Morning status
When: weekdays 7:00 local
Do: status the fleet. Only ping if something is stuck.
# Plugins
- Browser
# Leave out
home address, camera footage, vendor passwords
```

Then:

```bash
pnpm template:new -- --from recipe.md
```

Flags override frontmatter.

## Categories

`assistants` · `engineering` · `research` · `money` · `sales` · `creative` · `life`

## Files

New jobs go in `lib/templates/entries/<slug>.ts`. One template per file. `pnpm template:new` writes the file and regenerates `lib/templates/entries/index.ts`. Do not hand-edit the barrel; run `pnpm template:sync` if you add a file yourself.

Do not set `featured: true`. That is for maintainers.

## Safety

We will reject PRs that include:

- API keys, tokens, cookies, `.pem` material
- Real names, emails, private URLs, home addresses
- Camera footage, maps of a house, billing logins
- A dump of someone else's machine or a scrape of unrelated prompt directories

Put `{fill in: where the mail actually arrives}` in routines and plugins instead of a private inbox.

Every job should refuse send / buy / delete / publish without a yes, unless that refusal would make the job nonsense, in which case spell the boundary in `why` and `memory`.

## After merge

The next deploy lists the job. Share the `/templates/<slug>` URL. If you later get a share link, open a follow-up PR adding `shareUrl`.
