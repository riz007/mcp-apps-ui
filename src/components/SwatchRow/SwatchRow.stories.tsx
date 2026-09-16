import type { Meta, StoryObj } from "@storybook/react-vite"
import { SwatchRow } from "."

const meta = {
  title: "Components/Controls/SwatchRow",
  component: SwatchRow,
  args: {
    label: "Colour",
    swatches: [
      { value: "sand", name: "Sand", color: "#E3DACC" },
      { value: "clay", name: "Clay", color: "#D97757" },
      { value: "olive", name: "Olive", color: "#788C5D" },
      { value: "sky", name: "Sky", color: "#6A9BCC" },
      { value: "ink", name: "Ink", color: "#141413" },
      { value: "paper", name: "Paper", color: "#FFFFFF" },
    ],
    defaultValue: "clay",
    hideLabel: false,
    disabled: false,
  },
  argTypes: {
    onChange: { action: "change" },
  },
} satisfies Meta<typeof SwatchRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MatchesBackground: Story = {
  name: "Swatch matching the background",
  args: { defaultValue: "paper" },
}

export const Narrow: Story = {
  globals: { width: "320" },
}

export const Disabled: Story = {
  args: { disabled: true },
}
