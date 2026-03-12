import { useApp } from '../../lib/context/AppContext'
import { useGlucoseCurve } from '../../lib/hooks/useGlucoseCurve'
import { useInsulinCurve } from '../../lib/hooks/useInsulinCurve'
import { useFatAccumulation } from '../../lib/hooks/useFatAccumulation'
import { peakGlucose, peakInsulin, insulinLoadLabel } from '../../lib/data/scienceEngine'
import { insulinLoadPercent } from '../../lib/utils/curveUtils'
import { FOOD_BY_ID } from '../../lib/data/foods'
import GlucoseChart from '../charts/GlucoseChart'
import InsulinChart from '../charts/InsulinChart'
import BodySilhouette from '../body/BodySilhouette'
import MacroPanel from '../food/MacroPanel'
import SliderInput from '../ui/SliderInput'
import { motion } from 'framer-motion'

export default function ScenarioPanel({ scenarioKey, label, color }) {
  const { state, dispatch } = useApp()
  const scenario = state[scenarioKey === 'A' ? 'scenarioA' : 'scenarioB']
  const { selectedFoods, mealsPerDay } = scenario
  const { timelineWeeks } = state

  const isActive = state.activeScenario === scenarioKey

  const glucoseData = useGlucoseCurve(selectedFoods, mealsPerDay)
  const insulinData = useInsulinCurve(glucoseData)
  const fatScore = useFatAccumulation(insulinData, timelineWeeks)

  const maxGlucose = peakGlucose(glucoseData)
  const maxInsulin = peakInsulin(insulinData)
  const loadPct = insulinLoadPercent(insulinData)
  const loadScore = Math.round(loadPct * 0.8 + (maxInsulin / 200) * 20)
  const { label: loadLabel, color: loadColor } = insulinLoadLabel(loadScore)

  const selectedFoodObjects = selectedFoods.map(id => FOOD_BY_ID[id]).filter(Boolean)

  function toggleFood(id) {
    const prevActive = state.activeScenario
    dispatch({ type: 'SET_ACTIVE_SCENARIO', payload: scenarioKey })
    dispatch({ type: 'TOGGLE_FOOD', payload: id })
    dispatch({ type: 'SET_ACTIVE_SCENARIO', payload: prevActive })
  }

  function setMeals(v) {
    const prevActive = state.activeScenario
    dispatch({ type: 'SET_ACTIVE_SCENARIO', payload: scenarioKey })
    dispatch({ type: 'SET_MEALS', payload: v })
    dispatch({ type: 'SET_ACTIVE_SCENARIO', payload: prevActive })
  }

  return (
    <div
      className={`flex-1 min-w-0 rounded-2xl border-2 p-4 flex flex-col gap-3 transition-all ${
        color === 'blue'
          ? 'border-blue-300 bg-blue-50'
          : 'border-orange-300 bg-orange-50'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-extrabold ${color === 'blue' ? 'bg-blue-500' : 'bg-orange-500'}`}>
          {scenarioKey}
        </span>
        <h3 className="font-extrabold text-gray-800 text-base">{label}</h3>
      </div>

      {/* Food selector (compact) */}
      <div className="bg-white rounded-xl p-3 border border-gray-200">
        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Foods selected</p>
        {selectedFoodObjects.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No foods selected yet</p>
        ) : (
          <div className="flex flex-wrap gap-1">
            {selectedFoodObjects.map(f => (
              <span key={f.id} className="text-lg" title={f.name}>{f.emoji}</span>
            ))}
          </div>
        )}
        <button
          onClick={() => {
            dispatch({ type: 'SET_ACTIVE_SCENARIO', payload: scenarioKey })
            dispatch({ type: 'SET_STEP', payload: 2 })
          }}
          className={`mt-2 text-xs font-semibold underline ${color === 'blue' ? 'text-blue-600' : 'text-orange-600'}`}
        >
          {selectedFoodObjects.length === 0 ? 'Select foods →' : 'Change foods →'}
        </button>
      </div>

      {/* Meals */}
      <div className="bg-white rounded-xl p-3 border border-gray-200">
        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
          Meals per day: <span className={`font-extrabold ${color === 'blue' ? 'text-blue-700' : 'text-orange-700'}`}>{mealsPerDay}</span>
        </p>
        <SliderInput value={mealsPerDay} min={1} max={6} onChange={setMeals} />
      </div>

      {/* Glucose chart */}
      <div className="bg-white rounded-xl p-2 border border-gray-200">
        <p className="text-xs font-semibold text-gray-500 mb-1">Blood Glucose</p>
        <GlucoseChart data={glucoseData} animated={false} />
      </div>

      {/* Insulin chart */}
      <div className="bg-white rounded-xl p-2 border border-gray-200">
        <p className="text-xs font-semibold text-gray-500 mb-1">Insulin</p>
        <InsulinChart data={insulinData} animated={false} />
      </div>

      {/* Body + score */}
      <div className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-200">
        <BodySilhouette fatScore={fatScore} />
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-500 font-semibold">Fat Score</p>
          <p className={`text-2xl font-extrabold ${loadColor}`}>{fatScore}<span className="text-sm">/100</span></p>
          <p className={`text-xs font-bold ${loadColor}`}>{loadLabel}</p>
        </div>
      </div>
    </div>
  )
}
