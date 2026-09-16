import type { Meta, StoryObj } from "@storybook/react-vite"
import { ButtonLink } from "."

const meta = {
  title: "Components/Controls/ButtonLink",
  component: ButtonLink,
  args: {
    href: "#",
    children: "View itinerary",
    variant: "solid",
    color: "primary",
    size: "md",
    external: false,
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["solid", "soft", "ghost"] },
    color: { control: "inline-radio", options: ["primary", "secondary", "danger"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
} satisfies Meta<typeof ButtonLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const External: Story = {
  args: { external: true, variant: "soft", color: "secondary", children: "Open in Maps" },
}

export const Variants: Story = {
  render: (args) => (
    <div className="gap-3 flex flex-wrap">
      <ButtonLink {...args} variant="solid">
        Solid
      </ButtonLink>
      <ButtonLink {...args} variant="soft" color="secondary">
        Soft
      </ButtonLink>
      <ButtonLink {...args} variant="ghost">
        Ghost
      </ButtonLink>
    </div>
  ),
}
