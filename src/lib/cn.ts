import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge<"heading" | "focus-ring">({
  extend: {
    classGroups: {
      heading: [{ heading: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] }],
      shadow: ["shadow-hairline"],
      "font-size": [{ text: ["md"] }],
    },
    conflictingClassGroups: {
      heading: ["font-size", "leading", "font-weight"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
