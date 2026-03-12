'use client'

import { motion } from 'framer-motion'

const MEAL_CAPTIONS = {
  1: 'One meal — extended fasting',
  2: 'Two meals — long recovery windows',
  3: 'Three meals — good insulin recovery',
  4: 'Four meals — moderate elevation',
  5: 'Five meals — limited fat burning',
  6: 'Six meals — insulin stays elevated all day',
}

const MEAL_COLORS = {
  1: 'text-emerald-600',
  2: 'text-emerald-600',
  3: 'text-emerald-600',
  4: 'text-amber-600',
  5: 'text-red-500',
  6: 'text-red-500',
}

export default function MealSegmentedControl({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">Meals per day</p>

      {/* Segmented control */}
      <div className="bg-zinc-100 rounded-lg p-1 flex gap-0.5">
        {[1, 2, 3, 4, 5, 6].map(n => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className="relative flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors z-10"
            style={{ color: value === n ? 'white' : '#71717a' }}
          >
            {value === n && (
              <motion.div
                layoutId="meal-pill"
                className="absolute inset-0 bg-indigo-600 rounded-md"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{n}</span>
          </button>
        ))}
      </div>

      {/* Caption */}
      <p className={`text-[11px] ${MEAL_COLORS[value]}`}>
        {MEAL_CAPTIONS[value]}
      </p>
    </div>
  )
}
