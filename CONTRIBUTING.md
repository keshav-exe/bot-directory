# Contributing templates

A listing on [grokbot.wtf](https://grokbot.wtf) is a **merged pull request**. Fork, add a file, open a PR.

This is an independent directory. Not affiliated with xAI.

## What a listing is

A public `https://x.ai/bot/…` share link, plus a name, one-line description, category, and optional author. We do not store recipes, memory dumps, or packed configs.

## Quick path

1. Get the bot good at one job. Tell it to export itself as a public template.
2. Review the draft. Strip secrets, names, private URLs, one-off chat residue.
3. Publish. Copy the share link.
4. Scaffold:

```bash
pnpm install
pnpm template:new -- \
  --name "Your bot" \
  --category life \
  --description "Card blurb. What it does, and what it refuses." \
  --share https://x.ai/bot/yourid \
  --author @you
```

5. `pnpm template:check`
6. Commit `lib/templates/entries/<slug>.ts` and `lib/templates/entries/index.ts`.
7. Open a PR against `main`.

That is the whole publish path. No dashboard.

## Categories

`assistants` · `engineering` · `research` · `money` · `sales` · `creative` · `life`

## Files

New jobs go in `lib/templates/entries/<slug>.ts`. One template per file. `pnpm template:new` writes the file and regenerates `lib/templates/entries/index.ts`. Do not hand-edit the barrel; run `pnpm template:sync` if you add a file yourself.

## Safety

We will reject PRs that include:

- No share link, or a made-up `x.ai/bot/…` URL
- API keys, tokens, cookies, `.pem` material
- Real names, emails, private URLs, home addresses
- Camera footage, maps of a house, billing logins
- A dump of someone else's machine or a scrape of prompt directories

## After merge

The next deploy lists the job. The card opens the share link.
