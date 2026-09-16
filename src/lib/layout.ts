export type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12

export const gapClasses: Record<Gap, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
}

export type Align = "start" | "center" | "end" | "stretch" | "baseline"
export type Justify = "start" | "center" | "end" | "between"

export const alignClasses: Record<Align, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
}

export const justifyClasses: Record<Justify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
}
