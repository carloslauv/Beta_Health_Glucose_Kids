import { motion } from 'framer-motion'

// Arc gauge: 0-100 scale, half-circle (180 degrees)
// cx=60, cy=60, r=45 → circumference of half = π * r ≈ 141

const R = 42
const CX = 55
const CY = 58
const HALF_CIRC = Math.PI * R  // ~132

function scoreToColor(score) {
  if (score < 25) return '#22c55e'
  if (score < 50) return '#f59e0b'
  if (score < 75) return '#f97316'
  return '#ef4444'
}

function scoreToLabel(score) {
  if (score < 25) return { text: 'Low', emoji: '🌟' }
  if (score < 50) return { text: 'Moderate', emoji: '👍' }
  if (score < 75) return { text: 'High', emoji: '⚠️' }
  return { text: 'Very High', emoji: '🚨' }
}

export default function InsulinSpikeMeter({ score = 0, label = 'Insulin Load' }) {
  const clamped = Math.min(100, Math.max(0, score))
  const filled = (clamped / 100) * HALF_CIRC
  const color = scoreToColor(clamped)
  const { text, emoji } = scoreToLabel(clamped)

  // Needle angle: -90 (left) to +90 (right)
  const needleAngle = -90 + (clamped / 100) * 180

  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
      <div className="relative">
        <svg viewBox="0 0 110 70" width="140" height="90">
          {/* Track */}
          <path
            d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Filled arc */}
          <motion.path
            d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${HALF_CIRC}`}
            animate={{ strokeDashoffset: HALF_CIRC - filled, stroke: color }}
            initial={{ strokeDashoffset: HALF_CIRC }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          {/* Needle */}
          <motion.line
            x1={CX}
            y1={CY}
            animate={{
              x2: CX + Math.cos((needleAngle * Math.PI) / 180) * (R - 6),
              y2: CY + Math.sin((needleAngle * Math.PI) / 180) * (R - 6),
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
            stroke="#374151"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx={CX} cy={CY} r="3.5" fill="#374151" />
          {/* Labels */}
          <text x={CX - R - 2} y={CY + 14} fontSize="8" fill="#6b7280" textAnchor="middle">0</text>
          <text x={CX + R + 2} y={CY + 14} fontSize="8" fill="#6b7280" textAnchor="middle">100</text>
        </svg>
        {/* Score number */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
          <motion.span
            animate={{ color }}
            className="text-xl font-extrabold leading-none"
          >
            {Math.round(clamped)}
          </motion.span>
        </div>
      </div>
      <span className="text-sm font-bold" style={{ color }}>
        {emoji} {text}
      </span>
    </div>
  )
}
