import { readdir, readFile } from "node:fs/promises"
import { join, relative } from "node:path"

const root = join(import.meta.dirname, "..")
const dist = join(root, "dist")

const rules = [
  { name: "localStorage", pattern: /\blocalStorage\b/ },
  { name: "sessionStorage", pattern: /\bsessionStorage\b/ },
  { name: "document.cookie", pattern: /document\.cookie/ },
  { name: "window.openai", pattern: /window\.openai/ },
  { name: "console.*", pattern: /\bconsole\.\w+/, allow: ["lib/warn.js"] },
  { name: "vertical scroll class", pattern: /\boverflow(-y)?-(auto|scroll)\b/ },
  {
    name: "floating Radix import",
    pattern:
      /@radix-ui\/react-(popover|dropdown-menu|select|tooltip|dialog|hover-card|context-menu|navigation-menu)/,
  },
  { name: "standalone theme", pattern: /standalone\.css/ },
]

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name)
      return entry.isDirectory() ? files(path) : [path]
    }),
  )
  return nested.flat()
}

const problems = []
for (const file of await files(dist)) {
  if (!/\.(js|css)$/.test(file)) continue
  const rel = relative(dist, file)
  const source = await readFile(file, "utf8")
  for (const rule of rules) {
    if (rule.allow?.includes(rel)) continue
    if (rule.pattern.test(source)) problems.push(`${rel}: ${rule.name}`)
  }
}

const warn = await readFile(join(dist, "lib/warn.js"), "utf8")
if (!warn.includes('process.env.NODE_ENV === "production"')) {
  problems.push("lib/warn.js: console call is no longer guarded by NODE_ENV")
}

if (problems.length) {
  process.stderr.write(`Bundle check failed:\n${problems.map((p) => `  ${p}`).join("\n")}\n`)
  process.exit(1)
}

process.stdout.write("Bundle check passed.\n")
