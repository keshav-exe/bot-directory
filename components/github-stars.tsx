"use client"

import { GithubIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"
import { formatStarCount } from "@/lib/stars"
import { cn } from "@/lib/utils"

export function GitHubStars({
  stars,
  className,
  fullWidth = false,
}: {
  stars: number | null
  className?: string
  fullWidth?: boolean
}) {
  const countLabel = stars == null ? "Star" : formatStarCount(stars)
  const aria =
    stars == null
      ? "Star on GitHub"
      : `Star on GitHub, ${stars.toLocaleString("en")} stars`

  return (
    <Button
      variant="outline"
      size="sm"
      nativeButton={false}
      render={
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          aria-label={aria}
        />
      }
      className={cn(fullWidth && "w-full", className)}
    >
      <HugeiconsIcon
        icon={GithubIcon}
        strokeWidth={2}
        data-icon="inline-start"
      />
      <span className="tabular-nums">{countLabel}</span>
    </Button>
  )
}
