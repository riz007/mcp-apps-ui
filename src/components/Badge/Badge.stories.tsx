import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "."
import { Success } from "../Icon"

const meta = {
  title: "Components/Display/Badge",
  component: Badge,
  args: { children: "Confirmed", color: "success" },
  argTypes: {
    color: {
      control: "inline-radio",
      options: ["neutral", "info", "success", "warning", "danger"],
    },
    children: { control: "text" },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Colors: Story = {
  render: () => (
    <div className="gap-2 flex flex-wrap">
      <Badge color="neutral">Draft</Badge>
      <Badge color="info">Scheduled</Badge>
      <Badge color="success">Confirmed</Badge>
      <Badge color="warning">Waitlist</Badge>
      <Badge color="danger">Cancelled</Badge>
    </div>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <Badge {...args}>
      <Success />
      Paid
    </Badge>
  ),
}
