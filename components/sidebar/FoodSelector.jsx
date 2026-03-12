'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FOODS } from '../../lib/data/foods'
import { MACROS } from '../../lib/data/macros'
import { useApp } from '../../lib/context/AppContext'
import { giToColor } from '../../lib/utils/colorUtils'

const GI_DOT_COLOR = {
  green: 'bg-emerald-500',
  yellow: 'bg-amber-500',
  red: 'bg-red-500',
}

function FoodChip({ food, selected, onToggle }) {
  const { dot } = giToColor(food.glycemicIndex)
  const dotClass = dot.replace('bg-', '')  // e.g. "green-500"

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={() => onToggle(food.id)}
      title={food.funFact}
      className={`flex flex-col items-start gap-0.5 p-2.5 rounded-lg border text-left cursor-pointer transition-all w-full ${
        selected
          ? 'border-indigo-500 bg-indigo-50'
          : 'border-zinc-200 bg-white hover:border-zinc-300'
      }`}
    >
      <span className="text-xl leading-none">{food.emoji}</span>
      <span className={`text-xs font-medium leading-tight mt-1 ${selected ? 'text-indigo-700' : 'text-zinc-700'}`}>
        {food.name}
      </span>
      {food.glycemicIndex > 0 ? (
        <div className="flex items-center gap-1 mt-0.5">
          <span className={`w-1.5 h-1.5 rounded-full inline-block ${dot}`} />
          <span className={`text-[10px] ${selected ? 'text-indigo-500' : 'text-zinc-400'}`}>
            GI {food.glycemicIndex}
          </span>
        </div>
      ) : (
        <span className="text-[10px] text-zinc-400 mt-0.5">No GI</span>
      )}
    </motion.button>
  )
}

export default function FoodSelector({ scenario, selectedFoods, onToggle }) {
  const { state, dispatch } = useApp()
  const { selectedMacroTab } = state
  const activeMacro = MACROS.find(m => m.id === selectedMacroTab) ?? MACROS[0]
  const foodsForTab = FOODS.filter(f => f.category === selectedMacroTab)

  return (
    <div className="flex flex-col gap-3">
      {/* Section label */}
      <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">Foods</p>

      {/* Underline tabs */}
      <div className="flex border-b border-zinc-200">
        {MACROS.map(macro => {
          const isActive = macro.id === selectedMacroTab
          const count = FOODS.filter(f => f.category === macro.id && selectedFoods.includes(f.id)).length
          return (
            <button
              key={macro.id}
              onClick={() => dispatch({ type: 'SET_MACRO_TAB', payload: macro.id })}
              className={`relative pb-2 px-2.5 text-xs font-medium transition-colors flex items-center gap-1 ${
                isActive ? 'text-indigo-600' : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              {macro.name.replace('Healthy ', '')}
              {count > 0 && (
                <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {count}
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Food grid */}
      <div className="grid grid-cols-3 gap-1.5">
        <AnimatePresence mode="wait">
          {foodsForTab.map(food => (
            <FoodChip
              key={food.id}
              food={food}
              selected={selectedFoods.includes(food.id)}
              onToggle={onToggle}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Clear */}
      {selectedFoods.length > 0 && (
        <button
          onClick={() => dispatch({ type: 'RESET_SCENARIO', scenario })}
          className="text-xs text-zinc-400 hover:text-red-500 transition-colors text-left"
        >
          Clear selection
        </button>
      )}
    </div>
  )
}
