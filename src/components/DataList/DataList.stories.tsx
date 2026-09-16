import type { Meta, StoryObj } from "@storybook/react-vite"
import { DataList } from "."
import { Calendar, Clock, Location, Members } from "../Icon"

const meta = {
  title: "Components/Display/DataList",
  component: DataList,
  args: {
    align: "end",
    dividers: false,
    items: [
      { label: "Date", value: "Sat, Apr 12" },
      { label: "Time", value: "7:30 PM" },
      { label: "Guests", value: "Party of 2" },
      { label: "Address", value: "112 Sukhumvit Soi 11, Bangkok" },
    ],
  },
  argTypes: {
    align: { control: "inline-radio", options: ["start", "end"] },
  },
} satisfies Meta<typeof DataList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcons: Story = {
  args: {
    items: [
      { icon: <Calendar />, label: "Date", value: "Sat, Apr 12" },
      { icon: <Clock />, label: "Time", value: "7:30 PM" },
      { icon: <Members />, label: "Guests", value: "Party of 2" },
      { icon: <Location />, label: "Where", value: "Sukhumvit 11" },
    ],
  },
}

export const Dividers: Story = {
  args: { dividers: true },
}

export const AlignStart: Story = {
  args: { align: "start" },
}

export const Narrow: Story = {
  name: "Stacks below 320px",
  render: (args) => (
    <div className="w-[280px] max-w-full">
      <DataList {...args} />
    </div>
  ),
}
