import { Suspense } from "react"

import { HomeShell } from "@/components/home-shell"

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<HomeFallback />}>
        <HomeShell />
      </Suspense>
    </main>
  )
}

function HomeFallback() {
  return (
    <>
      <section className="relative mx-auto flex w-full max-w-6xl flex-col px-4 pb-10 pt-16 sm:px-6 sm:pb-12 sm:pt-20 lg:px-8">
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4">
          <div className="h-12 w-full max-w-[30ch] rounded-xl bg-muted" />
          <div className="h-6 w-full max-w-[42ch] rounded-lg bg-muted" />
          <div className="mt-4 h-11 w-full rounded-full bg-muted" />
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-2 sm:px-6 sm:pb-20 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="h-8 w-64 rounded-full bg-muted" />
          <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2">
            <div className="h-56 rounded-[1.75rem] bg-card" />
            <div className="h-56 rounded-[1.75rem] bg-card" />
          </div>
        </div>
      </section>
    </>
  )
}
