import { useApp } from '../../context/AppContext'
import { useGlucoseCurve } from '../../hooks/useGlucoseCurve'
import { useInsulinCurve } from '../../hooks/useInsulinCurve'
import { useFatAccumulation } from '../../hooks/useFatAccumulation'
import { peakGlucose } from '../../data/scienceEngine'
import { insulinLoadPercent } from '../../utils/curveUtils'
import ScenarioPanel from '../compare/ScenarioPanel'
import SectionHeading from '../ui/SectionHeading'
import SliderInput from '../ui/SliderInput'
import { motion } from 'framer-motion'

export default function Step6Compare() {
  const { state, dispatch } = useApp()
  const { timelineWeeks } = state

  // Derive scores for both scenarios to compute difference callout
  const glucoseA = useGlucoseCurve(state.scenarioA.selectedFoods, state.scenarioA.mealsPerDay)
  const insulinA = useInsulinCurve(glucoseA)
  const fatScoreA = useFatAccumulation(insulinA, timelineWeeks)

  const glucoseB = useGlucoseCurve(state.scenarioB.selectedFoods, state.scenarioB.mealsPerDay)
  const insulinB = useInsulinCurve(glucoseB)
  const fatScoreB = useFatAccumulation(insulinB, timelineWeeks)

  const diff = Math.abs(fatScoreA - fatScoreB)
  const worse = fatScoreA > fatScoreB ? 'A' : fatScoreB > fatScoreA ? 'B' : null

  const WEEK_MARKS = [
    { weeks: 1, label: '1 week' },
    { weeks: 4, label: '1 month' },
    { weeks: 12, label: '3 months' },
    { weeks: 26, label: '6 months' },
    { weeks: 52, label: '1 year' },
  ]
  const currentMark = WEEK_MARKS.reduce((closest, mark) =>
    Math.abs(mark.weeks - timelineWeeks) < Math.abs(closest.weeks - timelineWeeks) ? mark : closest
  )

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full px-4 pb-6">
      <SectionHeading
        emoji="⚖️"
        title="Compare Two Ways of Eating"
        subtitle="Build two different scenarios side-by-side and see which one leads to healthier choices!"
      />

      {/* Setup hint */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-800 text-center">
        💡 <strong>Try this:</strong> Set Scenario A to candy + 6 meals, then Scenario B to chicken + vegetables + 3 meals.
        Watch the difference!
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-600">Time period: </span>
          <span className="text-base font-extrabold text-purple-700">{currentMark.label}</span>
        </div>
        <SliderInput
          value={timelineWeeks}
          min={1}
          max={52}
          onChange={w => dispatch({ type: 'SET_TIMELINE_WEEKS', payload: w })}
        />
        <div className="flex justify-between mt-1 px-0.5">
          {WEEK_MARKS.map(mark => (
            <button
              key={mark.weeks}
              onClick={() => dispatch({ type: 'SET_TIMELINE_WEEKS', payload: mark.weeks })}
              className={`text-xs font-semibold transition-colors ${
                Math.abs(timelineWeeks - mark.weeks) <= 2 ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {mark.label}
            </button>
          ))}
        </div>
      </div>

      {/* Difference callout */}
      {worse && diff > 5 && (
        <motion.div
          key={`${worse}-${diff}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-3 text-center"
        >
          <p className="text-sm font-bold text-purple-800">
            🏆 Scenario {worse === 'A' ? 'B' : 'A'} is <span className="text-2xl font-extrabold">{diff}</span> points better in fat storage!
          </p>
          <p className="text-xs text-purple-600 mt-0.5">
            Over {currentMark.label}, eating pattern {worse === 'A' ? 'B' : 'A'} stores significantly less fat.
          </p>
        </motion.div>
      )}

      {/* Side by side panels */}
      <div className="flex flex-col sm:flex-row gap-4">
        <ScenarioPanel
          scenarioKey="A"
          label="Scenario A"
          color="blue"
        />
        <ScenarioPanel
          scenarioKey="B"
          label="Scenario B"
          color="orange"
        />
      </div>

      {/* Final lesson */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-5 text-center">
        <p className="text-2xl mb-2">🎓</p>
        <p className="font-extrabold text-green-800 text-base mb-2">You've learned the secret to staying lean!</p>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-green-700">
          <span className="bg-green-100 px-3 py-1 rounded-full font-semibold">✅ 3 meals/day</span>
          <span className="bg-green-100 px-3 py-1 rounded-full font-semibold">✅ Protein + Fat + Fiber</span>
          <span className="bg-green-100 px-3 py-1 rounded-full font-semibold">✅ Low sugar foods</span>
          <span className="bg-green-100 px-3 py-1 rounded-full font-semibold">✅ Give your body breaks!</span>
        </div>
      </div>
    </div>
  )
}
