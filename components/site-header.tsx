"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Wordmark } from "@/components/wordmark"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/", label: "Templates" },
  { href: "/guide", label: "Guide" },
  { href: "/write", label: "Write a recipe" },
] as const

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-(--z-dropdown) max-h-16 border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4 sm:h-16 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-8">
          <Link href="/" aria-label="Homepage" className="min-w-0 shrink-0">
            <Wordmark />
          </Link>
          <nav aria-label="Primary" className="flex max-lg:hidden">
            <ul className="flex items-center gap-6" role="list">
              {nav.map((item) => {
                const current =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href)

                return (
                  <li key={item.href} className="text-base/7 sm:text-sm/6">
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={
                        current
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
        <div className="flex shrink-0 items-center justify-end gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<a href={site.url} target="_blank" rel="noreferrer" />}
            className="max-lg:hidden"
          >
            Open Grok Bot
          </Button>
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <HugeiconsIcon
                icon={Menu01Icon}
                strokeWidth={2}
                className="size-4"
              />
              <span
                className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
                aria-hidden="true"
              />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <Wordmark />
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="px-6 pb-6">
                <ul className="flex flex-col gap-1" role="list">
                  {nav.map((item) => {
                    const current =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href)

                    return (
                      <li key={item.href} className="text-base">
                        <SheetClose
                          nativeButton={false}
                          render={
                            <Link
                              href={item.href}
                              aria-current={current ? "page" : undefined}
                              className={cn(
                                "flex rounded-xl px-3 py-2",
                                current
                                  ? "bg-muted text-foreground"
                                  : "text-muted-foreground"
                              )}
                            />
                          }
                        >
                          {item.label}
                        </SheetClose>
                      </li>
                    )
                  })}
                </ul>
                <SheetClose
                  nativeButton={false}
                  render={
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "mt-6 w-full"
                      )}
                    />
                  }
                >
                  Open Grok Bot
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
