import { readdirSync } from "node:fs"
import { resolve } from "node:path"
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { playwright } from "@vitest/browser-playwright"
import { defineConfig } from "vitest/config"

const root = import.meta.dirname

const componentEntries = Object.fromEntries(
  readdirSync(resolve(root, "src/components")).map((name) => [
    `components/${name}/index`,
    resolve(root, `src/components/${name}/index.tsx`),
  ]),
)

const external = [/^react($|\/)/, /^react-dom($|\/)/, /^@radix-ui\//, "clsx", "tailwind-merge"]

function storiesProject(theme: "light" | "dark") {
  return {
    extends: true as const,
    plugins: [
      tailwindcss(),
      storybookTest({ configDir: resolve(root, ".storybook"), tags: { exclude: ["no-test"] } }),
    ],
    define: {
      "import.meta.env.STORY_THEME": JSON.stringify(theme),
      "import.meta.env.STORY_WIDTH": JSON.stringify("320"),
    },
    test: {
      name: `stories-${theme}`,
      browser: {
        enabled: true,
        headless: true,
        provider: playwright(),
        instances: [{ browser: "chromium" as const }],
      },
      setupFiles: [resolve(root, ".storybook/vitest.setup.ts")],
    },
  }
}

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: { index: resolve(root, "src/index.ts"), ...componentEntries },
      formats: ["es"],
    },
    cssCodeSplit: false,
    sourcemap: false,
    minify: false,
    rolldownOptions: {
      external,
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "happy-dom",
          include: ["src/**/*.test.{ts,tsx}"],
          setupFiles: ["./vitest.setup.ts"],
        },
      },
      storiesProject("light"),
      storiesProject("dark"),
    ],
  },
})
