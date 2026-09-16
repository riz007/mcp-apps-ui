import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { SegmentedControl } from "."

const seating = [
  { value: "indoor", label: "Indoor" },
  { value: "patio", label: "Patio" },
  { value: "bar", label: "Bar" },
]

const meta = {
  title: "Components/Controls/SegmentedControl",
  component: SegmentedControl,
  args: {
    label: "Seating",
    options: seating,
    defaultValue: "indoor",
    size: "md",
    block: true,
    hideLabel: false,
    disabled: false,
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    onChange: { action: "change" },
  },
} satisfies Meta<typeof SegmentedControl>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = {
  args: { size: "sm" },
}

export const Inline: Story = {
  args: { block: false },
}

export const HiddenLabel: Story = {
  args: { hideLabel: true },
}

export const Wrapping: Story = {
  name: "Wraps instead of scrolling",
  globals: { width: "320" },
  args: {
    label: "Time",
    options: ["5:30", "6:00", "6:30", "7:00", "7:30", "8:00", "8:30"].map((t) => ({
      value: t,
      label: t,
    })),
    defaultValue: "7:00",
  },
}

export const DisabledOption: Story = {
  args: {
    options: [...seating.slice(0, 2), { value: "bar", label: "Bar", disabled: true }],
  },
}

export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = useState("patio")
    return (
      <div className="gap-3 flex flex-col">
        <SegmentedControl {...args} value={value} onChange={setValue} />
        <p className="text-sm text-secondary">Selected: {value}</p>
      </div>
    )
  },
}
