import { useApp, useActiveScenario } from '../../context/AppContext'
import { useGlucoseCurve } from '../../hooks/useGlucoseCurve'
import { useInsulinCurve } from '../../hooks/useInsulinCurve'
import { useFatAccumulation } from '../../hooks/useFatAccumulation'
import { peakGlucose, peakInsulin, insulinLoadLabel } from '../../data/scienceEngine'
import { insulinLoadPercent } from '../../utils/curveUtils'
import BodySilhouette from '../body/BodySilhouette'
import BodyMetricsPanel from '../body/BodyMetricsPanel'
import SectionHeading from '../ui/SectionHeading'
import SliderInput from '../ui/SliderInput'
import NavButtons from '../layout/NavButtons'

const WEEK_MARKS = [
  { weeks: 1, label: '1 week' },
  { weeks: 4, label: '1 month' },
  { weeks: 12, label: '3 months' },
  { weeks: 26, label: '6 months' },
  { weeks: 52, label: '1 year' },
]

export default function Step5LongTermImpact() {
  const { state, dispatch } = useApp()
  const { timelineWeeks } = state
  const scenario = useActiveScenario()
  const { selectedFoods, mealsPerDay } = scenario

  const glucoseData = useGlucoseCurve(selectedFoods, mealsPerDay)
  const insulinData = useInsulinCurve(glucoseData)
  const fatScore = useFatAccumulation(insulinData, timelineWeeks)

  const maxGlucose = peakGlucose(glucoseData)
  const maxInsulin = peakInsulin(insulinData)
  const loadPct = insulinLoadPercent(insulinData)
  const loadScore = Math.round(loadPct * 0.8 + (maxInsulin / 200) * 20)

  const currentMark = WEEK_MARKS.reduce((closest, mark) =>
    Math.abs(mark.weeks - timelineWeeks) < Math.abs(closest.weeks - timelineWeeks) ? mark : closest
  )

  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full px-4 pb-2">
      <SectionHeading
        emoji="⏳"
        title="What Happens Over Time?"
        subtitle="If you eat this way every day for weeks or months, what does your body look like? Drag the slider to find out!"
      />

      {/* Timeline slider */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-600">1 week</span>
          <div className="text-center">
            <p className="text-lg font-extrabold text-purple-700">{currentMark.label}</p>
            <p className="text-xs text-gray-500">of eating this way every day</p>
          </div>
          <span className="text-sm font-semibold text-gray-600">1 year</span>
        </div>
        <SliderInput
          value={timelineWeeks}
          min={1}
          max={52}
          onChange={w => dispatch({ type: 'SET_TIMELINE_WEEKS', payload: w })}
        />
        {/* Marker pips */}
        <div className="flex justify-between mt-2 px-0.5">
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

      {/* Main visualization */}
      <div className="flex flex-col sm:flex-row gap-4 items-start justify-center">
        {/* Body silhouette */}
        <div className="flex flex-col items-center gap-2 bg-white rounded-2xl border-2 border-gray-200 p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Body after {currentMark.label}</p>
          <BodySilhouette fatScore={fatScore} />
        </div>

        {/* Metrics */}
        <div className="flex-1 min-w-0">
          <BodyMetricsPanel
            fatScore={fatScore}
            insulinLoadScore={loadScore}
            peakGlucose={maxGlucose}
            peakInsulin={maxInsulin}
            weeks={timelineWeeks}
          />
        </div>
      </div>

      {/* Teaching moment */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl p-4 text-sm">
        <p className="font-bold text-green-800 mb-2">🧠 The Big Lesson:</p>
        <ul className="space-y-1.5 text-green-700">
          <li>🍬 <strong>Candy + 6 meals/day</strong> → Insulin always high → Fat storage every day</li>
          <li>🥦 <strong>Protein + fat + fiber + 3 meals</strong> → Insulin low → Fat burning mode</li>
          <li>⏰ <strong>Giving your body a break from food</strong> = giving it time to burn fat!</li>
        </ul>
      </div>

      <NavButtons
        nextLabel="Compare Two Scenarios →"
        canGoNext={true}
      />
    </div>
  )
}
