'use client'

import { useApp } from '../../lib/context/AppContext'
import { useGlucoseCurve } from '../../lib/hooks/useGlucoseCurve'
import { useInsulinCurve } from '../../lib/hooks/useInsulinCurve'
import { useFatAccumulation } from '../../lib/hooks/useFatAccumulation'
import { peakGlucose } from '../../lib/data/scienceEngine'
import { insulinLoadPercent } from '../../lib/utils/curveUtils'
import Sidebar from '../sidebar/Sidebar'
import Dashboard from '../dashboard/Dashboard'
import { motion } from 'framer-motion'

function DiffBadge({ fatScoreA, fatScoreB }) {
  const diff = Math.abs(fatScoreA - fatScoreB)
  if (diff < 5) return null
  const better = fatScoreA < fatScoreB ? 'A' : 'B'
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-2 left-1/2 -translate-x-1/2 z-10 bg-white border border-zinc-200 rounded-full px-4 py-1.5 shadow-sm flex items-center gap-2 text-xs font-semibold text-zinc-700 whitespace-nowrap"
    >
      <span className={`w-2 h-2 rounded-full ${better === 'A' ? 'bg-indigo-500' : 'bg-amber-500'}`} />
      Scenario {better} stores {diff} points less fat
    </motion.div>
  )
}

export default function CompareLayout({ user }) {
  const { state } = useApp()
  const { timelineWeeks } = state

  const glcA = useGlucoseCurve(state.scenarioA.selectedFoods, state.scenarioA.mealsPerDay)
  const insA = useInsulinCurve(glcA)
  const fatA = useFatAccumulation(insA, timelineWeeks)

  const glcB = useGlucoseCurve(state.scenarioB.selectedFoods, state.scenarioB.mealsPerDay)
  const insB = useInsulinCurve(glcB)
  const fatB = useFatAccumulation(insB, timelineWeeks)

  return (
    <div className="relative flex flex-1 overflow-hidden">
      <DiffBadge fatScoreA={fatA} fatScoreB={fatB} />

      {/* Scenario A */}
      <div className="flex flex-1 overflow-hidden border-r border-zinc-200">
        <Sidebar scenario="A" />
        <main className="flex-1 overflow-y-auto">
          <Dashboard scenario="A" user={user} />
        </main>
      </div>

      {/* Scenario B */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar scenario="B" />
        <main className="flex-1 overflow-y-auto">
          <Dashboard scenario="B" user={user} />
        </main>
      </div>
    </div>
  )
}
