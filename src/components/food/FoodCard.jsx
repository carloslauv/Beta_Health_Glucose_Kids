import { motion } from 'framer-motion'
import { GIBadge } from '../ui/Badge'
import { giToColor } from '../../utils/colorUtils'

export default function FoodCard({ food, selected, onToggle }) {
  const { dot } = giToColor(food.glycemicIndex)

  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => onToggle(food.id)}
      className={`relative flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 text-center transition-all cursor-pointer w-full ${
        selected
          ? 'border-purple-500 bg-purple-50 shadow-md shadow-purple-100'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      {/* Selected check */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1.5 right-1.5 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-xs font-bold">✓</span>
        </motion.div>
      )}

      {/* Food emoji */}
      <span className="text-3xl leading-none">{food.emoji}</span>

      {/* Name */}
      <span className={`text-xs font-semibold leading-tight ${selected ? 'text-purple-700' : 'text-gray-700'}`}>
        {food.name}
      </span>

      {/* GI Badge */}
      <GIBadge gi={food.glycemicIndex} />
    </motion.button>
  )
}
