export default function SectionHeading({ emoji, title, subtitle }) {
  return (
    <div className="text-center mb-6">
      {emoji && <div className="text-5xl mb-2">{emoji}</div>}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">{title}</h2>
      {subtitle && <p className="mt-1.5 text-gray-500 text-sm sm:text-base max-w-md mx-auto">{subtitle}</p>}
    </div>
  )
}
