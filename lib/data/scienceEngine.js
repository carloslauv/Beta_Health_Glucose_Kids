// ─────────────────────────────────────────────────────────────────────────────
// Science Engine — glucose curves, insulin derivation, fat scoring
// All values are approximate educational models, not medical data.
// ─────────────────────────────────────────────────────────────────────────────

// Each profile: array of [hour_offset, delta_mg_dL] relative to meal time.
// Baseline fasting glucose = 80 mg/dL.
export const CURVE_PROFILES = {
  very_high_instant: [
    [0, 0], [0.25, 50], [0.5, 80], [0.75, 70], [1.0, 45],
    [1.5, 18], [2.0, 5], [2.5, 0],
  ],
  high_fast: [
    [0, 0], [0.5, 45], [1.0, 60], [1.5, 42], [2.0, 22],
    [2.5, 8], [3.0, 0],
  ],
  medium_medium: [
    [0, 0], [0.5, 25], [1.0, 42], [1.5, 38], [2.0, 24],
    [2.5, 12], [3.0, 4], [3.5, 0],
  ],
  medium_slow: [
    [0, 0], [0.5, 15], [1.0, 32], [1.5, 38], [2.0, 28],
    [2.5, 16], [3.0, 7], [3.5, 2], [4.0, 0],
  ],
  low_slow: [
    [0, 0], [0.5, 8], [1.0, 18], [1.5, 20], [2.0, 15],
    [3.0, 8], [3.5, 3], [4.0, 0],
  ],
  very_low_flat: [
    [0, 0], [1.0, 6], [2.0, 5], [3.0, 2], [4.0, 0],
  ],
  protein_only: [
    [0, 0], [0.5, 4], [1.0, 7], [1.5, 5], [2.0, 2], [2.5, 0],
  ],
  fat_only: [
    [0, 0], [0.5, 2], [1.0, 2], [2.0, 1], [3.0, 0],
  ],
  fat_low: [
    [0, 0], [0.5, 4], [1.0, 7], [2.0, 5], [3.0, 2], [4.0, 0],
  ],
}

// Meal times (hours after midnight) per meals-per-day setting
export const MEAL_SCHEDULES = {
  1: [13],
  2: [8, 18],
  3: [7, 12, 18],
  4: [7, 11, 14, 18],
  5: [7, 10, 13, 16, 19],
  6: [7, 9, 11, 13, 15, 17],
}

// ─── Combo modifier ────────────────────────────────────────────────────────
// When multiple macros are combined, spikes are blunted.
// Returns { peakMultiplier, delayHours }
export function calculateComboModifier(selectedFoods) {
  const categories = new Set(selectedFoods.map(f => f.category))
  let peakMultiplier = 1.0
  let delayHours = 0

  if (categories.has('protein')) { peakMultiplier *= 0.85 }
  if (categories.has('fat'))     { peakMultiplier *= 0.80; delayHours += 0.25 }
  if (categories.has('fiber'))   { peakMultiplier *= 0.70; delayHours += 0.50 }

  // Pure simple carbs with nothing else → slightly worse
  const hasSimpleCarb = selectedFoods.some(
    f => f.subcategory === 'simple_carb'
  )
  const hasModerators = categories.has('protein') || categories.has('fat') || categories.has('fiber')
  if (hasSimpleCarb && !hasModerators) {
    peakMultiplier *= 1.1
  }

  return { peakMultiplier, delayHours }
}

// ─── Dominant curve for a food list ────────────────────────────────────────
// Returns the worst-case (highest) base curve among selected foods.
function dominantBaseProfile(selectedFoods) {
  if (selectedFoods.length === 0) return CURVE_PROFILES.very_low_flat

  // Rank profiles by approximate peak
  const RANK = {
    very_high_instant: 8,
    high_fast: 7,
    medium_medium: 6,
    medium_slow: 5,
    low_slow: 4,
    fat_low: 3,
    very_low_flat: 2,
    protein_only: 2,
    fat_only: 1,
  }

  const best = selectedFoods.reduce((winner, food) => {
    const rank = RANK[food.glucoseCurveProfile] ?? 0
    const winnerRank = RANK[winner.glucoseCurveProfile] ?? 0
    return rank > winnerRank ? food : winner
  })

  return CURVE_PROFILES[best.glucoseCurveProfile] ?? CURVE_PROFILES.very_low_flat
}

// ─── Linear interpolation helper ───────────────────────────────────────────
function interpolateCurve(profile, t) {
  if (t <= profile[0][0]) return profile[0][1]
  if (t >= profile[profile.length - 1][0]) return profile[profile.length - 1][1]
  for (let i = 0; i < profile.length - 1; i++) {
    const [t0, v0] = profile[i]
    const [t1, v1] = profile[i + 1]
    if (t >= t0 && t <= t1) {
      const frac = (t - t0) / (t1 - t0)
      return v0 + frac * (v1 - v0)
    }
  }
  return 0
}

// ─── Build 24-hour glucose curve ────────────────────────────────────────────
// Returns array of { time, glucose } objects at 15-min intervals (96 points).
export function buildGlucoseCurve(selectedFoods, mealsPerDay) {
  const BASELINE = 80
  const mealTimes = MEAL_SCHEDULES[mealsPerDay] ?? MEAL_SCHEDULES[3]
  const baseProfile = dominantBaseProfile(selectedFoods)
  const { peakMultiplier, delayHours } = calculateComboModifier(selectedFoods)

  const points = []
  for (let i = 0; i <= 96; i++) {
    const t = i * 0.25  // 0 to 24 hours in 15-min steps
    let totalDelta = 0
    for (const mealTime of mealTimes) {
      const offset = t - mealTime - delayHours
      if (offset >= 0) {
        totalDelta += interpolateCurve(baseProfile, offset) * peakMultiplier
      }
    }
    // Clamp glucose at physiological floor
    const glucose = Math.max(72, BASELINE + totalDelta)
    points.push({ time: t, glucose: Math.round(glucose) })
  }
  return points
}

// ─── Derive insulin curve from glucose ─────────────────────────────────────
// Insulin follows glucose with ~15-min delay, 1.4x amplification, slower decay.
// Units: μIU/mL (approx). Baseline ~5.
export function deriveInsulinCurve(glucosePoints) {
  const INSULIN_BASELINE = 5
  const GLUCOSE_BASELINE = 80

  return glucosePoints.map((pt, i) => {
    // Use glucose from 15 min earlier (1 index back)
    const sourcePt = glucosePoints[Math.max(0, i - 1)]
    const glucoseDelta = Math.max(0, sourcePt.glucose - GLUCOSE_BASELINE)
    // Non-linear: insulin response accelerates at higher glucose
    const rawInsulin = glucoseDelta * 1.4 * (1 + glucoseDelta / 120)
    const insulin = INSULIN_BASELINE + rawInsulin
    return { time: pt.time, insulin: Math.round(Math.min(insulin, 200)) }
  })
}

// ─── Fat accumulation score ─────────────────────────────────────────────────
// Returns 0-100 score representing relative fat storage risk.
// Based on area-under-insulin-curve above baseline, scaled by weeks.
export function calculateFatScore(insulinPoints, weeks = 1) {
  const INSULIN_BASELINE = 5
  // Approximate daily area above baseline (trapezoidal, 15-min steps)
  const dailyArea = insulinPoints.reduce((sum, pt) => {
    return sum + Math.max(0, pt.insulin - INSULIN_BASELINE) * 0.25
  }, 0)

  // Max possible: ~6 meals of candy every day ≈ area ~600
  const MAX_DAILY_AREA = 600
  const normalizedDaily = Math.min(dailyArea / MAX_DAILY_AREA, 1)

  // Weeks amplify the score (logarithmic: first weeks matter most visually)
  const weekMultiplier = Math.log10(weeks + 1) / Math.log10(53)  // 1 week to 1 year

  return Math.round(normalizedDaily * 100 * (0.3 + 0.7 * weekMultiplier))
}

// ─── Insulin load category ──────────────────────────────────────────────────
export function insulinLoadLabel(score) {
  if (score < 20) return { label: 'Great! 🌟', color: 'text-green-600', bg: 'bg-green-100' }
  if (score < 50) return { label: 'Okay 👍', color: 'text-yellow-600', bg: 'bg-yellow-100' }
  if (score < 75) return { label: 'High ⚠️', color: 'text-orange-600', bg: 'bg-orange-100' }
  return { label: 'Very High 🚨', color: 'text-red-600', bg: 'bg-red-100' }
}

// ─── Peak glucose / insulin helpers ────────────────────────────────────────
export function peakGlucose(glucosePoints) {
  return Math.max(...glucosePoints.map(p => p.glucose))
}

export function peakInsulin(insulinPoints) {
  return Math.max(...insulinPoints.map(p => p.insulin))
}
