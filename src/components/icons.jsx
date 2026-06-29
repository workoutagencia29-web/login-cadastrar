/* Inline icon set — stroke-based, inherits currentColor. */
const base = {
  viewBox: '0 0 24 24',
  width: '1em',
  height: '1em',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
}

export const IconBuilding = (p) => (
  <svg {...base} {...p}>
    <path d="M3 21h18" />
    <path d="M5 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16" />
    <path d="M16 21v-9a1 1 0 0 1 1-1h2a2 2 0 0 1 2 2v8" />
    <path d="M9 7h2M9 11h2M9 15h2" />
  </svg>
)

export const IconUser = (p) => (
  <svg {...base} {...p}>
    <path d="M20 21a8 8 0 0 0-16 0" />
    <circle cx="12" cy="8" r="4" />
  </svg>
)

export const IconMail = (p) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3 7 8.4 5.6a1 1 0 0 0 1.2 0L21 7" />
  </svg>
)

export const IconLock = (p) => (
  <svg {...base} {...p}>
    <rect x="4" y="10.5" width="16" height="10.5" rx="2.4" />
    <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
  </svg>
)

export const IconPhone = (p) => (
  <svg {...base} {...p}>
    <path d="M6.5 3h3l1.5 4.5L9 9.5a12 12 0 0 0 5.5 5.5l2-2 4.5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
  </svg>
)

export const IconBriefcase = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="7.5" width="18" height="12.5" rx="2.2" />
    <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" />
    <path d="M3 12.5h18" />
  </svg>
)

export const IconEye = (p) => (
  <svg {...base} {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

export const IconEyeOff = (p) => (
  <svg {...base} {...p}>
    <path d="M10.7 6.1A8.9 8.9 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-3 3.6" />
    <path d="M6.4 7.6A16 16 0 0 0 2.5 12S6 18 12 18a8.7 8.7 0 0 0 4.1-1" />
    <path d="m9.9 9.9a3 3 0 0 0 4.2 4.2" />
    <path d="m3 3 18 18" />
  </svg>
)

export const IconCheck = (p) => (
  <svg {...base} {...p}>
    <path d="m4 12.5 5 5 11-11" />
  </svg>
)

export const IconCheckCircle = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 2.5 2.5L16 9" />
  </svg>
)

export const IconAlert = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5" />
    <path d="M12 16.2h.01" />
  </svg>
)

export const IconChevronDown = (p) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const IconArrowRight = (p) => (
  <svg {...base} {...p}>
    <path d="M4 12h16" />
    <path d="m14 6 6 6-6 6" />
  </svg>
)

export const IconArrowLeft = (p) => (
  <svg {...base} {...p}>
    <path d="M20 12H4" />
    <path d="m10 6-6 6 6 6" />
  </svg>
)

export const IconShield = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3 5 6v5.5c0 4.2 3 7.4 7 9 4-1.6 7-4.8 7-9V6Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export const IconLockSmall = (p) => (
  <svg {...base} {...p}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
)

export const IconGlobe = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
  </svg>
)

export const IconBolt = (p) => (
  <svg {...base} {...p}>
    <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12Z" />
  </svg>
)

export const IconSparkle = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3v18M3 12h18" opacity="0" />
    <path d="M12 4.5c.6 3.4 1.6 4.4 5 5-3.4.6-4.4 1.6-5 5-.6-3.4-1.6-4.4-5-5 3.4-.6 4.4-1.6 5-5Z" />
  </svg>
)

export const IconUpload = (p) => (
  <svg {...base} {...p}>
    <path d="M12 15V4" />
    <path d="m7.5 8.5 4.5-4.5 4.5 4.5" />
    <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </svg>
)

export const IconX = (p) => (
  <svg {...base} {...p}>
    <path d="M6 6 18 18" />
    <path d="M18 6 6 18" />
  </svg>
)

export const IconFileText = (p) => (
  <svg {...base} {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h4" />
  </svg>
)

export const IconId = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.2" />
    <circle cx="8.5" cy="11" r="2" />
    <path d="M13 10h5M13 14h5" />
    <path d="M5.6 16c.6-1.5 5.3-1.5 5.8 0" />
  </svg>
)

export const IconCamera = (p) => (
  <svg {...base} {...p}>
    <path d="M4 8h3l1.4-2h7.2L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
    <circle cx="12" cy="13" r="3.2" />
  </svg>
)

export const IconCookie = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-4-4 .9.9 0 0 0-1-1Z" />
    <path d="M8.5 10.5h.01M12.5 14.5h.01M15.5 11.5h.01M9 15h.01" />
  </svg>
)

export const IconClock = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v4.8l3 1.8" />
  </svg>
)

export const IconWallet = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="6" width="18" height="13" rx="2.4" />
    <path d="M3 10h18" />
    <circle cx="16.5" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
)

export const IconBell = (p) => (
  <svg {...base} {...p}>
    <path d="M6 9.5a6 6 0 0 1 12 0c0 4.5 1.8 5.8 1.8 5.8H4.2S6 14 6 9.5Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
)

export const IconTrendUp = (p) => (
  <svg {...base} {...p}>
    <path d="M3 17l6-6 4 4 7-7.5" />
    <path d="M17 7.5h4v4" />
  </svg>
)

export const IconChat = (p) => (
  <svg {...base} {...p}>
    <path d="M21 11.5a8 8 0 0 1-11.5 7.2L4 20l1.3-4.5A8 8 0 1 1 21 11.5Z" />
    <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
  </svg>
)

export const IconHelp = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.7-2.5 2-2.5 3.5" />
    <path d="M12 17.5h.01" />
  </svg>
)
