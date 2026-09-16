import type { Meta, StoryObj } from "@storybook/react-vite"
import { Scroller } from "."
import { Button } from "../Button"
import { Thumbnail } from "../Thumbnail"

const places = [
  { name: "Baan Suan", meta: "Thai · $$ · 0.4 km", color: "#788C5D" },
  { name: "Osteria Nove", meta: "Italian · $$$ · 1.1 km", color: "#D97757" },
  { name: "Kin Kin", meta: "Japanese · $$ · 0.8 km", color: "#6A9BCC" },
  { name: "Green Table", meta: "Vegetarian · $ · 1.6 km", color: "#BCD1CA" },
  { name: "Casa Maíz", meta: "Mexican · $$ · 2.0 km", color: "#C46686" },
]

const image = (color: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 3"><rect width="4" height="3" fill="${color}"/></svg>`,
  )

const meta = {
  title: "Components/Layout/Scroller",
  component: Scroller,
  args: {
    label: "Nearby restaurants",
    itemWidth: "min(80%, 18rem)",
    gap: 3,
  },
  argTypes: {
    gap: { control: "select", options: [0, 1, 2, 3, 4, 5, 6, 8] },
    scrollPaddingInline: { control: "number" },
  },
  render: (args) => (
    <Scroller {...args}>
      {places.map((place) => (
        <article
          key={place.name}
          className="gap-3 p-3 flex w-full flex-col rounded-lg border border-default bg-surface"
        >
          <Thumbnail src={image(place.color)} alt="" ratio="16:9" />
          <div className="gap-0.5 flex flex-col">
            <h3 className="heading-sm">{place.name}</h3>
            <p className="text-sm text-secondary">{place.meta}</p>
          </div>
          <Button variant="soft" color="secondary" size="sm" block className="mt-auto">
            Check times
          </Button>
        </article>
      ))}
    </Scroller>
  ),
} satisfies Meta<typeof Scroller>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Mobile: Story = {
  globals: { width: "320" },
}

export const SafeAreaPadding: Story = {
  args: { scrollPaddingInline: 16 },
}
