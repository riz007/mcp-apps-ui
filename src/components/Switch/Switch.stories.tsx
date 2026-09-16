import type { Meta, StoryObj } from "@storybook/react-vite"
import { Switch } from "."

const meta = {
  title: "Components/Controls/Switch",
  component: Switch,
  args: {
    label: "Notify me when a table opens",
    defaultChecked: false,
    hideLabel: false,
    disabled: false,
  },
  argTypes: {
    onChange: { action: "change" },
    label: { control: "text" },
    description: { control: "text" },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const WithDescription: Story = {
  args: { description: "We'll message you in this conversation." },
}

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true },
}

export const HiddenLabel: Story = {
  args: { hideLabel: true },
}
