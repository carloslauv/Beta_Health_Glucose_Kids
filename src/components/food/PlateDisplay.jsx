import { motion, AnimatePresence } from 'framer-motion'
import { FOOD_BY_ID } from '../../data/foods'
import { MACROS } from '../../data/macros'

export default function PlateDisplay({ selectedFoodIds }) {
  const selectedFoods = selectedFoodIds.map(id => FOOD_BY_ID[id]).filter(Boolean)

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Plate circle */}
      <div className="relative w-40 h-40 sm:w-48 sm:h-48">
        {/* Plate border */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-200 bg-gray-50 shadow-inner" />
        {/* Inner food emojis */}
        {selectedFoods.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-4xl">
            🍽️
          </div>
        ) : (
          <div className="absolute inset-3 rounded-full overflow-hidden flex flex-wrap items-center justify-center gap-1 p-2">
            <AnimatePresence>
              {selectedFoods.slice(0, 9).map(food => (
                <motion.span
                  key={food.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="text-2xl"
                >
                  {food.emoji}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Macro composition pills */}
      {selectedFoods.length > 0 && (
        <div className="flex flex-wrap gap-1.5 justify-center max-w-xs">
          {MACROS.map(macro => {
            const count = selectedFoods.filter(f => f.category === macro.id).length
            if (count === 0) return null
            return (
              <span key={macro.id} className={`px-2.5 py-1 rounded-full text-xs font-semibold ${macro.badgeClass}`}>
                {macro.emoji} {count} {macro.name}
              </span>
            )
          })}
        </div>
      )}

      {selectedFoods.length === 0 && (
        <p className="text-xs text-gray-400 text-center">Pick foods from the tabs above!</p>
      )}
    </div>
  )
}
