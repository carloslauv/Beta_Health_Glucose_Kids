'use client'

import { useState } from 'react'
import { BookmarkPlus, Check } from 'lucide-react'
import { useApp } from '../../lib/context/AppContext'
import { useGlucoseCurve } from '../../lib/hooks/useGlucoseCurve'
import { useInsulinCurve } from '../../lib/hooks/useInsulinCurve'
import { useFatAccumulation } from '../../lib/hooks/useFatAccumulation'
import { peakGlucose, peakInsulin } from '../../lib/data/scienceEngine'
import { insulinLoadPercent } from '../../lib/utils/curveUtils'
import StatsRow from './StatsRow'
import GlucoseChart from '../charts/GlucoseChart'
import InsulinChart from '../charts/InsulinChart'
import LongTermSection from './LongTermSection'

function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-2">
      {children}
    </p>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-40 text-center">
      <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center mb-3">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="#a1a1aa" strokeWidth="1.2" />
          <path d="M7 4.5v3M7 9.5h.01" stroke="#a1a1aa" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <p className="text-sm text-zinc-400">Select foods in the panel to see results</p>
    </div>
  )
}

export default function Dashboard({ scenario = 'A', user }) {
  const { state } = useApp()
  const scenarioData = scenario === 'A' ? state.scenarioA : state.scenarioB
  const { selectedFoods, mealsPerDay } = scenarioData
  const { timelineWeeks, compareMode } = state

  const glucoseData  = useGlucoseCurve(selectedFoods, mealsPerDay)
  const insulinData  = useInsulinCurve(glucoseData)
  const fatScore     = useFatAccumulation(insulinData, timelineWeeks)

  const maxGlucose   = peakGlucose(glucoseData)
  const maxInsulin   = peakInsulin(insulinData)
  const loadPct      = insulinLoadPercent(insulinData)
  const loadScore    = Math.round(loadPct * 0.8 + (maxInsulin / 200) * 20)

  const hasFood = selectedFoods.length > 0
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function saveLog() {
    if (!user || saving || !hasFood) return
    setSaving(true)
    try {
      await fetch('/api/meal-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedFoods,
          mealsPerDay,
          peakGlucose: maxGlucose,
          peakInsulin: maxInsulin,
          insulinLoad: loadPct,
          fatScore,
        }),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 flex flex-col gap-6 max-w-3xl">
      {/* Scenario label in compare mode */}
      {compareMode && (
        <p className={`text-xs font-semibold ${scenario === 'A' ? 'text-indigo-600' : 'text-amber-600'}`}>
          Scenario {scenario}
        </p>
      )}

      {/* Stats */}
      <section>
        <SectionLabel>Overview</SectionLabel>
        <StatsRow
          peakGlucose={maxGlucose}
          peakInsulin={maxInsulin}
          insulinLoad={loadPct}
        />
      </section>

      {/* Glucose chart */}
      <section>
        <SectionLabel>Blood Glucose — 24 hours</SectionLabel>
        <div className="bg-white rounded-lg border border-zinc-200 p-4">
          {hasFood ? (
            <>
              <GlucoseChart data={glucoseData} />
              <div className="flex items-center gap-4 mt-2 pt-2 border-t border-zinc-100">
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                  <span className="w-6 h-0.5 bg-indigo-500 inline-block rounded-full" />
                  Blood glucose (mg/dL)
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                  <span className="w-3 h-3 rounded-sm bg-red-100 inline-block" />
                  High zone (&gt;140)
                </div>
              </div>
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      {/* Insulin chart */}
      <section>
        <SectionLabel>Insulin Response — 24 hours</SectionLabel>
        <div className="bg-white rounded-lg border border-zinc-200 p-4">
          {hasFood ? (
            <>
              <InsulinChart data={insulinData} />
              <div className="flex items-center gap-4 mt-2 pt-2 border-t border-zinc-100">
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                  <span className="w-6 h-0.5 bg-violet-500 inline-block rounded-full" />
                  Insulin (μIU/mL)
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                  <span className="w-3 h-3 rounded-sm bg-red-100 inline-block" />
                  Fat storage zone (&gt;30)
                </div>
              </div>
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      {/* Long-term */}
      <section>
        <SectionLabel>Long-term Impact</SectionLabel>
        <div className="bg-white rounded-lg border border-zinc-200 p-5">
          <LongTermSection fatScore={fatScore} insulinLoadScore={loadScore} />
        </div>
      </section>

      {/* Save to log */}
      {user && hasFood && (
        <div className="flex justify-end pb-2">
          <button
            onClick={saveLog}
            disabled={saving || saved}
            className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg border transition-all ${
              saved
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-zinc-200 bg-white text-zinc-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700'
            } disabled:opacity-60`}
          >
            {saved ? <Check size={13} /> : <BookmarkPlus size={13} />}
            {saved ? 'Saved to history' : saving ? 'Saving…' : 'Save to meal log'}
          </button>
        </div>
      )}
    </div>
  )
}
