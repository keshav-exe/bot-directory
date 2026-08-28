import { cn } from "@/lib/utils"

export function StatusPill({
  tone = "muted",
  children,
}: {
  tone?: "live" | "muted"
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-base/6 sm:text-sm/5",
        tone === "live"
          ? "text-indicator inset-ring inset-ring-indicator/35"
          : "text-muted-foreground inset-ring inset-ring-border"
      )}
    >
      <span
        className={cn(
          "size-1.5 shrink-0 rounded-full",
          tone === "live" ? "bg-indicator" : "bg-muted-foreground"
        )}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
