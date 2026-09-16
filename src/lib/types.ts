export type Tone = "neutral" | "info" | "success" | "warning" | "danger"

export type Option<T extends string = string> = {
  value: T
  label: React.ReactNode
  disabled?: boolean
}
