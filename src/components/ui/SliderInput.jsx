export default function SliderInput({ value, min, max, step = 1, onChange, className = '' }) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      className={`w-full h-3 rounded-full appearance-none cursor-pointer accent-purple-600 ${className}`}
      style={{
        background: `linear-gradient(to right, #7c3aed ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%)`,
      }}
    />
  )
}
