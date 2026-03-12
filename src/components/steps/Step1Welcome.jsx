import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'

const FACTS = [
  { emoji: '🍬', text: 'Candy spikes your blood sugar in under 15 minutes!' },
  { emoji: '🥦', text: 'Vegetables slow down ALL other foods you eat with them!' },
  { emoji: '⏰', text: '3 meals a day is much healthier than snacking all the time!' },
  { emoji: '💪', text: 'Protein and fat barely affect your blood sugar at all!' },
]

export default function Step1Welcome() {
  const { dispatch } = useApp()

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-6 max-w-xl mx-auto w-full text-center min-h-[60vh]">
      {/* Hero */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-7xl"
      >
        🍎
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight">
          Glucose Explorer
        </h1>
        <p className="text-lg text-purple-600 font-bold mt-1">
          Learn how food affects your body! 🧪
        </p>
      </motion.div>

      {/* Animated facts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
      >
        {FACTS.map((fact, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.15 }}
            className="bg-white rounded-xl border-2 border-gray-200 p-3 flex items-start gap-2.5 text-left shadow-sm"
          >
            <span className="text-2xl flex-shrink-0">{fact.emoji}</span>
            <p className="text-sm text-gray-700 font-medium leading-snug">{fact.text}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* What you'll learn */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-4 w-full text-left"
      >
        <p className="font-bold text-purple-800 mb-2.5 text-sm uppercase tracking-wide">In this app you will:</p>
        <div className="space-y-1.5 text-sm text-purple-700">
          <p>🍽️ <strong>Build your plate</strong> and choose foods</p>
          <p>🕐 <strong>Choose how often</strong> you eat per day</p>
          <p>📈 <strong>Watch your blood sugar</strong> spike (or not!)</p>
          <p>💜 <strong>See insulin</strong> respond and cause fat storage</p>
          <p>⚖️ <strong>Compare two eating styles</strong> side-by-side</p>
        </div>
      </motion.div>

      {/* Start button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.7, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => dispatch({ type: 'SET_STEP', payload: 2 })}
        className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xl px-10 py-4 rounded-2xl shadow-lg shadow-purple-200 transition-colors"
      >
        Let's Start! 🚀
      </motion.button>
    </div>
  )
}
