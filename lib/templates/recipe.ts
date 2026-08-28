import type { Template } from "./types"

export function formatRecipe(
  template: Pick<
    Template,
    | "name"
    | "title"
    | "description"
    | "memory"
    | "skills"
    | "routines"
    | "plugins"
    | "leaveOut"
  >
): string {
  const skills = template.skills
    .map((skill) => {
      const steps = skill.steps
        .map((step, stepIndex) => `${stepIndex + 1}. ${step}`)
        .join("\n")
      return `## ${skill.name}\nUse when ${skill.useWhen}\n${steps}`
    })
    .join("\n")

  const routines = template.routines
    .map((routine) => {
      return `## ${routine.name}\nWhen: ${routine.when}\nDo: ${routine.do}`
    })
    .join("\n")

  const plugins =
    template.plugins.length > 0
      ? template.plugins.map((plugin) => `- ${plugin}`).join("\n")
      : "- (none required to start)"
  const memory = template.memory.map((rule) => `- ${rule}`).join("\n")

  return `# Profile
name: ${template.name}
title: ${template.title}
description: ${template.description}
# Memory (job rules only, no personal stuff)
${memory}
# Skills
${skills}
# Routines
${routines}
# Plugins
${plugins}
# Leave out
${template.leaveOut.join(", ")}`
}

export const blankRecipe = `# Profile
name: {fill in}
title: {fill in: one-line job}
description: {fill in: card blurb. What it does, and what it refuses.}
# Memory (job rules only, no personal stuff)
- Never send, publish, buy, or delete without approval.
- {fill in: the rule that makes this job specific}
# Skills
## {fill in: reusable job name}
Use when {fill in: the trigger}.
1. {fill in}
2. {fill in}
3. Return {fill in: the deliverable}. Do not decide for the user.
# Routines
## {fill in: timed job name}
When: {fill in: weekdays 9:00 local}
Do: {fill in}. {fill in: where the work arrives}
# Plugins
- {fill in: connectors the job actually needs}
# Leave out
secrets, names, private URLs, one-off chat residue`
