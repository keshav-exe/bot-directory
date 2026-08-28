# grokbot-templates

Independent directory of [Grok Bot](https://x.ai/bot) share links. Hosted at [grokbot.wtf](https://grokbot.wtf).

Not affiliated with xAI. Cards open third-party templates on `x.ai/bot/…`. We do not rehost packed configs or copy-paste prompts.

xAI shipped shareable Bot templates in August 2026 ([announcement](https://x.com/bot/status/2093376523919323618)). This site is a public shelf of those links.

## Use a listing

1. Open a card on [grokbot.wtf](https://grokbot.wtf). That is the share link.
2. Hit **Add to Grok Bot**. Confirm the second review.
3. Connect the plugins it asks for. Give it one real task.

You need the latest Grok Bot desktop or mobile app. Docs: [Get started](https://docs.x.ai/grok-bot/get-started), [Share a Bot](https://docs.x.ai/grok-bot/bots).

## List a template

Listing is a merged pull request. There is no form.

1. Fork this repo.
2. Publish a public template in Grok Bot and copy the `https://x.ai/bot/…` link.
3. Scaffold an entry:

```bash
pnpm template:new -- \
  --name "Chieeeeefy" \
  --category assistants \
  --description "Field-engineer chief of staff for calendar, Gmail, and Notion." \
  --share https://x.ai/bot/GiBPBQR2WrHNul4k9Tz6Q \
  --author @you
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

- Listings without a real `https://x.ai/bot/…` share link
- Secrets, API keys, names, private URLs, chat residue
- A dump of someone else's machine
- Prompt-pack scrapes of unrelated directories
