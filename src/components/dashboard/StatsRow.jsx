import AnimatedNumber from '../ui/AnimatedNumber'

function StatCard({ label, value, unit, color, sublabel }) {
  const colorMap = {
    good:    { num: 'text-emerald-600', dot: 'bg-emerald-500' },
    warning: { num: 'text-amber-600',   dot: 'bg-amber-500'   },
    bad:     { num: 'text-red-600',     dot: 'bg-red-500'     },
    neutral: { num: 'text-zinc-900',    dot: 'bg-zinc-300'    },
  }
  const { num, dot } = colorMap[color] ?? colorMap.neutral

  return (
    <div className="flex flex-col gap-1 bg-white rounded-lg border border-zinc-200 p-4">
      <div className="flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
        <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">{label}</p>
      </div>
      <p className={`text-2xl font-bold tabular-nums ${num}`}>
        <AnimatedNumber value={value} />
        <span className="text-sm font-normal text-zinc-400 ml-1">{unit}</span>
      </p>
      {sublabel && <p className="text-[11px] text-zinc-400">{sublabel}</p>}
    </div>
  )
}

function glucoseColor(mg) {
  if (mg < 100) return 'good'
  if (mg < 140) return 'warning'
  return 'bad'
}

function insulinColor(ui) {
  if (ui < 15) return 'good'
  if (ui < 40) return 'warning'
  return 'bad'
}

function loadColor(pct) {
  if (pct < 30) return 'good'
  if (pct < 55) return 'warning'
  return 'bad'
}

export default function StatsRow({ peakGlucose, peakInsulin, insulinLoad }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard
        label="Peak glucose"
        value={peakGlucose}
        unit="mg/dL"
        color={glucoseColor(peakGlucose)}
        sublabel={peakGlucose >= 140 ? 'Above safe range' : peakGlucose < 100 ? 'Within normal range' : 'Slightly elevated'}
      />
      <StatCard
        label="Peak insulin"
        value={peakInsulin}
        unit="μIU/mL"
        color={insulinColor(peakInsulin)}
        sublabel={peakInsulin < 15 ? 'Near baseline' : peakInsulin < 40 ? 'Moderate response' : 'High response'}
      />
      <StatCard
        label="Insulin load"
        value={insulinLoad}
        unit="%"
        color={loadColor(insulinLoad)}
        sublabel={insulinLoad < 30 ? 'Good recovery time' : insulinLoad < 55 ? 'Partial recovery' : 'Elevated all day'}
      />
    </div>
  )
}
