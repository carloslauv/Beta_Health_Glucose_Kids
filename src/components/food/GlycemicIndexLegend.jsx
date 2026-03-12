export default function GlycemicIndexLegend() {
  return (
    <div className="flex flex-wrap gap-3 text-xs font-semibold">
      <div className="flex items-center gap-1.5">
        <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
        <span className="text-gray-600">Low GI (≤30) — Slow & steady</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
        <span className="text-gray-600">Medium GI (31–55) — Moderate rise</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
        <span className="text-gray-600">High GI (56+) — Fast spike!</span>
      </div>
    </div>
  )
}
