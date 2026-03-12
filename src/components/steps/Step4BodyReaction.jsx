import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useApp, useActiveScenario } from '../../context/AppContext'
import { useGlucoseCurve } from '../../hooks/useGlucoseCurve'
import { useInsulinCurve } from '../../hooks/useInsulinCurve'
import { peakGlucose, peakInsulin, insulinLoadLabel } from '../../data/scienceEngine'
import { insulinLoadPercent } from '../../utils/curveUtils'
import GlucoseChart from '../charts/GlucoseChart'
import InsulinChart from '../charts/InsulinChart'
import InsulinSpikeMeter from '../charts/InsulinSpikeMeter'
import ChartContainer from '../charts/ChartContainer'
import SectionHeading from '../ui/SectionHeading'
import NavButtons from '../layout/NavButtons'
import AnimatedNumber from '../ui/AnimatedNumber'
import { FOOD_BY_ID } from '../../data/foods'

export default function Step4BodyReaction() {
  const { state } = useApp()
  const scenario = useActiveScenario()
  const { selectedFoods, mealsPerDay } = scenario

  const glucoseData = useGlucoseCurve(selectedFoods, mealsPerDay)
  const insulinData = useInsulinCurve(glucoseData)

  const maxGlucose = peakGlucose(glucoseData)
  const maxInsulin = peakInsulin(insulinData)
  const loadPct = insulinLoadPercent(insulinData)
  const loadScore = Math.round(loadPct * 0.8 + (maxInsulin / 200) * 20)
  const { label: loadLabel, color: loadColor, bg: loadBg } = insulinLoadLabel(loadScore)

  const selectedFoodObjects = selectedFoods.map(id => FOOD_BY_ID[id]).filter(Boolean)

  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full px-4 pb-2">
      <SectionHeading
        emoji="📈"
        title="Watch Your Body React!"
        subtitle="This is what happens inside your body over 24 hours based on your food choices."
      />

      {/* Summary stats row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center">
          <p className="text-xs text-orange-600 font-semibold">Peak Glucose</p>
          <p className="text-xl font-extrabold text-orange-700">
            <AnimatedNumber value={maxGlucose} /> <span className="text-xs font-normal">mg/dL</span>
          </p>
          {maxGlucose >= 140 && <p className="text-xs text-red-600 font-bold mt-0.5">🚨 Spike!</p>}
          {maxGlucose < 100 && <p className="text-xs text-green-600 font-bold mt-0.5">✅ Great</p>}
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
          <p className="text-xs text-purple-600 font-semibold">Peak Insulin</p>
          <p className="text-xl font-extrabold text-purple-700">
            <AnimatedNumber value={maxInsulin} /> <span className="text-xs font-normal">μIU/mL</span>
          </p>
        </div>
        <div className={`${loadBg} border rounded-xl p-3 text-center border-current`}>
          <p className="text-xs font-semibold" style={{ color: loadColor.replace('text-', '') }}>Insulin Load</p>
          <p className={`text-xl font-extrabold ${loadColor}`}>
            <AnimatedNumber value={loadPct} suffix="%" />
          </p>
          <p className={`text-xs font-bold ${loadColor}`}>{loadLabel}</p>
        </div>
      </div>

      {/* Charts + Meter */}
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1 flex flex-col gap-3">
          <ChartContainer
            title="🍊 Blood Glucose (mg/dL)"
            subtitle="Orange line = your blood sugar over 24 hours"
          >
            <GlucoseChart data={glucoseData} />
            <div className="flex gap-3 mt-2 text-xs text-gray-500 flex-wrap">
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-green-500 inline-block" /> Normal (&lt;100)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-500 inline-block" /> High (&gt;140)</span>
            </div>
          </ChartContainer>

          <ChartContainer
            title="💜 Insulin Response (μIU/mL)"
            subtitle="Purple line = insulin follows glucose (with a delay)"
          >
            <InsulinChart data={insulinData} />
            <div className="bg-purple-50 rounded-lg p-2 mt-2 text-xs text-purple-700">
              <strong>When insulin stays high all day</strong>, your body stays in fat-storage mode and cannot burn fat. The goal is to have valleys (low insulin between meals)!
            </div>
          </ChartContainer>
        </div>

        {/* Spike Meter */}
        <div className="lg:w-44 flex flex-col gap-3 items-center">
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 shadow-sm w-full flex flex-col items-center gap-3">
            <InsulinSpikeMeter score={loadScore} />
          </div>

          {/* Food combo analysis */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-3 w-full text-xs">
            <p className="font-bold text-gray-700 mb-2">Your combo:</p>
            {selectedFoodObjects.slice(0, 5).map(food => (
              <div key={food.id} className="flex items-center gap-1.5 mb-1">
                <span>{food.emoji}</span>
                <span className="text-gray-600 truncate">{food.name}</span>
              </div>
            ))}
            {selectedFoodObjects.length > 5 && (
              <p className="text-gray-400">+{selectedFoodObjects.length - 5} more</p>
            )}
          </div>
        </div>
      </div>

      {/* Key insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-sm text-indigo-800"
      >
        <strong>💡 Remember:</strong> Glucose spike → Insulin spike → If insulin is always high, your body stores more fat and cannot burn it. The goal is to keep the curves LOW and have clear valleys between meals!
      </motion.div>

      <NavButtons />
    </div>
  )
}
