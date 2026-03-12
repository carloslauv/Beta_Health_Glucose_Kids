'use client'

import { useApp } from '../../lib/context/AppContext'
import { useGlucoseCurve } from '../../lib/hooks/useGlucoseCurve'
import { useInsulinCurve } from '../../lib/hooks/useInsulinCurve'
import { useFatAccumulation } from '../../lib/hooks/useFatAccumulation'
import FoodSelector from './FoodSelector'
import MealSegmentedControl from './MealSegmentedControl'
import InsightCard from './InsightCard'

export default function Sidebar({ scenario = 'A' }) {
  const { state, dispatch } = useApp()
  const scenarioData = scenario === 'A' ? state.scenarioA : state.scenarioB
  const { selectedFoods, mealsPerDay } = scenarioData
  const { timelineWeeks } = state

  // Derive fat score for insight card
  const glucoseData = useGlucoseCurve(selectedFoods, mealsPerDay)
  const insulinData = useInsulinCurve(glucoseData)
  const fatScore = useFatAccumulation(insulinData, timelineWeeks)

  function toggleFood(id) {
    dispatch({ type: 'TOGGLE_FOOD_IN', payload: id, scenario })
  }

  function setMeals(v) {
    dispatch({ type: 'SET_MEALS_IN', payload: v, scenario })
  }

  return (
    <aside className="w-72 flex-shrink-0 bg-white border-r border-zinc-200 flex flex-col overflow-y-auto">
      {/* Scenario label in compare mode */}
      {state.compareMode && (
        <div className={`px-5 py-2 text-xs font-semibold border-b border-zinc-100 ${
          scenario === 'A' ? 'text-indigo-600 bg-indigo-50' : 'text-amber-600 bg-amber-50'
        }`}>
          Scenario {scenario}
        </div>
      )}

      <div className="flex flex-col gap-6 p-5 flex-1">
        <FoodSelector
          scenario={scenario}
          selectedFoods={selectedFoods}
          onToggle={toggleFood}
        />

        <div className="border-t border-zinc-100" />

        <MealSegmentedControl value={mealsPerDay} onChange={setMeals} />

        <div className="border-t border-zinc-100" />

        <InsightCard
          selectedFoodIds={selectedFoods}
          mealsPerDay={mealsPerDay}
          fatScore={fatScore}
          timelineWeeks={timelineWeeks}
        />
      </div>
    </aside>
  )
}
