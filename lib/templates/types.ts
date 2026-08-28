export const categories = [
  "assistants",
  "engineering",
  "research",
  "money",
  "sales",
  "creative",
  "life",
] as const

export type Category = (typeof categories)[number]

export const categoryLabels: Record<Category, string> = {
  assistants: "Assistants",
  engineering: "Engineering",
  research: "Research",
  money: "Money",
  sales: "Sales",
  creative: "Creative",
  life: "Life",
}

export type Skill = {
  name: string
  useWhen: string
  steps: string[]
}

export type Routine = {
  name: string
  when: string
  do: string
}

export type Author = {
  handle: string
  url: string
}

export type Template = {
  slug: string
  name: string
  title: string
  description: string
  category: Category
  featured?: boolean
  shareUrl?: string
  author?: Author
  why: string
  firstTask: string
  memory: string[]
  skills: Skill[]
  routines: Routine[]
  plugins: string[]
  leaveOut: string[]
}
