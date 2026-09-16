import type { ReactNode } from "react"

type Row = { utility: string; token: string; preview: ReactNode }

function Table({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-subtle bg-canvas text-primary">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-subtle text-secondary">
            <th className="p-3 font-medium">Light</th>
            <th className="p-3 font-medium">Dark</th>
            <th className="p-3 font-medium">Utility</th>
            <th className="p-3 font-medium">Host variable</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.utility} className="border-b border-subtle last:border-0">
              <td data-theme="light" className="p-3 bg-canvas text-primary">
                {row.preview}
              </td>
              <td data-theme="dark" className="p-3 bg-canvas text-primary">
                {row.preview}
              </td>
              <td className="p-3 font-mono text-xs">{row.utility}</td>
              <td className="p-3 font-mono text-xs text-secondary">{row.token}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const swatch = (className: string) => (
  <span className={`h-8 w-14 block rounded-sm border border-subtle ${className}`} />
)

export function BackgroundTokens() {
  return (
    <Table
      rows={[
        ["bg-canvas", "--color-background-primary", "bg-canvas"],
        ["bg-surface", "--color-background-secondary", "bg-surface"],
        ["bg-surface-tertiary", "--color-background-tertiary", "bg-surface-tertiary"],
        ["bg-inverse", "--color-background-inverse", "bg-inverse"],
        ["bg-info", "--color-background-info", "bg-info"],
        ["bg-success", "--color-background-success", "bg-success"],
        ["bg-warning", "--color-background-warning", "bg-warning"],
        ["bg-danger", "--color-background-danger", "bg-danger"],
        ["bg-disabled", "--color-background-disabled", "bg-disabled"],
        ["bg-accent", "--mcp-accent (defaults to text primary)", "bg-accent"],
      ].map(([utility, token, className]) => ({
        utility: utility!,
        token: token!,
        preview: swatch(className!),
      }))}
    />
  )
}

export function TextTokens() {
  return (
    <Table
      rows={[
        ["text-primary", "--color-text-primary", "text-primary"],
        ["text-secondary", "--color-text-secondary", "text-secondary"],
        ["text-tertiary", "--color-text-tertiary", "text-tertiary"],
        ["text-info", "--color-text-info", "text-info"],
        ["text-success", "--color-text-success", "text-success"],
        ["text-warning", "--color-text-warning", "text-warning"],
        ["text-danger", "--color-text-danger", "text-danger"],
        ["text-disabled", "--color-text-disabled", "text-disabled"],
      ].map(([utility, token, className]) => ({
        utility: utility!,
        token: token!,
        preview: <span className={`font-medium ${className}`}>Aa</span>,
      }))}
    />
  )
}

export function BorderTokens() {
  return (
    <Table
      rows={[
        ["border-default", "--color-border-primary"],
        ["border-secondary", "--color-border-secondary"],
        ["border-subtle", "--color-border-tertiary"],
        ["border-info", "--color-border-info"],
        ["border-success", "--color-border-success"],
        ["border-warning", "--color-border-warning"],
        ["border-danger", "--color-border-danger"],
      ].map(([utility, token]) => ({
        utility: utility!,
        token: token!,
        preview: <span className={`h-8 w-14 block rounded-sm border-2 ${utility}`} />,
      }))}
    />
  )
}

export function TypeTokens() {
  return (
    <Table
      rows={[
        ["heading-3xl", "--font-heading-3xl-*"],
        ["heading-2xl", "--font-heading-2xl-*"],
        ["heading-xl", "--font-heading-xl-*"],
        ["heading-lg", "--font-heading-lg-*"],
        ["heading-md", "--font-heading-md-*"],
        ["heading-sm", "--font-heading-sm-*"],
        ["text-lg", "--font-text-lg-*"],
        ["text-md", "--font-text-md-*"],
        ["text-sm", "--font-text-sm-*"],
        ["text-xs", "--font-text-xs-*"],
      ].map(([utility, token]) => ({
        utility: utility!,
        token: token!,
        preview: <span className={`${utility} whitespace-nowrap`}>Table for two</span>,
      }))}
    />
  )
}

export function RadiusTokens() {
  return (
    <Table
      rows={[
        ["rounded-xs", "--border-radius-xs"],
        ["rounded-sm", "--border-radius-sm"],
        ["rounded-md", "--border-radius-md"],
        ["rounded-lg", "--border-radius-lg"],
        ["rounded-xl", "--border-radius-xl"],
        ["rounded-full", "--border-radius-full"],
      ].map(([utility, token]) => ({
        utility: utility!,
        token: token!,
        preview: <span className={`size-10 block border border-default bg-surface ${utility}`} />,
      }))}
    />
  )
}
