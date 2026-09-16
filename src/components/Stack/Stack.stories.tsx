import type { Meta, StoryObj } from "@storybook/react-vite"
import { Stack } from "."

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="px-3 py-2 rounded-md border border-subtle bg-surface text-sm">{children}</div>
)

const meta = {
  title: "Components/Layout/Stack",
  component: Stack,
  args: { gap: 3, align: "stretch" },
  argTypes: {
    gap: { control: "select", options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12] },
    align: { control: "inline-radio", options: ["start", "center", "end", "stretch"] },
  },
  render: (args) => (
    <Stack {...args}>
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </Stack>
  ),
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Tight: Story = {
  args: { gap: 1 },
}

export const Centered: Story = {
  args: { align: "center" },
}
