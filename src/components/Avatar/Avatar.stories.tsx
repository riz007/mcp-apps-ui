import type { Meta, StoryObj } from "@storybook/react-vite"
import { Avatar } from "."

const photo =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#788C5D"/><circle cx="32" cy="26" r="11" fill="#E3DACC"/><path d="M12 60c3-12 11-18 20-18s17 6 20 18z" fill="#E3DACC"/></svg>`,
  )

const meta = {
  title: "Components/Display/Avatar",
  component: Avatar,
  args: { alt: "Mali Chaiyaporn", size: "md" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithImage: Story = {
  args: { src: photo },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="gap-3 flex items-center">
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
    </div>
  ),
}

export const BrokenImage: Story = {
  args: { src: "data:image/png;base64,broken", alt: "Tomás Reyes" },
}
