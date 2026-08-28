import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Wordmark({ className }: { className?: string }) {
  const dash = site.name.indexOf("-")
  const head = dash === -1 ? site.name : site.name.slice(0, dash)
  const tail = dash === -1 ? "" : site.name.slice(dash)

  return (
    <span
      className={cn("font-medium whitespace-nowrap text-foreground", className)}
    >
      {head}
      {tail ? <span className="text-muted-foreground">{tail}</span> : null}
    </span>
  )
}
