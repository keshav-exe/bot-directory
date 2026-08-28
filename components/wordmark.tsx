import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Wordmark({ className }: { className?: string }) {
  const dot = site.name.indexOf(".")
  const head = dot === -1 ? site.name : site.name.slice(0, dot)
  const tail = dot === -1 ? "" : site.name.slice(dot)

  return (
    <span className={cn("font-medium text-foreground", className)}>
      {head}
      {tail ? <span className="text-muted-foreground">{tail}</span> : null}
    </span>
  )
}
