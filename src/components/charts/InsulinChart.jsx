import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer
} from 'recharts'
import { hourLabel } from '../../utils/curveUtils'

const DISPLAY_TICKS = [0, 6, 12, 18, 24]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const insulin = payload[0]?.value
  let desc, color
  if (insulin <= 10) { desc = 'Baseline — fat burning mode! 🔥'; color = '#16a34a' }
  else if (insulin <= 30) { desc = 'Elevated — mixed mode'; color = '#d97706' }
  else { desc = 'High — fat storage mode! 🏋️'; color = '#dc2626' }

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl shadow-lg p-3 text-xs">
      <p className="font-bold text-gray-700">{hourLabel(label)}</p>
      <p style={{ color }} className="font-extrabold text-base">{insulin} μIU/mL</p>
      <p className="text-gray-500">{desc}</p>
    </div>
  )
}

export default function InsulinChart({ data, animated = true }) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart data={data} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="insulinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.05} />
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
          domain={[0, 120]}
          tick={{ fontSize: 11, fill: '#6b7280' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={10} stroke="#22c55e" strokeDasharray="4 4" label={{ value: 'Fat burn zone', position: 'right', fontSize: 9, fill: '#16a34a' }} />
        <ReferenceLine y={30} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Fat store zone', position: 'right', fontSize: 9, fill: '#dc2626' }} />
        <Area
          type="monotone"
          dataKey="insulin"
          stroke="#7c3aed"
          strokeWidth={2.5}
          fill="url(#insulinGrad)"
          dot={false}
          isAnimationActive={animated}
          animationDuration={1400}
          animationEasing="ease-out"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
