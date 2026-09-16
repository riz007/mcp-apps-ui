import type { Meta, StoryObj } from "@storybook/react-vite"
import { StatusMessage } from "."

const meta = {
  title: "Components/States/StatusMessage",
  component: StatusMessage,
  args: {
    tone: "success",
    title: "Table booked",
    children: "A confirmation is on its way to your email.",
  },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["neutral", "info", "success", "warning", "danger"],
    },
    title: { control: "text" },
    children: { control: "text" },
  },
} satisfies Meta<typeof StatusMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Tones: Story = {
  render: () => (
    <div className="gap-3 flex flex-col">
      <StatusMessage tone="neutral">Prices include tax.</StatusMessage>
      <StatusMessage tone="info">Your host usually replies within an hour.</StatusMessage>
      <StatusMessage tone="success" title="Saved" />
      <StatusMessage tone="warning" title="Only 2 seats left">
        Book soon to keep this time.
      </StatusMessage>
      <StatusMessage tone="danger" title="Payment declined">
        Try another card in the conversation.
      </StatusMessage>
    </div>
  ),
}

export const WithoutIcon: Story = {
  args: { icon: null, tone: "neutral" },
}
