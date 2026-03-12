import { giToColor } from '../../utils/colorUtils'

export function GIBadge({ gi }) {
  const { badge, label } = giToColor(gi)
  if (gi === 0) return (
    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
      Zero GI
    </span>
  )
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${badge}`}>
      GI {gi} · {label}
    </span>
  )
}

export function GIDot({ gi, size = 'md' }) {
  const { dot } = giToColor(gi)
  const sz = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'
  return <span className={`inline-block rounded-full ${sz} ${dot}`} />
}
