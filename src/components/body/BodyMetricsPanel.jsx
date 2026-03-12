import AnimatedNumber from '../ui/AnimatedNumber'
import { fatScoreColor } from '../../utils/colorUtils'
import { insulinLoadLabel } from '../../data/scienceEngine'

export default function BodyMetricsPanel({ fatScore, insulinLoadScore, peakGlucose, peakInsulin, weeks }) {
  const { bg, text } = fatScoreColor(fatScore)
  const { label: insulinLabel, color: insulinColor } = insulinLoadLabel(insulinLoadScore)

  const fatRiskDesc = fatScore < 25
    ? 'Your choices are great! Insulin stays low and your body burns fat efficiently. Keep it up!'
    : fatScore < 50
    ? 'Moderate insulin load. Some fat accumulation over time, but manageable with better food choices.'
    : fatScore < 75
    ? 'High insulin levels are pushing your body to store fat regularly. Consider reducing carb spikes!'
    : 'Very high insulin load! Your body is in almost constant fat-storage mode. Time to make changes!'

  return (
    <div className="flex flex-col gap-3 text-sm">
      {/* Weeks */}
      <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Time period</p>
        <p className="text-xl font-extrabold text-gray-800 mt-0.5">
          <AnimatedNumber value={weeks} /> {weeks === 1 ? 'week' : 'weeks'}
          <span className="text-sm font-normal text-gray-500 ml-1">
            ({weeks < 5 ? 'short term' : weeks < 26 ? 'medium term' : 'long term'})
          </span>
        </p>
      </div>

      {/* Fat storage score */}
      <div className={`${bg} rounded-xl p-3 border-2`}>
        <p className={`text-xs font-semibold uppercase tracking-wide ${text}`}>Fat Storage Score</p>
        <p className={`text-3xl font-extrabold mt-0.5 ${text}`}>
          <AnimatedNumber value={fatScore} /><span className="text-lg">/100</span>
        </p>
      </div>

      {/* Peak values */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-2.5 text-center">
          <p className="text-xs text-orange-600 font-semibold">Peak Glucose</p>
          <p className="text-base font-extrabold text-orange-700">
            <AnimatedNumber value={peakGlucose} /> <span className="text-xs">mg/dL</span>
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-2.5 text-center">
          <p className="text-xs text-purple-600 font-semibold">Peak Insulin</p>
          <p className="text-base font-extrabold text-purple-700">
            <AnimatedNumber value={peakInsulin} /> <span className="text-xs">μIU/mL</span>
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 text-xs text-gray-600 leading-relaxed">
        {fatRiskDesc}
      </div>
    </div>
  )
}
