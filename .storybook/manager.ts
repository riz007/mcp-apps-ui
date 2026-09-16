import { addons } from "storybook/manager-api"
import { create } from "storybook/theming"

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "mcp-apps-ui",
    brandUrl: "https://github.com/riz007/mcp-apps-ui",
    brandTarget: "_blank",
  }),
  sidebar: {
    showRoots: true,
  },
})
