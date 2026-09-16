import type { Meta, StoryObj } from "@storybook/react-vite"
import { Separator } from "."

const meta = {
  title: "Components/Display/Separator",
  component: Separator,
  args: { orientation: "horizontal", decorative: true },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="gap-3 flex flex-col text-sm">
      <p>Subtotal</p>
      <Separator {...args} />
      <p>Total</p>
    </div>
  ),
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="h-6 gap-3 flex items-center text-sm text-secondary">
      <span>4.8 rating</span>
      <Separator {...args} />
      <span>$$</span>
      <Separator {...args} />
      <span>0.4 km</span>
    </div>
  ),
}
