import type { Meta, StoryObj } from "@storybook/react-vite"
import { ErrorState } from "."
import { Button } from "../Button"

const meta = {
  title: "Components/States/ErrorState",
  component: ErrorState,
  args: {
    title: "Couldn't load availability",
    description: "The booking service didn't respond.",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    icon: { control: false },
    action: { control: false },
  },
} satisfies Meta<typeof ErrorState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithRetry: Story = {
  args: {
    action: (
      <Button variant="soft" color="secondary" size="sm">
        Try again
      </Button>
    ),
  },
}
