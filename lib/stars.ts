export function formatStarCount(count: number): string {
  if (count < 1000) {
    return String(count)
  }

  if (count < 10_000) {
    const tenths = Math.round(count / 100) / 10
    return `${tenths}k`.replace(".0k", "k")
  }

  if (count < 1_000_000) {
    return `${Math.round(count / 1000)}k`
  }

  const tenths = Math.round(count / 100_000) / 10
  return `${tenths}m`.replace(".0m", "m")
}
