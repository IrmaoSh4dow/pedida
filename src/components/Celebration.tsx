import { motion, useReducedMotion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { celebration } from '../config/content.ts'
import { softEase } from '../lib/ease.ts'

const rain = [
  { left: '8%', delay: 0.05, duration: 4.6, size: 14, drift: -16 },
  { left: '18%', delay: 0.45, duration: 5.1, size: 11, drift: 12 },
  { left: '28%', delay: 0.15, duration: 4.2, size: 16, drift: -8 },
  { left: '40%', delay: 0.7, duration: 5.4, size: 10, drift: 18 },
  { left: '52%', delay: 0.2, duration: 4.8, size: 15, drift: -14 },
  { left: '63%', delay: 0.55, duration: 5.2, size: 12, drift: 10 },
  { left: '74%', delay: 0.1, duration: 4.4, size: 18, drift: -12 },
  { left: '86%', delay: 0.35, duration: 5, size: 13, drift: 16 },
  { left: '12%', delay: 1.05, duration: 4.9, size: 9, drift: 8 },
  { left: '34%', delay: 1.2, duration: 5.3, size: 12, drift: -18 },
  { left: '58%', delay: 0.95, duration: 4.5, size: 10, drift: 6 },
  { left: '80%', delay: 1.15, duration: 5.1, size: 15, drift: -10 },
  { left: '48%', delay: 1.4, duration: 4.7, size: 8, drift: 14 },
  { left: '22%', delay: 1.55, duration: 5.2, size: 13, drift: -6 },
]

export function Celebration({ onContinue }: { onContinue?: () => void }) {
  const reduce = useReducedMotion()

  return (
    <motion.section
      className="celebration"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: softEase }}
    >
      {!reduce && (
        <div className="rain" aria-hidden="true">
          {rain.map((heart) => (
            <motion.span
              key={`${heart.left}-${heart.delay}`}
              className="rain-heart"
              style={{ left: heart.left, color: heart.delay > 0.8 ? '#c48998' : '#c23a4b' }}
              initial={{ opacity: 0, y: 30, x: 0 }}
              animate={{ opacity: [0, 1, 1, 0], y: -560, x: heart.drift }}
              transition={{ duration: heart.duration, delay: heart.delay, ease: 'easeOut' }}
            >
              <Heart size={heart.size} fill="currentColor" strokeWidth={1.6} />
            </motion.span>
          ))}
        </div>
      )}

      <p className="kicker celebration-kicker">{celebration.kicker}</p>

      <div className="celebration-mark" aria-hidden="true">
        <Sparkles size={18} />
        <Heart className="heart-filled" size={28} fill="currentColor" strokeWidth={1.75} />
        <Sparkles size={18} />
      </div>

      <h1 className="celebration-title">{celebration.title}</h1>
      <p className="celebration-message">{celebration.message}</p>

      <motion.p
        className="closing"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: reduce ? 0 : 1.25, ease: softEase }}
      >
        {celebration.closing}
      </motion.p>

      {onContinue ? (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: reduce ? 0 : 1.8, ease: softEase }}
        >
          <button type="button" className="btn" onClick={onContinue}>
            <span>{celebration.continue}</span>
            <Heart className="btn-heart" size={18} strokeWidth={2.25} aria-hidden="true" />
          </button>
        </motion.div>
      ) : null}
    </motion.section>
  )
}
