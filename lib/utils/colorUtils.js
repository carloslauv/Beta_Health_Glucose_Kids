// Map glycemic index to color classes
export function giToColor(gi) {
  if (gi <= 30) return { dot: 'bg-green-500', text: 'text-green-700', badge: 'bg-green-100 text-green-800', label: 'Low' }
  if (gi <= 55) return { dot: 'bg-yellow-500', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-800', label: 'Medium' }
  return { dot: 'bg-red-500', text: 'text-red-700', badge: 'bg-red-100 text-red-800', label: 'High' }
}

// Map glucose level to chart color
export function glucoseToColor(mg) {
  if (mg < 100) return '#22c55e'
  if (mg < 140) return '#f59e0b'
  return '#ef4444'
}

// Map a fat score (0-100) to display colors
export function fatScoreColor(score) {
  if (score < 25) return { bg: 'bg-green-100', text: 'text-green-700', fill: '#86efac' }
  if (score < 50) return { bg: 'bg-yellow-100', text: 'text-yellow-700', fill: '#fde68a' }
  if (score < 75) return { bg: 'bg-orange-100', text: 'text-orange-700', fill: '#fdba74' }
  return { bg: 'bg-red-100', text: 'text-red-700', fill: '#fca5a5' }
}
