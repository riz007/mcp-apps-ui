import type { Meta, StoryObj } from "@storybook/react-vite"
import { Thumbnail } from "."

const image =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#6A9BCC"/><path d="M0 220l110-90 90 70 70-50 130 110v40H0z" fill="#788C5D"/><circle cx="310" cy="80" r="34" fill="#F0EEE6"/></svg>`,
  )

const meta = {
  title: "Components/Display/Thumbnail",
  component: Thumbnail,
  args: { src: image, alt: "Hills under a blue sky", ratio: "4:3", radius: "md" },
  argTypes: {
    ratio: { control: "inline-radio", options: ["1:1", "4:3", "3:2", "16:9", "3:4"] },
    radius: { control: "inline-radio", options: ["none", "sm", "md", "lg"] },
  },
  decorators: [
    (Story) => (
      <div className="w-64 max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Thumbnail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Ratios: Story = {
  render: (args) => (
    <div className="gap-3 grid grid-cols-2">
      {(["1:1", "4:3", "3:2", "16:9"] as const).map((ratio) => (
        <figure key={ratio} className="gap-1 flex flex-col">
          <Thumbnail {...args} ratio={ratio} />
          <figcaption className="text-xs text-tertiary">{ratio}</figcaption>
        </figure>
      ))}
    </div>
  ),
}
