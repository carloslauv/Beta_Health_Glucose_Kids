'use client'

import { motion } from 'framer-motion'

const R = 40
const CX = 52
const CY = 52
const HALF_CIRC = Math.PI * R  // ~125.7

function scoreToColor(s) {
  if (s < 25) return '#10b981'
  if (s < 50) return '#f59e0b'
  if (s < 75) return '#f97316'
  return '#ef4444'
}

function scoreToLabel(s) {
  if (s < 25) return 'Low'
  if (s < 50) return 'Moderate'
  if (s < 75) return 'High'
  return 'Critical'
}

export default function InsulinSpikeMeter({ score = 0 }) {
  const clamped = Math.min(100, Math.max(0, score))
  const filled = (clamped / 100) * HALF_CIRC
  const color = scoreToColor(clamped)
  const label = scoreToLabel(clamped)
  const needleAngle = -90 + (clamped / 100) * 180

  return (
    <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 104 60" width="120" height="70">
        {/* Track */}
        <path
          d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
          fill="none"
          stroke="#f4f4f5"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Filled arc */}
        <motion.path
          d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${HALF_CIRC}`}
          animate={{ strokeDashoffset: HALF_CIRC - filled, stroke: color }}
          initial={{ strokeDashoffset: HALF_CIRC }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {/* Needle */}
        <motion.line
          x1={CX} y1={CY}
          animate={{
            x2: CX + Math.cos((needleAngle * Math.PI) / 180) * (R - 4),
            y2: CY + Math.sin((needleAngle * Math.PI) / 180) * (R - 4),
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          stroke="#18181b"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx={CX} cy={CY} r="2.5" fill="#18181b" />
      </svg>
      <div className="text-center -mt-1">
        <motion.p
          animate={{ color }}
          className="text-2xl font-bold leading-none tabular-nums"
        >
          {Math.round(clamped)}
        </motion.p>
        <p className="text-[11px] text-zinc-400 mt-0.5 font-medium">{label}</p>
      </div>
    </div>
  )
}
