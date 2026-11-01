type IconProps = {
  className?: string
}

export function LoveSeal({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 128 108" fill="none" aria-hidden="true">
      <path
        d="M22 38.5c0-4.2 3.2-7.5 7.4-7.5h69.2c4.2 0 7.4 3.3 7.4 7.5v46c0 4.6-3.2 8-7.4 8H29.4c-4.2 0-7.4-3.4-7.4-8v-46Z"
        fill="#FFFDFB"
        stroke="#C48998"
        strokeWidth="2.2"
      />
      <path
        d="M24 40.5 64 68.5 104 40.5"
        stroke="#E7B4C2"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="64" cy="66" r="16" fill="#C23A4B" />
      <circle cx="64" cy="66" r="12.4" stroke="#F6D5DE" strokeWidth="1.1" opacity="0.85" />
      <path
        d="M64 73.6s-6.4-3.8-8.4-7.2c-1.4-2.5-.8-5.4 1.7-6.4 1.6-.6 3.1.1 4 1.5 1-1.4 2.4-2.1 4-1.5 2.5 1 3.1 3.9 1.7 6.4-2 3.4-8.4 7.2-8.4 7.2Z"
        fill="#FFFDFB"
      />
    </svg>
  )
}

export function DoodleHeart({ className, outline = false }: IconProps & { outline?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 27.2S6.4 20.7 4.4 15C2.8 10.7 4.6 6.6 8.5 5.8c2.4-.5 4.2.6 5.5 2.3 1.2-1.7 3.2-2.8 5.6-2.3 3.9.8 5.5 5 3.9 9.2-2 5.7-7.5 12.2-7.5 12.2Z"
        fill={outline ? 'none' : 'currentColor'}
        stroke="currentColor"
        strokeWidth={outline ? 1.7 : 0}
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Sparkle({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .4c.45 4.3 2 6.2 11.6 11.6C14 16.4 12.45 18.3 12 23.6 11.55 18.3 10 16.4.4 12 10 6.6 11.55 4.7 12 .4Z"
      />
    </svg>
  )
}

export function Star({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="m12 2.2 2.15 6.05 6.45.55-4.9 4.15 1.5 6.3L12 16.2 6.8 19.25l1.5-6.3L3.4 8.8l6.45-.55L12 2.2Z"
      />
    </svg>
  )
}

export function Flower({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <g fill="currentColor">
        <circle cx="24" cy="11" r="7" />
        <circle cx="35.6" cy="19.2" r="7" />
        <circle cx="31.2" cy="33.2" r="7" />
        <circle cx="16.8" cy="33.2" r="7" />
        <circle cx="12.4" cy="19.2" r="7" />
      </g>
      <circle cx="24" cy="23.2" r="5.2" fill="#FFFDFB" />
    </svg>
  )
}

export function Bow({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 42" aria-hidden="true">
      <path
        fill="currentColor"
        d="M32 21C30 12 21.5 6.5 13 8.2c6.2 1.6 9.2 7.2 9.4 12.8-6.4.8-12.6 3.6-15.2 8.2 8.4-2.2 16.6-2.4 24.8-8.2Z"
      />
      <path
        fill="currentColor"
        d="M32 21c2-9 10.5-14.5 19-12.8-6.2 1.6-9.2 7.2-9.4 12.8 6.4.8 12.6 3.6 15.2 8.2-8.4-2.2-16.6-2.4-24.8-8.2Z"
      />
      <circle cx="32" cy="21" r="3.3" fill="#8E2436" />
      <path
        d="M30.2 23.2c-1.2 4.8-2.2 8.6-4.6 12.2"
        stroke="#8E2436"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M33.8 23.2c1.2 4.8 2.2 8.6 4.6 12.2"
        stroke="#8E2436"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Swoosh({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 180 18" fill="none" aria-hidden="true">
      <path
        d="M4 11c28-8 52 6 82-1s58-3 90 2"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
