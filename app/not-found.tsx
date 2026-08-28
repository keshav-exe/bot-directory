import Link from "next/link"

import { PageContainer } from "@/components/page-container"

export default function NotFound() {
  return (
    <main>
      <PageContainer className="py-24">
        <h1 className="max-w-[35ch] text-4xl font-semibold tracking-tight text-balance">
          This job is not listed.
        </h1>
        <p className="mt-5 max-w-[48ch] text-lg text-pretty text-muted-foreground">
          The link may be old, or the job was never listed. Browse templates or
          write a recipe from scratch.
        </p>
        <p className="mt-8 text-base/7">
          <Link
            href="/"
            className="text-foreground hover:underline hover:decoration-foreground/30 hover:underline-offset-4"
          >
            Browse templates
          </Link>
        </p>
      </PageContainer>
    </main>
  )
}
