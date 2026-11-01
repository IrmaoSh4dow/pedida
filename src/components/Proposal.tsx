import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { proposalCopy } from '../config/detector.ts'
import { softEase } from '../lib/ease.ts'

export function Proposal() {
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? proposalCopy.lines.length : 0)
  const moment = 3

  useEffect(() => {
    if (reduce || shown >= proposalCopy.lines.length) return
    const wait = shown === 0 ? 450 : 1350
    const id = window.setTimeout(() => setShown((count) => count + 1), wait)
    return () => window.clearTimeout(id)
  }, [reduce, shown])

  useEffect(() => {
    if (shown < proposalCopy.lines.length) return
    document.getElementById('cierre')?.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'center',
    })
  }, [reduce, shown])

  return (
    <motion.div
      className="game proposal"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: softEase }}
    >
      <div className="sheet proposal-sheet">
        <div className="proposal-lines">
          {proposalCopy.lines.slice(0, shown).map((line, index) => (
            <motion.p
              key={line}
              id={index === proposalCopy.lines.length - 1 ? 'cierre' : undefined}
              className={index === moment ? 'proposal-line is-moment' : 'proposal-line'}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: softEase }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {shown > moment ? (
          <motion.div
            className="glow-heart"
            initial={reduce ? false : { scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: softEase }}
            aria-hidden="true"
          >
            <Heart size={42} fill="currentColor" strokeWidth={1.5} />
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  )
}
