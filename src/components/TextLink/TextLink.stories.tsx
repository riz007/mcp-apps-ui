import type { Meta, StoryObj } from "@storybook/react-vite"
import { TextLink } from "."

const meta = {
  title: "Components/Controls/TextLink",
  component: TextLink,
  args: { href: "#", children: "cancellation policy", external: false },
} satisfies Meta<typeof TextLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <p className="max-w-prose text-sm text-secondary">
      Free cancellation until 24 hours before. Read the <TextLink {...args} /> for details.
    </p>
  ),
}

export const External: Story = {
  args: { external: true, children: "restaurant website" },
  render: Default.render,
}
