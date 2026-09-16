import type { Meta, StoryObj } from "@storybook/react-vite"
import { EmptyState } from "."
import { Button } from "../Button"
import { Calendar } from "../Icon"

const meta = {
  title: "Components/States/EmptyState",
  component: EmptyState,
  args: {
    title: "No tables at 7:30 PM",
    description: "Nearby times are shown when they open up.",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    icon: { control: false },
    action: { control: false },
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAction: Story = {
  args: {
    action: (
      <Button variant="soft" color="secondary" size="sm">
        Show all times
      </Button>
    ),
  },
}

export const CustomIcon: Story = {
  args: {
    icon: <Calendar />,
    title: "Nothing scheduled",
    description: "Ask Claude to add something to this week.",
  },
}
