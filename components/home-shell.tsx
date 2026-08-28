"use client"

import { Directory } from "@/components/directory"
import { HomeIntro } from "@/components/home-intro"
import { PageContainer } from "@/components/page-container"
import { useDirectorySearch } from "@/hooks/use-directory-search"

export function HomeShell() {
  const { search, setSearch } = useDirectorySearch()

  return (
    <>
      <HomeIntro search={search} onSearchChange={setSearch} />
      <section>
        <PageContainer className="pt-2 pb-16 sm:pb-20">
          <h2 className="sr-only">Templates</h2>
          <Directory search={search} onSearchChange={setSearch} />
        </PageContainer>
      </section>
    </>
  )
}
