import { motion, useReducedMotion } from 'framer-motion'
import { Heart } from 'lucide-react'

const hearts = [
  { x: -86, rise: -92, size: 15, delay: 0, color: '#c23a4b', fill: true },
  { x: 78, rise: -108, size: 13, delay: 0.06, color: '#c48998', fill: true },
  { x: -24, rise: -74, size: 10, delay: 0.1, color: '#b7a3d6', fill: true },
  { x: 28, rise: -118, size: 16, delay: 0.02, color: '#c23a4b', fill: true },
  { x: -124, rise: -68, size: 11, delay: 0.14, color: '#e7b4c2', fill: false },
  { x: 116, rise: -82, size: 12, delay: 0.08, color: '#a35d70', fill: true },
  { x: 2, rise: -96, size: 9, delay: 0.16, color: '#b7a3d6', fill: false },
  { x: 52, rise: -58, size: 8, delay: 0.12, color: '#c23a4b', fill: true },
]

export function HeartBurst() {
  const reduce = useReducedMotion()

  if (reduce) return null

  return (
    <div className="burst" aria-hidden="true">
      {hearts.map((heart) => (
        <motion.span
          key={`${heart.x}-${heart.delay}`}
          className="burst-heart"
          style={{
            color: heart.color,
            left: `calc(50% + ${heart.x}px)`,
            top: '38%',
          }}
          initial={{ opacity: 0, y: 8, scale: 0.35, rotate: -10 }}
          animate={{ opacity: [0, 1, 1, 0], y: heart.rise, scale: 1, rotate: 8 }}
          transition={{ duration: 1.45, delay: heart.delay, ease: 'easeOut' }}
        >
          <Heart
            size={heart.size}
            fill={heart.fill ? 'currentColor' : 'none'}
            strokeWidth={1.75}
          />
        </motion.span>
      ))}
    </div>
  )
}
