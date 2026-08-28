import { site } from "@/lib/site"

export async function getGitHubStars(): Promise<number | null> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "grokbot-templates",
    }

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(
      `https://api.github.com/repos/${site.githubRepo}`,
      {
        headers,
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(4000),
      }
    )

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as { stargazers_count?: unknown }
    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : null
  } catch {
    return null
  }
}
