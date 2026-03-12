import { motion } from 'framer-motion'

// fatScore: 0-100 — drives fat layer opacity and size
export default function BodySilhouette({ fatScore = 0 }) {
  const f = Math.min(1, fatScore / 100)  // 0 to 1

  // Fat layer scales
  const bellyScale = 1 + f * 0.55
  const thighScale = 1 + f * 0.40
  const armScale = 1 + f * 0.25
  const neckScale = 1 + f * 0.15
  const fatOpacity = 0.2 + f * 0.65

  // Color: lean = green, fat = red
  const bodyColor = f < 0.3 ? '#86efac' : f < 0.6 ? '#fde68a' : f < 0.85 ? '#fdba74' : '#fca5a5'
  const strokeColor = f < 0.3 ? '#16a34a' : f < 0.6 ? '#d97706' : f < 0.85 ? '#ea580c' : '#dc2626'

  return (
    <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 100 200" width="110" height="220" className="drop-shadow-md">
        {/* ── Base silhouette ──────────────────────── */}
        {/* Head */}
        <motion.ellipse
          cx="50" cy="22" rx="16" ry="18"
          fill={bodyColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          animate={{ rx: 16 + f * 2, ry: 18 + f * 2, fill: bodyColor, stroke: strokeColor }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {/* Neck */}
        <motion.rect
          x="44" y="38" width="12" height="8" rx="3"
          fill={bodyColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          animate={{ width: 12 + f * 3, x: 44 - f * 1.5, fill: bodyColor, stroke: strokeColor }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {/* Torso */}
        <motion.ellipse
          cx="50" cy="82" rx="18" ry="30"
          fill={bodyColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          animate={{
            rx: 18 * bellyScale,
            ry: 30 + f * 5,
            fill: bodyColor,
            stroke: strokeColor,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {/* Left arm */}
        <motion.ellipse
          cx="24" cy="82" rx="7" ry="22"
          fill={bodyColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          animate={{ rx: 7 * armScale, fill: bodyColor, stroke: strokeColor }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {/* Right arm */}
        <motion.ellipse
          cx="76" cy="82" rx="7" ry="22"
          fill={bodyColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          animate={{ rx: 7 * armScale, fill: bodyColor, stroke: strokeColor }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {/* Hips */}
        <motion.ellipse
          cx="50" cy="116" rx="22" ry="14"
          fill={bodyColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          animate={{ rx: 22 + f * 10, fill: bodyColor, stroke: strokeColor }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {/* Left thigh */}
        <motion.ellipse
          cx="38" cy="152" rx="11" ry="24"
          fill={bodyColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          animate={{ rx: 11 * thighScale, fill: bodyColor, stroke: strokeColor }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {/* Right thigh */}
        <motion.ellipse
          cx="62" cy="152" rx="11" ry="24"
          fill={bodyColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          animate={{ rx: 11 * thighScale, fill: bodyColor, stroke: strokeColor }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {/* Left lower leg */}
        <ellipse cx="36" cy="188" rx="7" ry="12" fill={bodyColor} stroke={strokeColor} strokeWidth="1.5" />
        {/* Right lower leg */}
        <ellipse cx="64" cy="188" rx="7" ry="12" fill={bodyColor} stroke={strokeColor} strokeWidth="1.5" />

        {/* ── Fat accumulation overlay ──────────────── */}
        {/* Belly fat ring */}
        <motion.ellipse
          cx="50" cy="88" rx="5" ry="6"
          fill="#f97316"
          animate={{
            rx: 5 + f * 18,
            ry: 6 + f * 14,
            opacity: fatOpacity,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {/* Love handles */}
        <motion.ellipse
          cx="50" cy="108" rx="5" ry="4"
          fill="#f97316"
          animate={{
            rx: 5 + f * 20,
            ry: 4 + f * 8,
            opacity: fatOpacity * 0.8,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </svg>

      {/* Fat % label */}
      <div
        className="text-xs font-bold px-3 py-1 rounded-full"
        style={{ backgroundColor: bodyColor, color: strokeColor }}
      >
        {fatScore < 5 ? 'Lean 💪' : fatScore < 30 ? 'Healthy ✅' : fatScore < 60 ? 'Gaining ⚠️' : 'Excess Fat 🚨'}
      </div>
    </div>
  )
}
