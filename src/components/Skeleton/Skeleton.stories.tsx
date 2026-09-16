import type { Meta, StoryObj } from "@storybook/react-vite"
import { useEffect, useState } from "react"
import { Skeleton } from "."
import { Badge } from "../Badge"
import { DataList } from "../DataList"

const meta = {
  title: "Components/States/Skeleton",
  component: Skeleton,
  args: { variant: "text", lines: 1 },
  argTypes: {
    variant: { control: "inline-radio", options: ["text", "block", "circle"] },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Text: Story = {
  args: { lines: 3 },
}

export const Block: Story = {
  args: { variant: "block" },
}

export const Circle: Story = {
  args: { variant: "circle" },
}

function CardSkeleton() {
  return (
    <div className="gap-4 flex flex-col">
      <div className="gap-3 flex items-start justify-between">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-20" />
      </div>
      <div className="gap-2 flex flex-col">
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  )
}

export const MatchingLayout: Story = {
  name: "Matches the final layout",
  render: function Render() {
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 1500)
      return () => clearTimeout(timer)
    }, [])
    return (
      <div
        aria-busy={!loaded}
        className="max-w-sm p-4 w-full rounded-lg border border-default bg-surface"
      >
        {loaded ? (
          <div className="gap-4 flex flex-col">
            <div className="gap-3 flex items-start justify-between">
              <h2 className="heading-md">La Luna Bistro</h2>
              <Badge color="success">Confirmed</Badge>
            </div>
            <DataList
              items={[
                { label: "Date", value: "Apr 12 · 7:30 PM" },
                { label: "Guests", value: "Party of 2" },
              ]}
            />
          </div>
        ) : (
          <CardSkeleton />
        )}
      </div>
    )
  },
}
