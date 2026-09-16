import type { Meta, StoryObj } from "@storybook/react-vite"
import * as Icons from "."

const { createIcon: _createIcon, ...set } = Icons

const meta = {
  title: "Components/Display/Icon",
  component: Icons.Calendar,
  args: { className: "size-6" },
  argTypes: {
    title: { control: "text" },
  },
} satisfies Meta<typeof Icons.Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Gallery: Story = {
  render: () => (
    <ul className="gap-2 grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))]">
      {Object.entries(set).map(([name, Icon]) => (
        <li
          key={name}
          className="gap-2 p-3 flex flex-col items-center rounded-md border border-subtle text-xs text-secondary"
        >
          <Icon className="size-6 text-primary" />
          {name}
        </li>
      ))}
    </ul>
  ),
}

export const InheritsColor: Story = {
  name: "Inherits currentColor",
  render: () => (
    <div className="gap-4 flex">
      <Icons.Info className="text-info" title="Info" />
      <Icons.Success className="text-success" title="Success" />
      <Icons.Warning className="text-warning" title="Warning" />
      <Icons.Danger className="text-danger" title="Error" />
    </div>
  ),
}
