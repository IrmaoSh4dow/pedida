import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion'
import { Atmosphere } from './components/Atmosphere.tsx'
import { Detector } from './components/Detector.tsx'
import { Game } from './components/Game.tsx'
import { Proposal } from './components/Proposal.tsx'
import { Quiz } from './components/Quiz.tsx'
import { Welcome } from './components/Welcome.tsx'
import { softEase } from './lib/ease.ts'

type Screen = 'welcome' | 'game' | 'quiz' | 'detector' | 'proposal'

export default function App() {
  const reduce = useReducedMotion()
  const [screen, setScreen] = useState<Screen>('welcome')
  const [wash, setWash] = useState(false)
  const pending = useRef<Screen>('game')

  useEffect(() => {
    if (!wash) return

    const next = pending.current
    const showNext = window.setTimeout(() => setScreen(next), 480)
    const clearWash = window.setTimeout(() => setWash(false), 860)

    return () => {
      window.clearTimeout(showNext)
      window.clearTimeout(clearWash)
    }
  }, [wash])

  function go(next: Screen) {
    if (reduce) {
      setScreen(next)
      return
    }

    pending.current = next
    setWash(true)
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className={screen === 'proposal' ? 'scene-finale' : undefined}>
        <Atmosphere />
        <main>
          <AnimatePresence mode="wait">
            {screen === 'welcome' ? <Welcome key="welcome" onStart={() => go('game')} /> : null}
            {screen === 'game' ? <Game key="game" onComplete={() => go('quiz')} /> : null}
            {screen === 'quiz' ? <Quiz key="quiz" onComplete={() => go('detector')} /> : null}
            {screen === 'detector' ? <Detector key="detector" onComplete={() => go('proposal')} /> : null}
            {screen === 'proposal' ? <Proposal key="proposal" /> : null}
          </AnimatePresence>
        </main>

        <AnimatePresence>
          {wash ? (
            <motion.div
              key="wash"
              className="wash-layer"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: softEase }}
              aria-hidden="true"
            >
              <motion.div
                className="wash"
                initial={{ scale: 0.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.64, ease: softEase }}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}
