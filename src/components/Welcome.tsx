import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { welcome } from '../config/content.ts'
import { softEase } from '../lib/ease.ts'
import { LoveSeal, Swoosh } from './illustrations.tsx'

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: softEase },
  },
}

type WelcomeProps = {
  onStart: () => void
}

export function Welcome({ onStart }: WelcomeProps) {
  const lock = useRef(false)
  const lines = welcome.title.split('\n')

  function handleStart() {
    if (lock.current) return
    lock.current = true
    onStart()
  }

  return (
    <motion.section
      className="welcome"
      variants={{
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
      }}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -12, transition: { duration: 0.28 } }}
    >
      <div className="hero">
        <motion.div className="seal-wrap" variants={item}>
          <LoveSeal className="seal" />
        </motion.div>

        <motion.p className="whisper" variants={item}>
          {welcome.whisper}
        </motion.p>

        <motion.h1 className="title" variants={item}>
          {lines.map((line) => (
            <span className="title-line" key={line}>
              {line}
            </span>
          ))}
        </motion.h1>

        <motion.div variants={item}>
          <Swoosh className="swoosh" />
        </motion.div>

        <motion.p className="subtitle" variants={item}>
          {welcome.subtitle}
        </motion.p>

        <motion.div variants={item}>
          <button type="button" className="btn" onClick={handleStart}>
            <span>{welcome.button}</span>
            <Heart className="btn-heart" size={18} strokeWidth={2.25} aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  )
}
