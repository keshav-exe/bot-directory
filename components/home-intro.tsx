"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"

import { DirectorySearch } from "@/components/directory-search"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"
import { templates } from "@/lib/templates"

const easeOut = [0.32, 0.72, 0, 1] as const

export function HomeIntro({
  search,
  onSearchChange,
}: {
  search: string
  onSearchChange: (value: string) => void
}) {
  const reduce = useReducedMotion()
  const piece = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: {
          opacity: 0,
          filter: "blur(2px)",
          transform: "translateY(8px)",
        },
        show: {
          opacity: 1,
          filter: "blur(0px)",
          transform: "translateY(0px)",
          transition: { duration: 0.32, ease: easeOut },
        },
      }

  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col px-4 pt-16 pb-10 sm:px-6 sm:pt-20 sm:pb-12 lg:px-8">
      <motion.div
        className="flex flex-col items-center text-center"
        initial={reduce ? false : "hidden"}
        animate="show"
        variants={piece}
      >
        <h1 className="max-w-[30ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Jobs you can copy.
        </h1>
        <p className="mx-auto mt-4 max-w-[42ch] text-lg text-pretty text-muted-foreground">
          <span className="tabular-nums">
            {templates.length.toLocaleString("en")}
          </span>{" "}
          templates. Open a share link, or list yours with a pull request.
        </p>
        <DirectorySearch
          value={search}
          onChange={onSearchChange}
          className="mx-auto mt-8 w-full max-w-lg"
        />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            nativeButton={false}
            render={<a href={site.url} target="_blank" rel="noreferrer" />}
          >
            Open Grok Bot
          </Button>
          <Button
            size="lg"
            variant="secondary"
            nativeButton={false}
            render={<Link href="/write" />}
          >
            Submit a template
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
