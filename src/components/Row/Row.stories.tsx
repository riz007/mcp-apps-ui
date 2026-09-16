import type { Meta, StoryObj } from "@storybook/react-vite"
import { Row } from "."
import { Badge } from "../Badge"

const meta = {
  title: "Components/Layout/Row",
  component: Row,
  args: { gap: 2, align: "center", wrap: true },
  argTypes: {
    gap: { control: "select", options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12] },
    align: { control: "inline-radio", options: ["start", "center", "end", "baseline"] },
    justify: { control: "inline-radio", options: ["start", "center", "end", "between"] },
  },
  render: (args) => (
    <Row {...args}>
      {["Free Wi-Fi", "Breakfast", "Pool", "Parking", "Pet friendly", "Late checkout"].map(
        (label) => (
          <Badge key={label}>{label}</Badge>
        ),
      )}
    </Row>
  ),
} satisfies Meta<typeof Row>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Between: Story = {
  args: { justify: "between" },
}

export const Narrow: Story = {
  name: "Wraps at 320px",
  globals: { width: "320px" },
}
