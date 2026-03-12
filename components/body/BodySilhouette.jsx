'use client'

import { motion } from 'framer-motion'

// fatScore: 0–100. Clean minimal SVG figure, Stripe-aesthetic.
export default function BodySilhouette({ fatScore = 0 }) {
  const f = Math.min(1, fatScore / 100)

  // Body fill interpolates: zinc-200 (lean) → amber-200 → red-200 (heavy)
  const bodyFill = f < 0.4 ? '#e4e4e7' : f < 0.7 ? '#fde68a' : '#fecaca'
  const bodyStroke = f < 0.4 ? '#a1a1aa' : f < 0.7 ? '#d97706' : '#ef4444'

  // Fat layer color
  const fatFill = f < 0.4 ? '#fde68a' : f < 0.7 ? '#fdba74' : '#f87171'

  // Scale values
  const belly = 1 + f * 0.65
  const hips  = 1 + f * 0.55
  const arms  = 1 + f * 0.30

  return (
    <svg viewBox="0 0 80 180" width="70" height="158" className="flex-shrink-0">
      {/* Head */}
      <motion.ellipse
        cx="40" cy="16" rx="12" ry="13"
        animate={{ fill: bodyFill, stroke: bodyStroke }}
        transition={{ duration: 0.7 }}
        strokeWidth="1"
      />
      {/* Neck */}
      <motion.rect
        x="35" y="27" width="10" height="7" rx="2"
        animate={{ fill: bodyFill, stroke: bodyStroke }}
        transition={{ duration: 0.7 }}
        strokeWidth="1"
      />
      {/* Torso */}
      <motion.ellipse
        cx="40" cy="65"
        animate={{ rx: 14 * belly, ry: 24, fill: bodyFill, stroke: bodyStroke }}
        transition={{ duration: 0.7 }}
        strokeWidth="1"
      />
      {/* Left arm */}
      <motion.ellipse
        cx="20" cy="63"
        animate={{ rx: 5 * arms, ry: 18, fill: bodyFill, stroke: bodyStroke }}
        transition={{ duration: 0.7 }}
        strokeWidth="1"
      />
      {/* Right arm */}
      <motion.ellipse
        cx="60" cy="63"
        animate={{ rx: 5 * arms, ry: 18, fill: bodyFill, stroke: bodyStroke }}
        transition={{ duration: 0.7 }}
        strokeWidth="1"
      />
      {/* Hips */}
      <motion.ellipse
        cx="40" cy="92"
        animate={{ rx: 17 * hips, ry: 11, fill: bodyFill, stroke: bodyStroke }}
        transition={{ duration: 0.7 }}
        strokeWidth="1"
      />
      {/* Left leg */}
      <motion.ellipse
        cx="33" cy="128"
        animate={{ rx: 9 * (1 + f * 0.35), ry: 24, fill: bodyFill, stroke: bodyStroke }}
        transition={{ duration: 0.7 }}
        strokeWidth="1"
      />
      {/* Right leg */}
      <motion.ellipse
        cx="47" cy="128"
        animate={{ rx: 9 * (1 + f * 0.35), ry: 24, fill: bodyFill, stroke: bodyStroke }}
        transition={{ duration: 0.7 }}
        strokeWidth="1"
      />
      {/* Lower legs */}
      <motion.ellipse cx="33" cy="162" rx="6" ry="10" animate={{ fill: bodyFill, stroke: bodyStroke }} transition={{ duration: 0.7 }} strokeWidth="1" />
      <motion.ellipse cx="47" cy="162" rx="6" ry="10" animate={{ fill: bodyFill, stroke: bodyStroke }} transition={{ duration: 0.7 }} strokeWidth="1" />

      {/* Fat overlay — belly */}
      <motion.ellipse
        cx="40" cy="70"
        animate={{
          rx: 3 + f * 16,
          ry: 2 + f * 12,
          opacity: 0.1 + f * 0.65,
          fill: fatFill,
        }}
        transition={{ duration: 0.7 }}
      />
      {/* Fat overlay — hips/love handles */}
      <motion.ellipse
        cx="40" cy="88"
        animate={{
          rx: 2 + f * 14,
          ry: 2 + f * 7,
          opacity: 0.1 + f * 0.55,
          fill: fatFill,
        }}
        transition={{ duration: 0.7 }}
      />
    </svg>
  )
}
