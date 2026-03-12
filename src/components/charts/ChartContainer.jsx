export default function ChartContainer({ title, subtitle, children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border-2 border-gray-200 p-4 shadow-sm ${className}`}>
      {title && (
        <div className="mb-3">
          <h3 className="font-bold text-gray-800 text-sm sm:text-base">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  )
}
