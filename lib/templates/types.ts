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

export type Author = {
  handle: string
  url: string
}

export type Template = {
  slug: string
  name: string
  description: string
  category: Category
  shareUrl: string
  author?: Author
}
