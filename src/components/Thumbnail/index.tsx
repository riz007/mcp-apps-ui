import { forwardRef, type ImgHTMLAttributes } from "react"
import { cn } from "../../lib/cn"

export type ThumbnailRatio = "1:1" | "4:3" | "3:2" | "16:9" | "3:4"

export type ThumbnailProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt"> & {
  /** Required. Pass an empty string only when the image is purely decorative. */
  alt: string
  /** The image is cropped to this ratio and never stretched. @default "4:3" */
  ratio?: ThumbnailRatio
  /** @default "md" */
  radius?: "none" | "sm" | "md" | "lg"
}

const ratioClasses: Record<ThumbnailRatio, string> = {
  "1:1": "aspect-square",
  "4:3": "aspect-[4/3]",
  "3:2": "aspect-[3/2]",
  "16:9": "aspect-video",
  "3:4": "aspect-[3/4]",
}

const radiusClasses = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
}

/** An image held at a fixed aspect ratio, filling the width it is given. */
export const Thumbnail = forwardRef<HTMLImageElement, ThumbnailProps>(
  ({ alt, ratio = "4:3", radius = "md", className, loading = "lazy", ...props }, ref) => (
    <img
      ref={ref}
      alt={alt}
      loading={loading}
      decoding="async"
      className={cn(
        "block h-auto w-full max-w-full bg-surface object-cover",
        ratioClasses[ratio],
        radiusClasses[radius],
        className,
      )}
      {...props}
    />
  ),
)
Thumbnail.displayName = "Thumbnail"
