import { Search01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function DirectorySearch({
  value,
  onChange,
  className,
}: {
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  return (
    <div className={cn("relative min-w-0", className)}>
      <label htmlFor="template-search" className="sr-only">
        Search jobs
      </label>
      <HugeiconsIcon
        icon={Search01Icon}
        strokeWidth={2}
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        id="template-search"
        name="q"
        type="search"
        value={value}
        placeholder="Search jobs, plugins, skills"
        className="h-11 w-full bg-muted px-3 pl-9 text-base md:h-10 md:text-sm"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
