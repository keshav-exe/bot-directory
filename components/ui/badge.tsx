import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[background-color,color,opacity,transform] duration-150 ease-out focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[0.97] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 motion-reduce:transition-none dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a]:hover:bg-[color-mix(in_oklch,var(--primary),var(--foreground)_6%)] [a]:active:bg-[color-mix(in_oklch,var(--primary),var(--foreground)_10%)]",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_6%)] [a]:active:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_10%)]",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 [a]:hover:bg-destructive/20 [a]:active:bg-destructive/25 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:active:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_6%)]",
        ghost:
          "hover:bg-muted active:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_6%)] hover:text-muted-foreground dark:hover:bg-muted/70",
        link: "text-primary underline-offset-4 hover:underline active:scale-100 active:opacity-80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
