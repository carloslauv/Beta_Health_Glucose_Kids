import { motion } from 'framer-motion'

const STEPS = [
  { n: 1, emoji: '👋', label: 'Welcome' },
  { n: 2, emoji: '🍽️', label: 'Your Plate' },
  { n: 3, emoji: '🕐', label: 'Meal Times' },
  { n: 4, emoji: '📈', label: 'Body React' },
  { n: 5, emoji: '⏳', label: 'Long Term' },
  { n: 6, emoji: '⚖️', label: 'Compare' },
]

export default function ProgressBar({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-1 py-3 px-4 flex-wrap">
      {STEPS.map((step, idx) => {
        const isActive = step.n === currentStep
        const isDone = step.n < currentStep
        return (
          <div key={step.n} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isActive ? '#7c3aed' : isDone ? '#22c55e' : '#e5e7eb',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-sm"
                style={{ color: isActive || isDone ? 'white' : '#6b7280' }}
              >
                {isDone ? '✓' : step.emoji}
              </motion.div>
              <span className={`text-xs mt-1 font-medium hidden sm:block ${isActive ? 'text-purple-700' : isDone ? 'text-green-600' : 'text-gray-400'}`}>
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`w-6 h-1 mx-1 rounded-full mb-4 ${isDone ? 'bg-green-400' : 'bg-gray-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
