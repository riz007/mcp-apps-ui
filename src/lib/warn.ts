const warned = new Set<string>()

export function devWarning(key: string, message: string) {
  if (typeof process === "undefined" || process.env.NODE_ENV === "production") return
  if (warned.has(key)) return
  warned.add(key)
  // eslint-disable-next-line no-console
  console.warn(`[mcp-apps-ui] ${message}`)
}
