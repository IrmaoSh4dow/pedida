type LieDetectorArtProps = {
  mode: 'idle' | 'scan' | 'true' | 'lie' | 'max'
}

export function LieDetectorArt({ mode }: LieDetectorArtProps) {
  return (
    <svg className={`detector-art is-${mode}`} viewBox="0 0 180 168" aria-hidden="true">
      <path
        d="M90 146s-46-26-56-58c-7-20 2-40 22-44 13-3 24 3 30 14 6-11 17-17 30-14 20 4 29 24 22 44-10 32-48 58-48 58z"
        fill="#FFF7F8"
        stroke="#C48998"
        strokeWidth="3"
      />
      <circle className="lamp lamp-a" cx="62" cy="58" r="7" />
      <circle className="lamp lamp-b" cx="118" cy="58" r="7" />
      <rect x="58" y="78" width="64" height="36" rx="10" fill="#FFFDFB" stroke="#E7B4C2" strokeWidth="2" />
      <path d="M66 104h48" stroke="#F6D5DE" strokeWidth="3" strokeLinecap="round" />
      <g className="needle">
        <line x1="90" y1="96" x2="112" y2="82" stroke="#C23A4B" strokeWidth="3" strokeLinecap="round" />
        <circle cx="90" cy="96" r="4" fill="#8E2436" />
      </g>
    </svg>
  )
}
