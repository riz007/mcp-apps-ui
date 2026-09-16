import type { Meta, StoryObj } from "@storybook/react-vite"
import { ToggleChips } from "."

const cuisines = [
  { value: "thai", label: "Thai" },
  { value: "italian", label: "Italian" },
  { value: "japanese", label: "Japanese" },
  { value: "mexican", label: "Mexican" },
  { value: "vegetarian", label: "Vegetarian" },
]

const meta = {
  title: "Components/Controls/ToggleChips",
  component: ToggleChips,
  args: {
    label: "Cuisine",
    options: cuisines,
    defaultValue: ["thai", "vegetarian"],
    hideLabel: false,
    disabled: false,
  },
  argTypes: {
    onChange: { action: "change" },
  },
} satisfies Meta<typeof ToggleChips>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoneSelected: Story = {
  args: { defaultValue: [] },
}

export const Narrow: Story = {
  globals: { width: "320" },
}

export const Disabled: Story = {
  args: { disabled: true },
}
