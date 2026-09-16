import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Slider } from "."

const meta = {
  title: "Components/Controls/Slider",
  component: Slider,
  args: {
    label: "Max price",
    defaultValue: 60,
    min: 0,
    max: 200,
    step: 5,
    debounceMs: 150,
    showValue: true,
    disabled: false,
  },
  argTypes: {
    onChange: { action: "change" },
    formatValue: { control: false },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Formatted: Story = {
  args: { formatValue: (value: number) => `$${value}` },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Debounced: Story = {
  name: "Debounced onChange",
  render: function Render(args) {
    const [committed, setCommitted] = useState(args.defaultValue ?? 0)
    return (
      <div className="gap-2 flex flex-col">
        <Slider {...args} onChange={setCommitted} />
        <p className="text-sm text-secondary">
          Last value sent after {args.debounceMs}ms: {committed}
        </p>
      </div>
    )
  },
}
