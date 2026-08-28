export const site = {
  name: "grokbot-templates",
  host: "grokbot.wtf",
  tagline: "Jobs for Grok Bot",
  description:
    "Open a Grok Bot share link, or list yours with a pull request.",
  origin: "https://grokbot.wtf",
  url: "https://x.ai/bot",
  docs: "https://docs.x.ai/grok-bot/get-started",
  botsDocs: "https://docs.x.ai/grok-bot/bots",
  skillsDocs: "https://docs.x.ai/grok-bot/skills-routines-and-automations",
  github: "https://github.com/keshav-exe/bot-directory",
  githubRepo: "keshav-exe/bot-directory",
} as const

export const contributingUrl = `${site.github}/blob/main/CONTRIBUTING.md`
export const newPrUrl = `${site.github}/compare?expand=1`
