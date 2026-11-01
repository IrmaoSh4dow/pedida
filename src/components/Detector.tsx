import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Heart } from 'lucide-react'
import {
  detectorCopy,
  detectorProgressLabel,
  statements,
} from '../config/detector.ts'
import { softEase } from '../lib/ease.ts'
import { LieDetectorArt } from './LieDetectorArt.tsx'

const step = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

type Answer = 'true' | 'false'
type Status = 'choosing' | 'scanning' | 'result'

function Round({ onFinish }: { onFinish: () => void }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [status, setStatus] = useState<Status>('choosing')
  const [answer, setAnswer] = useState<Answer | null>(null)
  const statement = statements[index]!
  const total = statements.length
  const label = detectorProgressLabel(index + 1, total)

  useEffect(() => {
    if (status !== 'scanning') return
    const wait = reduce ? 180 : 1500
    const id = window.setTimeout(() => setStatus('result'), wait)
    return () => window.clearTimeout(id)
  }, [reduce, status])

  function choose(next: Answer) {
    if (status !== 'choosing') return
    setAnswer(next)
    setStatus('scanning')
  }

  function advance() {
    if (status !== 'result') return
    if (index === total - 1) {
      onFinish()
      return
    }
    setIndex((current) => current + 1)
    setAnswer(null)
    setStatus('choosing')
  }

  const mode = status === 'scanning' ? 'scan' : status === 'result' && answer === 'false' ? 'lie' : status === 'result' ? 'true' : 'idle'

  return (
    <motion.div
      className="sheet"
      initial={step.initial}
      animate={step.animate}
      exit={step.exit}
      transition={{ duration: 0.45, ease: softEase }}
    >
      <div className="quiz-progress" role="group" aria-label={label}>
        <p className="progress-label">{label}</p>
        <div className="bar" aria-hidden="true">
          <span className="bar-fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={statement.id}
          className="quiz-step"
          initial={step.initial}
          animate={step.animate}
          exit={step.exit}
          transition={{ duration: 0.42, ease: softEase }}
        >
          <LieDetectorArt mode={mode} />
          <h1 className="quiz-prompt">{statement.text}</h1>

          {status === 'scanning' ? <p className="scan-label">{detectorCopy.scanning}</p> : null}

          {status === 'choosing' ? (
            <div className="verdict-actions">
              <button type="button" className="choice choice-true" onClick={() => choose('true')}>
                <span>{detectorCopy.trueLabel}</span>
                <Heart className="choice-heart" size={16} fill="currentColor" strokeWidth={1.75} aria-hidden="true" />
              </button>
              <button type="button" className="choice" onClick={() => choose('false')}>
                <span>{detectorCopy.falseLabel}</span>
                <Heart size={16} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          ) : null}

          <div className="feedback" aria-live="polite">
            <AnimatePresence>
              {status === 'result' ? (
                <motion.div
                  key={`${statement.id}-${answer}`}
                  className="detector-result"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: softEase }}
                >
                  {answer === 'false' ? <p className="note note-alert">{detectorCopy.lie}</p> : null}
                  <p className="truth-mark">{detectorCopy.truth}</p>
                  <p className="note note-love">{statement.reaction}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {status === 'result' ? (
            <button type="button" className="btn btn-solid" onClick={advance}>
              <span>{detectorCopy.next}</span>
              <Heart className="btn-heart" size={18} strokeWidth={2.25} aria-hidden="true" />
            </button>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      className="sheet quiz-intro"
      initial={step.initial}
      animate={step.animate}
      exit={step.exit}
      transition={{ duration: 0.5, ease: softEase }}
    >
      <LieDetectorArt mode="idle" />
      <h1 className="quiz-title">{detectorCopy.title}</h1>
      <p className="lead">
        {detectorCopy.description} <span className="quiz-emoji" aria-hidden="true">👀</span>
      </p>
      <button type="button" className="btn" onClick={onStart}>
        <span>{detectorCopy.start}</span>
        <Heart className="btn-heart" size={18} fill="currentColor" strokeWidth={2.25} aria-hidden="true" />
      </button>
    </motion.div>
  )
}

function DetectorFinale({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.section
      className="sheet quiz-intro"
      initial={step.initial}
      animate={step.animate}
      exit={step.exit}
      transition={{ duration: 0.55, ease: softEase }}
    >
      <LieDetectorArt mode="max" />
      <p className="finale-kicker">{detectorCopy.finaleKicker}</p>
      <h1 className="finale-score">{detectorCopy.finaleTitle}</h1>
      <p className="lead">{detectorCopy.finaleMessage}</p>
      <button type="button" className="btn btn-solid" onClick={onContinue}>
        <span>{detectorCopy.continue}</span>
        <Heart className="btn-heart" size={18} strokeWidth={2.25} aria-hidden="true" />
      </button>
    </motion.section>
  )
}

export function Detector({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'intro' | 'round' | 'finale'>('intro')

  return (
    <motion.div
      className="game"
      initial={{ opacity: 1, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: softEase }}
    >
      <AnimatePresence mode="wait">
        {phase === 'intro' ? <Intro key="intro" onStart={() => setPhase('round')} /> : null}
        {phase === 'round' ? <Round key="round" onFinish={() => setPhase('finale')} /> : null}
        {phase === 'finale' ? <DetectorFinale key="finale" onContinue={onComplete} /> : null}
      </AnimatePresence>
    </motion.div>
  )
}
