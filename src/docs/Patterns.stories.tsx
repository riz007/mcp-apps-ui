import type { Meta, StoryObj } from "@storybook/react-vite"
import { useEffect, useState } from "react"
import { Badge } from "../components/Badge"
import { Button } from "../components/Button"
import { DataList } from "../components/DataList"
import { EmptyState } from "../components/EmptyState"
import { ErrorState } from "../components/ErrorState"
import { Calendar, Clock, Location, Members, Star } from "../components/Icon"
import { InlineTabs } from "../components/InlineTabs"
import { Scroller } from "../components/Scroller"
import { SegmentedControl } from "../components/SegmentedControl"
import { Skeleton } from "../components/Skeleton"
import { Slider } from "../components/Slider"
import { StatusMessage } from "../components/StatusMessage"
import { Stepper } from "../components/Stepper"
import { Switch } from "../components/Switch"
import { Thumbnail } from "../components/Thumbnail"
import { ToggleChips } from "../components/ToggleChips"

const meta = {
  title: "Patterns/Examples",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const picture = (fill: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9"><rect width="16" height="9" fill="${fill}"/><path d="M0 7l4-3 3 2 3-2 6 4v1H0z" fill="#141413" fill-opacity=".15"/></svg>`,
  )

export const InlineCard: Story = {
  name: "Inline card",
  render: function Render() {
    const [seating, setSeating] = useState<"indoor" | "patio">("indoor")
    const [confirmed, setConfirmed] = useState(false)

    return (
      <div className="max-w-md gap-4 p-4 flex w-full flex-col rounded-lg border border-default bg-surface">
        <div className="gap-3 flex items-start justify-between">
          <h2 className="heading-md">La Luna Bistro</h2>
          <Badge color={confirmed ? "success" : "neutral"}>
            {confirmed ? "Confirmed" : "Held"}
          </Badge>
        </div>
        <DataList
          items={[
            { icon: <Calendar />, label: "Date", value: "Apr 12 · 7:30 PM" },
            { icon: <Members />, label: "Guests", value: "Party of 2" },
            { icon: <Location />, label: "Where", value: "Sukhumvit 11" },
          ]}
        />
        <SegmentedControl
          label="Seating"
          options={[
            { value: "indoor", label: "Indoor" },
            { value: "patio", label: "Patio" },
          ]}
          value={seating}
          onChange={setSeating}
        />
        {confirmed ? (
          <StatusMessage tone="success" title="Table confirmed">
            {seating === "patio" ? "Patio" : "Indoor"} seating for two.
          </StatusMessage>
        ) : null}
        <div className="gap-3 pt-4 sm:grid-cols-2 @container grid border-t border-subtle">
          <Button variant="soft" color="secondary" block>
            Change time
          </Button>
          <Button block onClick={() => setConfirmed(true)} disabled={confirmed}>
            {confirmed ? "Booked" : "Confirm"}
          </Button>
        </div>
      </div>
    )
  },
}

const places = [
  { name: "Baan Suan", meta: "Thai · $$ · 0.4 km", rating: "4.8", fill: "#788C5D" },
  { name: "Osteria Nove", meta: "Italian · $$$ · 1.1 km", rating: "4.6", fill: "#D97757" },
  { name: "Kin Kin", meta: "Japanese · $$ · 0.8 km", rating: "4.7", fill: "#6A9BCC" },
  { name: "Green Table", meta: "Vegetarian · $ · 1.6 km", rating: "4.5", fill: "#BCD1CA" },
]

export const Carousel: Story = {
  render: () => (
    <div className="gap-3 flex w-full flex-col">
      <ToggleChips
        label="Filter"
        hideLabel
        options={[
          { value: "open", label: "Open now" },
          { value: "outdoor", label: "Outdoor" },
          { value: "veg", label: "Vegetarian" },
        ]}
        defaultValue={["open"]}
      />
      <Scroller label="Restaurants near you">
        {places.map((place) => (
          <article
            key={place.name}
            className="gap-3 p-3 flex w-full flex-col rounded-lg border border-default bg-surface"
          >
            <Thumbnail src={picture(place.fill)} alt="" ratio="16:9" />
            <div className="gap-0.5 flex flex-col">
              <div className="gap-2 flex items-center justify-between">
                <h3 className="heading-sm">{place.name}</h3>
                <span className="gap-1 flex items-center text-sm text-secondary">
                  <Star className="size-4" />
                  {place.rating}
                </span>
              </div>
              <p className="text-sm text-secondary">{place.meta}</p>
            </div>
            <Button variant="soft" color="secondary" size="sm" block className="mt-auto">
              See times
            </Button>
          </article>
        ))}
      </Scroller>
    </div>
  ),
}

export const Loading: Story = {
  name: "Loading to loaded",
  render: function Render() {
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
      if (loaded) return
      const timer = setTimeout(() => setLoaded(true), 1800)
      return () => clearTimeout(timer)
    }, [loaded])

    return (
      <div className="max-w-md gap-3 flex w-full flex-col">
        <div
          aria-busy={!loaded}
          className="gap-4 p-4 flex flex-col rounded-lg border border-default bg-surface"
        >
          {loaded ? (
            <>
              <div className="gap-3 flex items-start justify-between">
                <h2 className="heading-md">Flight TG 642</h2>
                <Badge color="info">On time</Badge>
              </div>
              <DataList
                items={[
                  { icon: <Clock />, label: "Boarding", value: "08:10" },
                  { icon: <Location />, label: "Gate", value: "C4" },
                ]}
              />
            </>
          ) : (
            <>
              <div className="gap-3 flex items-start justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="gap-2 flex flex-col">
                <Skeleton />
                <Skeleton />
              </div>
            </>
          )}
        </div>
        <Button variant="ghost" color="secondary" size="sm" onClick={() => setLoaded(false)}>
          Replay
        </Button>
      </div>
    )
  },
}

export const Settings: Story = {
  name: "Preferences",
  render: () => (
    <div className="max-w-md gap-5 p-4 flex w-full flex-col rounded-lg border border-default bg-surface">
      <h2 className="heading-md">Search preferences</h2>
      <Slider
        label="Max price per night"
        defaultValue={120}
        max={400}
        step={10}
        formatValue={(v) => `$${v}`}
      />
      <Stepper label="Rooms" defaultValue={1} min={1} max={5} />
      <Switch label="Free cancellation only" defaultChecked />
    </div>
  ),
}

export const Fullscreen: Story = {
  name: "Fullscreen detail",
  render: () => (
    <div className="gap-4 flex w-full flex-col">
      <div className="gap-3 flex flex-wrap items-center justify-between">
        <h1 className="heading-xl">Tokyo, 5 nights</h1>
        <Badge color="success">Within budget</Badge>
      </div>
      <InlineTabs
        label="Trip"
        tabs={[
          {
            value: "overview",
            label: "Overview",
            content: (
              <DataList
                dividers
                items={[
                  { label: "Flights", value: "$642" },
                  { label: "Hotel", value: "$780" },
                  { label: "Activities", value: "$210" },
                  { label: "Total", value: "$1,632" },
                ]}
              />
            ),
          },
          {
            value: "hotel",
            label: "Hotel",
            content: (
              <div className="gap-3 @container flex flex-col">
                <Thumbnail src={picture("#6A9BCC")} alt="Hotel exterior" ratio="16:9" />
                <p className="text-sm text-secondary">Shinjuku, 6 minutes from the station.</p>
              </div>
            ),
          },
          {
            value: "notes",
            label: "Notes",
            content: (
              <EmptyState
                title="No notes yet"
                description="Tell Claude what to remember for this trip."
              />
            ),
          },
        ]}
      />
    </div>
  ),
}

export const Failure: Story = {
  name: "Error with recovery",
  render: () => (
    <div className="max-w-md w-full rounded-lg border border-default bg-surface">
      <ErrorState
        title="Couldn't reach the airline"
        description="Your booking wasn't changed."
        action={
          <Button variant="soft" color="secondary" size="sm">
            Try again
          </Button>
        }
      />
    </div>
  ),
}
