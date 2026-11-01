import { useEffect, useState, type CSSProperties } from 'react'
import { Bow, DoodleHeart, Flower, Sparkle, Star } from './illustrations.tsx'

type PieceKind = 'heart' | 'sparkle' | 'star' | 'flower' | 'bow'

type Piece = {
  kind: PieceKind
  top: string
  left: string
  size: number
  color: string
  depth: number
  delay: number
  duration: number
  opacity: number
  tilt: number
  optional?: boolean
  outline?: boolean
}

type PieceStyle = CSSProperties & {
  '--depth': number
  '--tilt': string
  '--piece-opacity': number
  '--appear-delay': string
  '--duration': string
  '--float-delay': string
}

const pieces: Piece[] = [
  { kind: 'heart', top: '7%', left: '7%', size: 22, color: '#c23a4b', depth: 1.15, delay: 0.1, duration: 9.5, opacity: 0.78, tilt: -8 },
  { kind: 'sparkle', top: '14%', left: '86%', size: 15, color: '#b7a3d6', depth: 1.45, delay: 0.45, duration: 11, opacity: 0.9, tilt: 0 },
  { kind: 'star', top: '80%', left: '8%', size: 14, color: '#c48998', depth: 0.85, delay: 0.7, duration: 10.5, opacity: 0.72, tilt: 10 },
  { kind: 'heart', top: '84%', left: '88%', size: 18, color: '#e7b4c2', depth: 1.2, delay: 0.25, duration: 12, opacity: 0.95, tilt: 7, outline: true },
  { kind: 'sparkle', top: '91%', left: '46%', size: 11, color: '#a35d70', depth: 0.55, delay: 0.9, duration: 8.8, opacity: 0.6, tilt: 0 },
  { kind: 'star', top: '30%', left: '5%', size: 11, color: '#b7a3d6', depth: 1.5, delay: 0.55, duration: 13, opacity: 0.7, tilt: -12 },
  { kind: 'flower', top: '44%', left: '3.5%', size: 36, color: '#e7b4c2', depth: 0.7, delay: 0.2, duration: 14, opacity: 0.82, tilt: -8, optional: true },
  { kind: 'bow', top: '38%', left: '91%', size: 46, color: '#c23a4b', depth: 0.95, delay: 0.35, duration: 12.5, opacity: 0.72, tilt: 8, optional: true },
  { kind: 'heart', top: '62%', left: '12%', size: 13, color: '#c48998', depth: 1.35, delay: 1, duration: 9.2, opacity: 0.48, tilt: 6, optional: true, outline: true },
  { kind: 'sparkle', top: '10%', left: '62%', size: 10, color: '#c23a4b', depth: 1.6, delay: 0.8, duration: 8.4, opacity: 0.55, tilt: 0, optional: true },
]

function PieceIcon({ piece }: { piece: Piece }) {
  if (piece.kind === 'heart') return <DoodleHeart outline={piece.outline} />
  if (piece.kind === 'sparkle') return <Sparkle />
  if (piece.kind === 'star') return <Star />
  if (piece.kind === 'flower') return <Flower />
  return <Bow />
}

export function Atmosphere() {
  const [glow] = useState(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return fine && !reduce
  })

  useEffect(() => {
    if (!glow) return

    const root = document.documentElement
    let x = window.innerWidth / 2
    let y = window.innerHeight * 0.38
    let targetX = x
    let targetY = y
    let frame = 0
    let running = false

    const tick = () => {
      x += (targetX - x) * 0.08
      y += (targetY - y) * 0.08

      const nx = (targetX / window.innerWidth - 0.5) * 2
      const ny = (targetY / window.innerHeight - 0.5) * 2

      root.style.setProperty('--cx', `${x}px`)
      root.style.setProperty('--cy', `${y}px`)
      root.style.setProperty('--px', nx.toFixed(4))
      root.style.setProperty('--py', ny.toFixed(4))

      if (Math.abs(targetX - x) < 0.25 && Math.abs(targetY - y) < 0.25) {
        running = false
        return
      }

      frame = window.requestAnimationFrame(tick)
    }

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY

      if (!running) {
        running = true
        frame = window.requestAnimationFrame(tick)
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.cancelAnimationFrame(frame)
    }
  }, [glow])

  return (
    <>
      <div className="sky" />
      {glow ? <div className="cursor-glow" /> : null}
      <div className="atmosphere" aria-hidden="true">
        {pieces.map((piece) => {
          const style: PieceStyle = {
            top: piece.top,
            left: piece.left,
            width: piece.size,
            height: piece.size,
            color: piece.color,
            '--depth': piece.depth,
            '--tilt': `${piece.tilt}deg`,
            '--piece-opacity': piece.opacity,
            '--appear-delay': `${piece.delay}s`,
            '--duration': `${piece.duration}s`,
            '--float-delay': `${piece.delay + 0.15}s`,
          }

          return (
            <span
              key={`${piece.kind}-${piece.top}-${piece.left}`}
              className={piece.optional ? 'piece is-optional' : 'piece'}
              style={style}
            >
              <span className={piece.kind === 'sparkle' ? 'piece-inner is-sparkle' : 'piece-inner'}>
                <PieceIcon piece={piece} />
              </span>
            </span>
          )
        })}
      </div>
      <div className="grain" />
    </>
  )
}
