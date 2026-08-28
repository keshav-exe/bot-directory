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
        <PageContainer className="pb-16 pt-2 sm:pb-20">
          <h2 className="sr-only">Jobs</h2>
          <Directory search={search} onSearchChange={setSearch} />
        </PageContainer>
      </section>
    </>
  )
}
