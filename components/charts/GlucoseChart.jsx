'use client'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceArea, ResponsiveContainer
} from 'recharts'

const X_TICKS = [6, 12, 18]
const HOUR_LABELS = { 6: '6 AM', 12: '12 PM', 18: '6 PM' }

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const val = payload[0]?.value
  let zone, zoneColor
  if (val < 100)      { zone = 'Normal range';  zoneColor = '#059669' }
  else if (val < 140) { zone = 'Elevated';      zoneColor = '#d97706' }
  else                { zone = 'High spike';    zoneColor = '#dc2626' }

  return (
    <div className="bg-white rounded-lg shadow-md px-3 py-2.5 text-xs border border-zinc-100">
      <p className="text-zinc-400 mb-1">
        {Math.floor(label)}:{String(Math.round((label % 1) * 60)).padStart(2, '0')}
      </p>
      <p className="font-semibold text-zinc-900 text-sm">{val} mg/dL</p>
      <p style={{ color: zoneColor }} className="font-medium mt-0.5">{zone}</p>
    </div>
  )
}

export default function GlucoseChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="glcGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#6366f1" stopOpacity={0.12} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0}    />
          </linearGradient>
        </defs>
        <ReferenceArea y1={140} y2={220} fill="#fee2e2" fillOpacity={0.4} />
        <CartesianGrid stroke="#f4f4f5" vertical={false} />
        <XAxis
          dataKey="time"
          type="number"
          domain={[0, 24]}
          ticks={X_TICKS}
          tickFormatter={h => HOUR_LABELS[h] ?? ''}
          tick={{ fontSize: 10, fill: '#a1a1aa' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[60, 220]}
          ticks={[80, 100, 140, 180]}
          tick={{ fontSize: 10, fill: '#a1a1aa' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e4e4e7', strokeWidth: 1 }} />
        <Area
          type="monotone"
          dataKey="glucose"
          stroke="#6366f1"
          strokeWidth={1.5}
          fill="url(#glcGrad)"
          dot={false}
          isAnimationActive={true}
          animationDuration={900}
          animationEasing="ease-out"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
