import js from "@eslint/js"
import reactHooks from "eslint-plugin-react-hooks"
import storybook from "eslint-plugin-storybook"
import globals from "globals"
import tseslint from "typescript-eslint"

const floatingRadix = [
  "popover",
  "dropdown-menu",
  "select",
  "tooltip",
  "dialog",
  "alert-dialog",
  "hover-card",
  "context-menu",
  "navigation-menu",
  "menubar",
  "toast",
]

const floatingMessage =
  "MCP Apps cannot use floating layers; they clip inside the host and fight its z-index. Use a visible control instead."

export default tseslint.config(
  { ignores: ["dist", "storybook-static", "coverage", "node_modules"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  ...storybook.configs["flat/recommended"],
  {
    languageOptions: {
      globals: { ...globals.browser },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "radix-ui",
              message:
                "Import individual @radix-ui/react-* packages so floating ones can be banned.",
            },
          ],
          patterns: [
            {
              group: floatingRadix.map((name) => `@radix-ui/react-${name}`),
              message: floatingMessage,
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/**/*.test.{ts,tsx}", "src/**/*.stories.tsx"],
    rules: {
      "no-console": "error",
      "no-restricted-globals": [
        "error",
        { name: "localStorage", message: "Storage is unavailable in sandboxed MCP App frames." },
        { name: "sessionStorage", message: "Storage is unavailable in sandboxed MCP App frames." },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "MemberExpression[object.name='window'][property.name=/^(openai|localStorage|sessionStorage)$/]",
          message: "Not available to MCP Apps in Claude.",
        },
        {
          selector: "MemberExpression[object.name='document'][property.name='cookie']",
          message: "Cookies are unavailable in sandboxed MCP App frames.",
        },
        {
          selector: "Literal[value=/\\boverflow(-y)?-(auto|scroll)\\b/]",
          message: "Inline cards must not scroll vertically. Use Scroller for horizontal lists.",
        },
        {
          selector: "TemplateElement[value.raw=/\\boverflow(-y)?-(auto|scroll)\\b/]",
          message: "Inline cards must not scroll vertically. Use Scroller for horizontal lists.",
        },
        {
          selector: "Literal[value=/\\b(min-|max-)?h-(screen|svh|lvh|dvh)\\b/]",
          message: "Never size height with viewport units inside an MCP App.",
        },
      ],
    },
  },
  {
    files: ["*.config.{js,ts}", "scripts/**", ".storybook/main.ts"],
    languageOptions: { globals: { ...globals.node } },
  },
)
