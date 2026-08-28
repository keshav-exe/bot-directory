import Link from "next/link"

import { Button } from "@/components/ui/button"
import { PageContainer } from "@/components/page-container"

export default function NotFound() {
  return (
    <main>
      <PageContainer className="py-24">
        <h1 className="max-w-[35ch] text-4xl font-semibold tracking-tight text-balance">
          This job is not listed.
        </h1>
        <p className="mt-5 max-w-[48ch] text-lg text-pretty text-muted-foreground">
          The link may be old, or we never added it. Browse jobs, or{" "}
          <Link
            href="/write"
            className="link-text"
          >
            submit one
          </Link>{" "}
          with a pull request.
        </p>
        <div className="mt-8">
          <Button nativeButton={false} render={<Link href="/" />}>
            Browse jobs
          </Button>
        </div>
      </PageContainer>
    </main>
  )
}
