import { useApp } from '../../context/AppContext'
import BodySilhouette from '../body/BodySilhouette'
import InsulinSpikeMeter from '../charts/InsulinSpikeMeter'
import AnimatedNumber from '../ui/AnimatedNumber'

const WEEK_MARKS = [
  { weeks: 1,  label: '1w'  },
  { weeks: 4,  label: '1mo' },
  { weeks: 12, label: '3mo' },
  { weeks: 26, label: '6mo' },
  { weeks: 52, label: '1yr' },
]

export default function LongTermSection({ fatScore, insulinLoadScore }) {
  const { state, dispatch } = useApp()
  const { timelineWeeks } = state

  const currentMark = WEEK_MARKS.reduce((c, m) =>
    Math.abs(m.weeks - timelineWeeks) < Math.abs(c.weeks - timelineWeeks) ? m : c
  )

  return (
    <div className="flex flex-col gap-4">
      {/* Row: silhouette + meter + score */}
      <div className="flex items-center gap-6">
        {/* Silhouette */}
        <div className="flex flex-col items-center gap-1.5">
          <BodySilhouette fatScore={fatScore} />
          <div className="flex flex-col items-center">
            <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">After {currentMark.label}</p>
            <p className="text-lg font-bold text-zinc-900 tabular-nums">
              <AnimatedNumber value={fatScore} /><span className="text-xs text-zinc-400 font-normal ml-0.5">/100</span>
            </p>
            <p className="text-[10px] text-zinc-500">fat score</p>
          </div>
        </div>

        {/* Meter */}
        <div className="flex flex-col items-center gap-1">
          <InsulinSpikeMeter score={insulinLoadScore} />
          <p className="text-[10px] text-zinc-400 text-center">Insulin load</p>
        </div>

        {/* Key thresholds */}
        <div className="flex-1 flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
            <span className="text-zinc-500">Below 10 μIU/mL → fat burning</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
            <span className="text-zinc-500">Above 30 μIU/mL → fat storage</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-zinc-300 flex-shrink-0" />
            <span className="text-zinc-500">3 meals → valleys between meals</span>
          </div>
        </div>
      </div>

      {/* Timeline slider */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">Time projection</p>
          <p className="text-xs font-semibold text-zinc-700">{currentMark.label} of daily eating</p>
        </div>
        <input
          type="range"
          min={1}
          max={52}
          value={timelineWeeks}
          onChange={e => dispatch({ type: 'SET_TIMELINE_WEEKS', payload: Number(e.target.value) })}
          className="w-full"
          style={{
            background: `linear-gradient(to right, #6366f1 ${((timelineWeeks - 1) / 51) * 100}%, #e4e4e7 ${((timelineWeeks - 1) / 51) * 100}%)`,
          }}
        />
        <div className="flex justify-between">
          {WEEK_MARKS.map(m => (
            <button
              key={m.weeks}
              onClick={() => dispatch({ type: 'SET_TIMELINE_WEEKS', payload: m.weeks })}
              className={`text-[10px] font-medium transition-colors ${
                Math.abs(timelineWeeks - m.weeks) <= 2 ? 'text-indigo-600' : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
