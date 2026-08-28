"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function useDirectorySearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") ?? ""

  const [search, setSearch] = useState(query)
  const [prevQuery, setPrevQuery] = useState(query)
  if (query !== prevQuery) {
    setPrevQuery(query)
    setSearch(query)
  }

  useEffect(() => {
    const id = window.setTimeout(() => {
      const current = searchParams.get("q") ?? ""
      if (search === current) {
        return
      }

      const params = new URLSearchParams(searchParams.toString())
      if (search.trim()) {
        params.set("q", search)
      } else {
        params.delete("q")
      }
      const next = params.toString()
      router.replace(next ? `${pathname}?${next}` : pathname, {
        scroll: false,
      })
    }, 300)

    return () => window.clearTimeout(id)
  }, [search, router, pathname, searchParams])

  return { search, setSearch }
}
