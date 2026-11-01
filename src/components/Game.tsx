import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import {
  comfortReplies,
  gameCopy,
  progressLabel,
  sentences,
  splitSentence,
  wrongReplies,
} from '../config/content.ts'
import { isAccepted } from '../lib/answer.ts'
import { softEase } from '../lib/ease.ts'
import { Sparkle } from './illustrations.tsx'
import { Celebration } from './Celebration.tsx'
import { HeartBurst } from './HeartBurst.tsx'

function pickReply(pool: readonly string[], previous: string | null) {
  const choices = pool.filter((reply) => reply !== previous)
  const source = choices.length > 0 ? choices : pool
  const index = Math.floor(Math.random() * source.length)
  return source[index] ?? pool[0] ?? ''
}

function Progress({ index, solved }: { index: number; solved: boolean }) {
  return (
    <div className="progress" role="group" aria-label={progressLabel(index + 1, sentences.length)}>
      <p className="progress-label">{progressLabel(index + 1, sentences.length)}</p>
      <div className="progress-hearts">
        {sentences.map((sentence, heart) => {
          const filled = heart < index || (heart === index && solved)
          const current = heart === index && !solved

          return (
            <Heart
              key={sentence.id}
              size={18}
              strokeWidth={1.75}
              className={filled ? 'heart-filled' : current ? 'heart-current' : 'heart-empty'}
              fill={filled ? 'currentColor' : 'none'}
              aria-hidden="true"
            />
          )
        })}
      </div>
    </div>
  )
}

export function Game({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0)
  const [value, setValue] = useState('')
  const [phase, setPhase] = useState<'playing' | 'solved'>('playing')
  const [note, setNote] = useState<string | null>(null)
  const [misses, setMisses] = useState(0)
  const [wrongAttempt, setWrongAttempt] = useState(0)
  const [done, setDone] = useState(false)
  const fieldRef = useRef<HTMLDivElement>(null)

  const sentence = sentences[index]!
  const parts = splitSentence(sentence)
  const isLast = index === sentences.length - 1

  useEffect(() => {
    const field = fieldRef.current
    if (!field || wrongAttempt === 0) return

    field.classList.remove('is-shaking')
    void field.offsetWidth
    field.classList.add('is-shaking')
  }, [wrongAttempt])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (phase === 'solved') return

    if (isAccepted(value, sentence.answers)) {
      setPhase('solved')
      setNote(sentence.success)
      return
    }

    const nextMiss = misses + 1
    setMisses(nextMiss)
    setWrongAttempt((attempt) => attempt + 1)
    setNote(pickReply(nextMiss >= 3 ? comfortReplies : wrongReplies, note))
  }

  function advance() {
    if (isLast) {
      setDone(true)
      return
    }

    setIndex((current) => current + 1)
    setValue('')
    setPhase('playing')
    setNote(null)
    setMisses(0)
    setWrongAttempt(0)
  }

  return (
    <motion.div
      className="game"
      initial={{ opacity: 1, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: softEase }}
    >
      <AnimatePresence mode="wait">
        {done ? (
          <Celebration key="celebration" onContinue={onComplete} />
        ) : (
          <motion.div
            key="play"
            className="sheet"
            exit={{ opacity: 0, y: -12, transition: { duration: 0.35 } }}
          >
            <Progress index={index} solved={phase === 'solved'} />

            <div className="eyebrow">
              <Sparkle className="eyebrow-icon" />
              <h1 className="kicker">{gameCopy.kicker}</h1>
              <Sparkle className="eyebrow-icon" />
            </div>

            <p className="lead">{gameCopy.lead}</p>

            <AnimatePresence mode="wait">
              <motion.div
                key={sentence.id}
                className={phase === 'solved' ? 'question is-solved' : 'question'}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: softEase }}
              >
                <p className="sentence" id="oracion">
                  <span className="sr-only">
                    {phase === 'solved'
                      ? sentence.text
                      : `${parts.before} espacio en blanco ${parts.after}`}
                  </span>
                  <span aria-hidden="true">
                    <span className="guillemet">«</span>
                    {parts.before}
                    {phase === 'solved' ? (
                      <motion.span
                        className="blank is-revealed"
                        initial={{ opacity: 0, y: 8, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.45, ease: softEase }}
                      >
                        {sentence.hidden}
                      </motion.span>
                    ) : (
                      <span className="blank" />
                    )}
                    {parts.after}
                    <span className="guillemet">»</span>
                  </span>
                </p>

                {phase === 'playing' ? (
                  <form className="answer-form" onSubmit={submit} noValidate>
                    <div className="field" ref={fieldRef}>
                      <label className="field-label" htmlFor="respuesta">
                        {gameCopy.fieldLabel}
                      </label>
                      <input
                        id="respuesta"
                        className="answer"
                        type="text"
                        value={value}
                        placeholder={gameCopy.placeholder}
                        aria-describedby="oracion"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        enterKeyHint="done"
                        maxLength={48}
                        onFocus={(event) => {
                          window.setTimeout(() => {
                            event.target.scrollIntoView({ block: 'center', behavior: 'smooth' })
                          }, 280)
                        }}
                        onChange={(event) => setValue(event.target.value)}
                      />
                    </div>

                    <button className="btn" type="submit" disabled={!value.trim()}>
                      <span>{gameCopy.check}</span>
                      <Heart className="btn-heart" size={18} strokeWidth={2.25} aria-hidden="true" />
                    </button>
                  </form>
                ) : (
                  <button type="button" className="btn btn-solid" onClick={advance}>
                    <span>{isLast ? gameCopy.finale : gameCopy.next}</span>
                    <Heart className="btn-heart" size={18} strokeWidth={2.25} aria-hidden="true" />
                  </button>
                )}

                <div className="feedback" aria-live="polite">
                  <AnimatePresence mode="wait">
                    {note ? (
                      <motion.p
                        key={note}
                        className={phase === 'solved' ? 'note note-love' : 'note'}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.35, ease: softEase }}
                      >
                        {note}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>

                {phase === 'solved' ? <HeartBurst /> : null}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
