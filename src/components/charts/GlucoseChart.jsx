import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer
} from 'recharts'
import { hourLabel } from '../../utils/curveUtils'

const TICK_HOURS = [0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24]
const DISPLAY_TICKS = [0, 6, 12, 18, 24]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const glucose = payload[0]?.value
  let zone, color
  if (glucose < 100) { zone = 'Normal 🟢'; color = '#16a34a' }
  else if (glucose < 140) { zone = 'Elevated 🟡'; color = '#d97706' }
  else { zone = 'High Spike! 🔴'; color = '#dc2626' }

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl shadow-lg p-3 text-xs">
      <p className="font-bold text-gray-700">{hourLabel(label)}</p>
      <p style={{ color }} className="font-extrabold text-base">{glucose} mg/dL</p>
      <p className="text-gray-500">{zone}</p>
    </div>
  )
}

export default function GlucoseChart({ data, animated = true }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="glucoseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis
          dataKey="time"
          type="number"
          domain={[0, 24]}
          ticks={DISPLAY_TICKS}
          tickFormatter={hourLabel}
          tick={{ fontSize: 11, fill: '#6b7280' }}
        />
        <YAxis
          domain={[60, 220]}
          tick={{ fontSize: 11, fill: '#6b7280' }}
          tickFormatter={v => `${v}`}
        />
        <Tooltip content={<CustomTooltip />} />
        {/* Safe zone */}
        <ReferenceLine y={100} stroke="#22c55e" strokeDasharray="4 4" label={{ value: 'Normal', position: 'right', fontSize: 10, fill: '#16a34a' }} />
        {/* High zone */}
        <ReferenceLine y={140} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'High', position: 'right', fontSize: 10, fill: '#dc2626' }} />
        <Area
          type="monotone"
          dataKey="glucose"
          stroke="#f97316"
          strokeWidth={2.5}
          fill="url(#glucoseGrad)"
          dot={false}
          isAnimationActive={animated}
          animationDuration={1200}
          animationEasing="ease-out"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
