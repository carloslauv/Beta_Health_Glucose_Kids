import { motion } from 'framer-motion'
import { FOODS } from '../../data/foods'
import { MACROS } from '../../data/macros'
import { useApp } from '../../context/AppContext'
import FoodGrid from './FoodGrid'

export default function MacroPanel({ selectedFoods, onToggle }) {
  const { state, dispatch } = useApp()
  const { selectedMacroTab } = state

  const activeMacro = MACROS.find(m => m.id === selectedMacroTab) ?? MACROS[0]
  const foodsForTab = FOODS.filter(f => f.category === selectedMacroTab)

  return (
    <div className="flex flex-col gap-3">
      {/* Macro tabs */}
      <div className="flex gap-2 flex-wrap">
        {MACROS.map(macro => {
          const isActive = macro.id === selectedMacroTab
          const countSelected = FOODS.filter(f => f.category === macro.id && selectedFoods.includes(f.id)).length
          return (
            <motion.button
              key={macro.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => dispatch({ type: 'SET_MACRO_TAB', payload: macro.id })}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 font-semibold text-sm transition-all ${
                isActive ? macro.activeClass : macro.bgClass
              } ${isActive ? 'shadow-sm' : ''}`}
            >
              <span className="text-lg">{macro.emoji}</span>
              <span>{macro.name}</span>
              {countSelected > 0 && (
                <span className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {countSelected}
                </span>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Tab description */}
      <p className="text-sm text-gray-500 italic">{activeMacro.description}</p>

      {/* Food grid for active tab */}
      <FoodGrid
        foods={foodsForTab}
        selectedFoods={selectedFoods}
        onToggle={onToggle}
      />
    </div>
  )
}
