import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import {
  quizCopy,
  quizProgressLabel,
  quizQuestions,
  type QuizOption,
  type QuizQuestion,
} from '../config/quiz.ts'
import { softEase } from '../lib/ease.ts'
import { HeartBurst } from './HeartBurst.tsx'
import { Sparkle } from './illustrations.tsx'

const step = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

function optionClass(
  question: QuizQuestion,
  option: QuizOption,
  picked: string | null,
  selected: readonly string[],
) {
  if (question.special) {
    return selected.includes(option.id) ? 'choice is-soft' : 'choice'
  }

  if (!picked) return 'choice'

  const correct = question.correctId === option.id
  if (picked === option.id && correct) return 'choice is-right'
  if (picked === option.id) return 'choice is-soft is-shaking'
  if (correct) return 'choice is-answer'
  return 'choice is-quiet'
}

function QuestionRound({ onFinish }: { onFinish: () => void }) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [selected, setSelected] = useState<string[]>([])
  const question = quizQuestions[index]!
  const total = quizQuestions.length
  const label = quizProgressLabel(index + 1, total)
  const revealed = question.special ? selected.length === question.options.length : picked !== null

  function choose(optionId: string) {
    if (question.special) {
      if (revealed || selected.includes(optionId)) return
      setSelected((current) => [...current, optionId])
      return
    }

    if (picked) return
    setPicked(optionId)
  }

  function advance() {
    if (!revealed) return
    if (index === total - 1) {
      onFinish()
      return
    }
    setIndex((current) => current + 1)
    setPicked(null)
    setSelected([])
  }

  return (
    <motion.div
      key="questions"
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
          key={question.id}
          className="quiz-step"
          initial={step.initial}
          animate={step.animate}
          exit={step.exit}
          transition={{ duration: 0.42, ease: softEase }}
        >
          <h1 className="quiz-prompt">
            {question.prompt}
            {question.id === 'luke' ? <span className="quiz-emoji" aria-hidden="true"> 🦸</span> : null}
          </h1>

          <AnimatePresence mode="wait">
            {question.special && revealed ? (
              <motion.div
                key="reveal"
                className="amour"
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.55, ease: softEase }}
              >
                <p className="amour-lead">{question.revealLead}</p>
                <p className="amour-word">
                  {question.revealWord}
                  <Heart className="amour-heart" size={28} fill="currentColor" strokeWidth={1.75} aria-hidden="true" />
                </p>
                <HeartBurst />
              </motion.div>
            ) : (
              <motion.div
                key="options"
                className="choices"
                role="group"
                aria-label="Opciones"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
              >
                {question.options.map((option) => {
                  const chosen = question.special ? selected.includes(option.id) : picked === option.id
                  const correct = !question.special && question.correctId === option.id

                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={optionClass(question, option, picked, selected)}
                      onClick={() => choose(option.id)}
                      disabled={question.special ? chosen : revealed}
                      aria-pressed={chosen}
                    >
                      <span>{option.label}</span>
                      {revealed && correct ? (
                        <Heart className="choice-heart" size={16} fill="currentColor" strokeWidth={1.75} aria-hidden="true" />
                      ) : null}
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="feedback" aria-live="polite">
            <AnimatePresence mode="wait">
              {question.special && selected.length > 0 && !revealed ? (
                <motion.p
                  key="pending"
                  className="note"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: softEase }}
                >
                  {question.pending}
                </motion.p>
              ) : null}
              {revealed && !question.special ? (
                <motion.p
                  key={picked}
                  className={question.correctId === picked ? 'note note-love' : 'note'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: softEase }}
                >
                  {question.correctId === picked ? question.success : question.wrong}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>

          {revealed ? (
            <button type="button" className="btn btn-solid" onClick={advance}>
              <span>{quizCopy.next}</span>
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
      key="intro"
      className="sheet quiz-intro"
      initial={step.initial}
      animate={step.animate}
      exit={step.exit}
      transition={{ duration: 0.5, ease: softEase }}
    >
      <div className="eyebrow">
        <Sparkle className="eyebrow-icon" />
        <p className="kicker">entre tú y yo</p>
        <Sparkle className="eyebrow-icon" />
      </div>
      <h1 className="quiz-title">
        {quizCopy.title}
        <span className="quiz-emoji" aria-hidden="true"> 💗</span>
      </h1>
      <p className="lead">{quizCopy.description}</p>
      <button type="button" className="btn" onClick={onStart}>
        <span>{quizCopy.start}</span>
        <Heart className="btn-heart" size={18} strokeWidth={2.25} aria-hidden="true" />
      </button>
    </motion.div>
  )
}

function Finale({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.section
      key="finale"
      className="celebration quiz-finale"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.55, ease: softEase }}
    >
      <div className="celebration-mark" aria-hidden="true">
        <Sparkle className="eyebrow-icon" />
        <Heart className="heart-filled" size={28} fill="currentColor" strokeWidth={1.75} />
        <Sparkle className="eyebrow-icon" />
      </div>
      <h1 className="quiz-finale-title">{quizCopy.finale}</h1>
      <p className="quiz-heart-note" aria-hidden="true">💗</p>
      <button type="button" className="btn btn-solid btn-wide" onClick={onContinue}>
        <span>{quizCopy.finaleButton}</span>
        <Heart className="btn-heart" size={18} strokeWidth={2.25} aria-hidden="true" />
      </button>
    </motion.section>
  )
}

export function Quiz({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'intro' | 'question' | 'finale'>('intro')

  return (
    <motion.div
      className="game"
      initial={{ opacity: 1, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: softEase }}
    >
      <AnimatePresence mode="wait">
        {phase === 'intro' ? <Intro key="intro" onStart={() => setPhase('question')} /> : null}
        {phase === 'question' ? <QuestionRound key="questions" onFinish={() => setPhase('finale')} /> : null}
        {phase === 'finale' ? <Finale key="finale" onContinue={onComplete} /> : null}
      </AnimatePresence>
    </motion.div>
  )
}
