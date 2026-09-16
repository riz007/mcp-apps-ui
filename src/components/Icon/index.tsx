import { createIcon } from "./createIcon"

export { createIcon, type IconProps } from "./createIcon"

export const Check = createIcon("Check", <path d="M5 12.5l4.5 4.5L19 7.5" />)

export const Close = createIcon("Close", <path d="M6 6l12 12M18 6L6 18" />)

export const ChevronDown = createIcon("ChevronDown", <path d="M6 9l6 6 6-6" />)

export const ChevronUp = createIcon("ChevronUp", <path d="M6 15l6-6 6 6" />)

export const ChevronLeft = createIcon("ChevronLeft", <path d="M15 6l-6 6 6 6" />)

export const ChevronRight = createIcon("ChevronRight", <path d="M9 6l6 6-6 6" />)

export const ExternalLink = createIcon(
  "ExternalLink",
  <>
    <path d="M14 4h6v6M20 4l-9 9" />
    <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
  </>,
)

export const Copy = createIcon(
  "Copy",
  <>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M15 5v-.5A1.5 1.5 0 0 0 13.5 3h-9A1.5 1.5 0 0 0 3 4.5v9A1.5 1.5 0 0 0 4.5 15H5" />
  </>,
)

export const Download = createIcon("Download", <path d="M12 4v11M7 10l5 5 5-5M4 20h16" />)

export const Search = createIcon(
  "Search",
  <>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.4-4.4" />
  </>,
)

export const Filter = createIcon("Filter", <path d="M4 6h16M7 12h10M10 18h4" />)

export const Calendar = createIcon(
  "Calendar",
  <>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </>,
)

export const Clock = createIcon(
  "Clock",
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </>,
)

export const Location = createIcon(
  "Location",
  <>
    <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </>,
)

export const User = createIcon(
  "User",
  <>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
  </>,
)

export const Members = createIcon(
  "Members",
  <>
    <circle cx="9" cy="8.5" r="3" />
    <path d="M3 19.5c.6-3 2.9-4.8 6-4.8s5.4 1.8 6 4.8" />
    <path d="M15.5 5.7a3 3 0 0 1 0 5.6M17.5 14.9c1.8.6 3.1 2.2 3.5 4.6" />
  </>,
)

export const Star = createIcon(
  "Star",
  <path d="M12 3.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L12 16.9l-5.25 2.7 1-5.8L3.5 9.7l5.9-.9z" />,
)

export const Info = createIcon(
  "Info",
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5M12 8h.01" />
  </>,
)

export const Warning = createIcon(
  "Warning",
  <>
    <path d="M10.3 4.3L2.9 17.5a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z" />
    <path d="M12 9.5v4M12 17h.01" />
  </>,
)

export const Danger = createIcon(
  "Danger",
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9 9l6 6M15 9l-6 6" />
  </>,
)

export const Success = createIcon(
  "Success",
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M8.5 12.2l2.3 2.3 4.7-4.8" />
  </>,
)

export const Plus = createIcon("Plus", <path d="M12 5v14M5 12h14" />)

export const Minus = createIcon("Minus", <path d="M5 12h14" />)
