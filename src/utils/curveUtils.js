// Slice curve data up to a given progress (0-1) for animated playback
export function sliceCurve(points, progress) {
  const count = Math.max(2, Math.floor(points.length * progress))
  return points.slice(0, count)
}

// Format hour as readable time label (e.g. 7 → "7 AM", 13 → "1 PM")
export function hourLabel(h) {
  const hour = Math.floor(h)
  if (hour === 0) return '12 AM'
  if (hour < 12) return `${hour} AM`
  if (hour === 12) return '12 PM'
  return `${hour - 12} PM`
}

// Calculate insulin load: percentage of time above 10 μIU/mL
export function insulinLoadPercent(insulinPoints) {
  const elevated = insulinPoints.filter(p => p.insulin > 10).length
  return Math.round((elevated / insulinPoints.length) * 100)
}
