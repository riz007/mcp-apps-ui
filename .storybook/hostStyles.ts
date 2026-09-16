export type Theme = "light" | "dark"

type Pair = [light: string, dark: string]

const colors: Record<string, Pair> = {
  "--color-background-primary": ["#FFFFFF", "#30302E"],
  "--color-background-secondary": ["#F5F4ED", "#262624"],
  "--color-background-tertiary": ["#FAF9F5", "#141413"],
  "--color-background-inverse": ["#141413", "#FAF9F5"],
  "--color-background-ghost": ["rgb(255 255 255 / 0%)", "rgb(48 48 46 / 0%)"],
  "--color-background-info": ["#D6E4F6", "#253E5F"],
  "--color-background-danger": ["#F7ECEC", "#602A28"],
  "--color-background-success": ["#E9F1DC", "#1B4614"],
  "--color-background-warning": ["#F6EEDF", "#483A0F"],
  "--color-background-disabled": ["rgb(255 255 255 / 50%)", "rgb(48 48 46 / 50%)"],
  "--color-text-primary": ["#141413", "#FAF9F5"],
  "--color-text-secondary": ["#3D3D3A", "#C2C0B6"],
  "--color-text-tertiary": ["#73726C", "#9C9A92"],
  "--color-text-inverse": ["#FFFFFF", "#141413"],
  "--color-text-ghost": ["rgb(115 114 108 / 50%)", "rgb(156 154 146 / 50%)"],
  "--color-text-info": ["#3266AD", "#80AADD"],
  "--color-text-danger": ["#7F2C28", "#EE8884"],
  "--color-text-success": ["#265B19", "#7AB948"],
  "--color-text-warning": ["#5A4815", "#D1A041"],
  "--color-text-disabled": ["rgb(20 20 19 / 50%)", "rgb(250 249 245 / 50%)"],
  "--color-border-primary": ["rgb(31 30 29 / 40%)", "rgb(222 220 209 / 40%)"],
  "--color-border-secondary": ["rgb(31 30 29 / 30%)", "rgb(222 220 209 / 30%)"],
  "--color-border-tertiary": ["rgb(31 30 29 / 15%)", "rgb(222 220 209 / 15%)"],
  "--color-border-inverse": ["rgb(255 255 255 / 30%)", "rgb(20 20 19 / 15%)"],
  "--color-border-ghost": ["rgb(31 30 29 / 0%)", "rgb(222 220 209 / 0%)"],
  "--color-border-info": ["#4682D5", "#4682D5"],
  "--color-border-danger": ["#A73D39", "#CD5C58"],
  "--color-border-success": ["#437426", "#599130"],
  "--color-border-warning": ["#805C1F", "#A87829"],
  "--color-border-disabled": ["rgb(31 30 29 / 10%)", "rgb(222 220 209 / 10%)"],
  "--color-ring-primary": ["rgb(20 20 19 / 70%)", "rgb(250 249 245 / 70%)"],
  "--color-ring-secondary": ["rgb(61 61 58 / 70%)", "rgb(194 192 182 / 70%)"],
  "--color-ring-inverse": ["rgb(255 255 255 / 70%)", "rgb(20 20 19 / 70%)"],
  "--color-ring-info": ["rgb(50 102 173 / 50%)", "rgb(128 170 221 / 50%)"],
  "--color-ring-danger": ["rgb(167 61 57 / 50%)", "rgb(205 92 88 / 50%)"],
  "--color-ring-success": ["rgb(67 116 38 / 50%)", "rgb(89 145 48 / 50%)"],
  "--color-ring-warning": ["rgb(128 92 31 / 50%)", "rgb(168 120 41 / 50%)"],
}

const fontSizes: Record<string, number> = {
  "--font-text-xs-size": 12,
  "--font-text-sm-size": 14,
  "--font-text-md-size": 16,
  "--font-text-lg-size": 20,
  "--font-heading-xs-size": 12,
  "--font-heading-sm-size": 14,
  "--font-heading-md-size": 16,
  "--font-heading-lg-size": 20,
  "--font-heading-xl-size": 24,
  "--font-heading-2xl-size": 28,
  "--font-heading-3xl-size": 36,
}

const colorKeys = Object.keys(colors)
const fontKeys = Object.keys(fontSizes)

/**
 * Mimics what a Claude host sends in `hostContext.styles.variables`, using the
 * values published in the design guidelines. `textScale` multiplies every
 * font size the way a host honouring the user's text size setting would.
 */
export function applyHost(
  root: HTMLElement,
  host: "claude" | "standalone",
  theme: Theme,
  textScale: number,
  isStory: boolean,
) {
  root.dataset.host = host
  if (isStory) {
    root.dataset.theme = theme
    root.style.colorScheme = theme
  } else {
    delete root.dataset.theme
    root.style.removeProperty("color-scheme")
  }

  for (const key of colorKeys) {
    if (host === "claude") {
      const pair = colors[key]!
      root.style.setProperty(key, theme === "light" ? pair[0] : pair[1])
    } else {
      root.style.removeProperty(key)
    }
  }

  for (const key of fontKeys) {
    if (textScale === 1) root.style.removeProperty(key)
    else root.style.setProperty(key, `${fontSizes[key]! * textScale}px`)
  }
}
