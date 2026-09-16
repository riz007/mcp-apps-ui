import type { Meta, StoryObj } from "@storybook/react-vite"
import { InlineTabs } from "."
import { DataList } from "../DataList"

const meta = {
  title: "Components/Controls/InlineTabs",
  component: InlineTabs,
  args: {
    label: "Flight details",
    tabs: [
      {
        value: "outbound",
        label: "Outbound",
        content: (
          <DataList
            items={[
              { label: "Departs", value: "BKK 08:40" },
              { label: "Arrives", value: "NRT 16:55" },
              { label: "Duration", value: "6h 15m" },
            ]}
          />
        ),
      },
      {
        value: "return",
        label: "Return",
        content: (
          <DataList
            items={[
              { label: "Departs", value: "NRT 18:30" },
              { label: "Arrives", value: "BKK 23:20" },
              { label: "Duration", value: "6h 50m" },
            ]}
          />
        ),
      },
      {
        value: "baggage",
        label: "Baggage",
        content: <p className="text-sm text-secondary">One cabin bag and one 23kg checked bag.</p>,
      },
    ],
  },
  argTypes: {
    onChange: { action: "change" },
  },
} satisfies Meta<typeof InlineTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DisabledTab: Story = {
  args: {
    defaultValue: "outbound",
    tabs: [
      { value: "outbound", label: "Outbound", content: <p className="text-sm">Outbound</p> },
      {
        value: "return",
        label: "Return",
        content: <p className="text-sm">Return</p>,
        disabled: true,
      },
    ],
  },
}
