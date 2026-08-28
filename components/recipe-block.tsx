import { CopyButton } from "@/components/copy-button"
import { formatRecipe, type Template } from "@/lib/templates"

export function RecipeBlock({ template }: { template: Template }) {
  const recipe = formatRecipe(template)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-balance">Recipe</h2>
        <CopyButton value={recipe} size="sm" />
      </div>
      <p className="max-w-[56ch] text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
        Paste this into a new bot and say turn this into a public template.
        Review what it packed before you publish.
      </p>
      <pre className="overflow-x-auto rounded-xl bg-muted p-4 font-mono text-sm/6 text-foreground dark:inset-ring dark:inset-ring-border">
        {recipe}
      </pre>
    </div>
  )
}
