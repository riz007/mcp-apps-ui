import type { Meta, StoryObj } from "@storybook/react-vite"
import { Stepper } from "."

const meta = {
  title: "Components/Controls/Stepper",
  component: Stepper,
  args: {
    label: "Guests",
    defaultValue: 2,
    min: 1,
    max: 12,
    step: 1,
    disabled: false,
    hideLabel: false,
  },
  argTypes: {
    onChange: { action: "change" },
    formatValue: { control: false },
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Formatted: Story = {
  args: {
    label: "Nights",
    defaultValue: 3,
    formatValue: (value: number) => `${value} ${value === 1 ? "night" : "nights"}`,
  },
}

export const AtMinimum: Story = {
  args: { defaultValue: 1 },
}

export const Disabled: Story = {
  args: { disabled: true },
}
