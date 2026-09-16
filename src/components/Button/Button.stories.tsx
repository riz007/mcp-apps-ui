import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "."
import { Calendar, Plus } from "../Icon"

const meta = {
  title: "Components/Controls/Button",
  component: Button,
  args: {
    children: "Confirm booking",
    variant: "solid",
    color: "primary",
    size: "md",
    block: false,
    disabled: false,
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["solid", "soft", "ghost"] },
    color: { control: "inline-radio", options: ["primary", "secondary", "danger"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
    children: { control: "text" },
    asChild: { control: false },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

const colors = ["primary", "secondary", "danger"] as const

export const Solid: Story = {
  render: (args) => (
    <div className="gap-3 flex flex-wrap">
      {colors.map((color) => (
        <Button key={color} {...args} variant="solid" color={color}>
          {color}
        </Button>
      ))}
    </div>
  ),
}

export const Soft: Story = {
  render: (args) => (
    <div className="gap-3 flex flex-wrap">
      {colors.map((color) => (
        <Button key={color} {...args} variant="soft" color={color}>
          {color}
        </Button>
      ))}
    </div>
  ),
}

export const Ghost: Story = {
  render: (args) => (
    <div className="gap-3 flex flex-wrap">
      {colors.map((color) => (
        <Button key={color} {...args} variant="ghost" color={color}>
          {color}
        </Button>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="gap-3 flex flex-wrap items-center">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
    </div>
  ),
}

export const WithIcon: Story = {
  args: { variant: "soft", color: "secondary" },
  render: (args) => (
    <div className="gap-3 flex flex-wrap">
      <Button {...args}>
        <Calendar />
        Add to calendar
      </Button>
      <Button {...args} aria-label="Add guest">
        <Plus />
      </Button>
    </div>
  ),
}

export const Block: Story = {
  args: { block: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const CardActions: Story = {
  name: "Two actions in a card",
  render: () => (
    <div className="gap-3 pt-4 sm:grid-cols-2 grid border-t border-subtle">
      <Button variant="soft" color="secondary" block>
        Call
      </Button>
      <Button block>Directions</Button>
    </div>
  ),
}
