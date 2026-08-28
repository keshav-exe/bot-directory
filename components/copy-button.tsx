"use client"

import { useState } from "react"
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CopyButton({
  value,
  label = "Copy recipe",
  copiedLabel = "Copied",
  className,
  variant = "outline",
  size = "default",
}: {
  value: string
  label?: string
  copiedLabel?: string
  className?: string
  variant?: "outline" | "default" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg"
}) {
  const [copied, setCopied] = useState(false)
  const reduced = useReducedMotion()

  async function onCopy() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={onCopy}
      className={cn("gap-1.5", className)}
      aria-label={copied ? copiedLabel : label}
    >
      <span className="relative size-4 shrink-0">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={copied ? "check" : "copy"}
            className="absolute inset-0 flex items-center justify-center"
            initial={
              reduced
                ? { opacity: 1 }
                : { scale: 0.3, opacity: 0, filter: "blur(3px)" }
            }
            animate={
              reduced
                ? { opacity: 1 }
                : { scale: 1, opacity: 1, filter: "blur(0px)" }
            }
            exit={
              reduced
                ? { opacity: 0 }
                : { scale: 0.3, opacity: 0, filter: "blur(3px)" }
            }
            transition={{ type: "spring", duration: 0.35, bounce: 0 }}
          >
            <HugeiconsIcon
              icon={copied ? Tick02Icon : Copy01Icon}
              strokeWidth={2}
              className="size-4"
            />
          </motion.span>
        </AnimatePresence>
      </span>
      {copied ? copiedLabel : label}
    </Button>
  )
}
