import { copyFile, mkdir } from "node:fs/promises"
import { join } from "node:path"

const root = join(import.meta.dirname, "..")
const shipped = ["index.css", "tokens.css", "theme.css", "base.css"]

await mkdir(join(root, "dist/styles"), { recursive: true })
await Promise.all(
  shipped.map((file) => copyFile(join(root, "src/styles", file), join(root, "dist/styles", file))),
)
