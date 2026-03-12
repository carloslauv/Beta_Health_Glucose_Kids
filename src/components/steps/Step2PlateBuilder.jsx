import { useApp, useActiveScenario } from '../../context/AppContext'
import SectionHeading from '../ui/SectionHeading'
import MacroPanel from '../food/MacroPanel'
import PlateDisplay from '../food/PlateDisplay'
import GlycemicIndexLegend from '../food/GlycemicIndexLegend'
import NavButtons from '../layout/NavButtons'
import { FOOD_BY_ID } from '../../data/foods'
import { motion, AnimatePresence } from 'framer-motion'

export default function Step2PlateBuilder() {
  const { dispatch } = useApp()
  const scenario = useActiveScenario()
  const { selectedFoods } = scenario

  function toggleFood(id) {
    dispatch({ type: 'TOGGLE_FOOD', payload: id })
  }

  // Show fun fact for last selected food
  const lastFood = selectedFoods.length > 0
    ? FOOD_BY_ID[selectedFoods[selectedFoods.length - 1]]
    : null

  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full px-4 pb-2">
      <SectionHeading
        emoji="🍽️"
        title="Build Your Plate!"
        subtitle="Tap foods to add them to your plate. Mix different types to see what happens to your blood sugar!"
      />

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left: food selector */}
        <div className="flex-1 min-w-0">
          <MacroPanel selectedFoods={selectedFoods} onToggle={toggleFood} />
        </div>

        {/* Right: plate + legend */}
        <div className="flex flex-col items-center gap-4 lg:w-52">
          <PlateDisplay selectedFoodIds={selectedFoods} />

          {selectedFoods.length > 0 && (
            <button
              onClick={() => dispatch({ type: 'RESET_SCENARIO' })}
              className="text-xs text-red-500 hover:text-red-700 font-semibold underline"
            >
              Clear plate
            </button>
          )}
        </div>
      </div>

      {/* GI legend */}
      <div className="bg-gray-50 rounded-xl p-3">
        <GlycemicIndexLegend />
      </div>

      {/* Fun fact */}
      <AnimatePresence mode="wait">
        {lastFood && (
          <motion.div
            key={lastFood.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-800"
          >
            <span className="font-bold">{lastFood.emoji} Did you know?</span> {lastFood.funFact}
          </motion.div>
        )}
      </AnimatePresence>

      <NavButtons
        canGoNext={selectedFoods.length > 0}
        nextLabel={selectedFoods.length === 0 ? 'Pick a food first!' : 'Next →'}
      />
    </div>
  )
}
