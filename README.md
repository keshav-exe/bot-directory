# grokbot-templates

Independent directory of [Grok Bot](https://x.ai/bot) jobs. Hosted at [grokbot.wtf](https://grokbot.wtf).

Not affiliated with xAI. Share links open third-party templates on x.ai. A template copies the **job** (name, memory, skills, routines, plugins), not the computer, logins, or chat history.

xAI shipped shareable Bot templates in August 2026 ([announcement](https://x.com/bot/status/2093376523919323618)). This site is a public shelf of those jobs, plus paste-ready recipes when a share link is not on file.

## Use a template

1. Open a listing on [grokbot.wtf](https://grokbot.wtf).
2. If it has a share link, hit **Add to Grok Bot**. Confirm the second review.
3. If it is recipe-only, create a new bot, paste the markdown, and say turn this into a public template.
4. Connect the plugins it asks for. Give it the first task on the page.

You need the latest Grok Bot desktop or mobile app. Docs: [Get started](https://docs.x.ai/grok-bot/get-started), [Share a Bot](https://docs.x.ai/grok-bot/bots).

## List a template

Listing is a merged pull request. There is no form.

1. Fork this repo.
2. Get the bot good at the job. Publish a public template in Grok Bot and copy the `https://x.ai/bot/…` link. Recipe-only listings are fine if you do not have a share link yet.
3. Scaffold an entry:

```bash
pnpm template:new -- \
  --name "DeckLens" \
  --title "Pitch deck screener" \
  --category sales \
  --description "Interviews you on investment criteria, then scores decks." \
  --why "Every memo is measured against your thesis." \
  --first-task "Interview me on my investment criteria, then wait for a deck." \
  --share https://x.ai/bot/… \
  --author @you \
  --from recipe.md
```

4. `pnpm template:check`
5. Open a PR. When it merges, the job is on the site.

Full rules, categories, and safety notes: [CONTRIBUTING.md](./CONTRIBUTING.md).

## Local

```bash
pnpm install
pnpm dev
```

```bash
pnpm template:new -- --help
pnpm template:check
pnpm template:sync   # regenerate lib/templates/entries/index.ts
pnpm typecheck
pnpm lint
pnpm build
```

Optional: set `GITHUB_TOKEN` so the nav star count is not GitHub-API rate limited.

## What we will not merge

- Secrets, API keys, names, private URLs, chat residue
- A dump of someone else's machine
- Prompt-pack scrapes of unrelated directories

Recipes are write-ups of the job. The share link is the install path.
