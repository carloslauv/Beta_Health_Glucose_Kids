import { motion } from 'framer-motion'
import { useApp, useActiveScenario } from '../../context/AppContext'
import SectionHeading from '../ui/SectionHeading'
import SliderInput from '../ui/SliderInput'
import NavButtons from '../layout/NavButtons'

const MEAL_INFO = {
  1: {
    label: 'One Meal a Day',
    icon: '🌙',
    verdict: 'very_good',
    desc: 'Only one insulin spike per day. Your body spends most of the day burning fat. But this is hard for most people!',
    clockPositions: ['13:00'],
  },
  2: {
    label: 'Two Meals',
    icon: '☀️🌙',
    verdict: 'good',
    desc: 'Two insulin spikes. Your body has long breaks between meals to rest and burn fat. Great choice!',
    clockPositions: ['8:00', '18:00'],
  },
  3: {
    label: 'Three Meals',
    icon: '🌅☀️🌙',
    verdict: 'good',
    desc: 'The classic breakfast, lunch and dinner. Three spikes per day, with good rest periods. Healthy and sustainable!',
    clockPositions: ['7:00', '12:00', '18:00'],
  },
  4: {
    label: 'Four Meals',
    icon: '⏰⏰⏰⏰',
    verdict: 'okay',
    desc: 'Four spikes. Your insulin starts to stay elevated longer. Not terrible, but less recovery time.',
    clockPositions: ['7:00', '11:00', '14:00', '18:00'],
  },
  5: {
    label: 'Five Meals',
    icon: '⚠️',
    verdict: 'bad',
    desc: 'Your insulin is elevated most of the day. You rarely give your body a break from storing energy.',
    clockPositions: ['7:00', '10:00', '13:00', '16:00', '19:00'],
  },
  6: {
    label: 'Six Meals / Grazing',
    icon: '🚨',
    verdict: 'bad',
    desc: 'Insulin never goes back to normal between meals! Your body is almost always in fat-storage mode.',
    clockPositions: ['7:00', '9:00', '11:00', '13:00', '15:00', '17:00'],
  },
}

const VERDICT_STYLE = {
  very_good: 'bg-green-50 border-green-300 text-green-800',
  good: 'bg-green-50 border-green-200 text-green-700',
  okay: 'bg-yellow-50 border-yellow-300 text-yellow-800',
  bad: 'bg-red-50 border-red-300 text-red-800',
}

function MealTimeline({ meals }) {
  const info = MEAL_INFO[meals]
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {Array.from({ length: 24 }, (_, h) => {
          const isMeal = info.clockPositions.some(pos => parseInt(pos) === h)
          return (
            <motion.div
              key={h}
              animate={{
                scale: isMeal ? 1.3 : 1,
                backgroundColor: isMeal ? '#7c3aed' : h >= 6 && h <= 22 ? '#e5e7eb' : '#f3f4f6',
              }}
              transition={{ duration: 0.3 }}
              className="w-3 h-3 rounded-full"
              title={isMeal ? `Meal at ${info.clockPositions.find(p => parseInt(p) === h)}` : `${h}:00`}
            />
          )
        })}
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <span>12 AM</span>
        <div className="flex-1 border-t border-dashed border-gray-300 mx-1" />
        <span>12 PM</span>
        <div className="flex-1 border-t border-dashed border-gray-300 mx-1" />
        <span>12 AM</span>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        {info.clockPositions.map((time, i) => (
          <span key={i} className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full text-sm font-semibold">
            🍽️ {time}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Step3MealFrequency() {
  const { dispatch } = useApp()
  const scenario = useActiveScenario()
  const { mealsPerDay } = scenario
  const info = MEAL_INFO[mealsPerDay]

  return (
    <div className="flex flex-col gap-5 max-w-2xl mx-auto w-full px-4 pb-2">
      <SectionHeading
        emoji="🕐"
        title="How Often Do You Eat?"
        subtitle="The number of times you eat per day is just as important as WHAT you eat!"
      />

      {/* Slider */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-600">1 meal</span>
          <motion.div
            key={mealsPerDay}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-extrabold text-purple-700"
          >
            {mealsPerDay} {mealsPerDay === 1 ? 'meal' : 'meals'} / day
          </motion.div>
          <span className="text-sm font-semibold text-gray-600">6 meals</span>
        </div>
        <SliderInput
          value={mealsPerDay}
          min={1}
          max={6}
          onChange={v => dispatch({ type: 'SET_MEALS', payload: v })}
        />
        <div className="flex justify-between mt-1 px-1">
          {[1,2,3,4,5,6].map(n => (
            <span key={n} className={`text-xs font-bold ${n === mealsPerDay ? 'text-purple-600' : 'text-gray-300'}`}>
              {n}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline visualization */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-5 shadow-sm">
        <p className="text-sm font-semibold text-gray-500 mb-3 text-center">Your day looks like this:</p>
        <MealTimeline meals={mealsPerDay} />
      </div>

      {/* Verdict */}
      <motion.div
        key={mealsPerDay}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border-2 p-4 ${VERDICT_STYLE[info.verdict]}`}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">{info.icon}</span>
          <div>
            <p className="font-bold text-sm">{info.label}</p>
            <p className="text-sm mt-0.5">{info.desc}</p>
          </div>
        </div>
      </motion.div>

      {/* Key lesson */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-800">
        <span className="font-bold">💡 Key idea:</span> Even if you eat the same total food, eating it in 3 sittings is much better than grazing all day. Your body needs <strong>breaks from insulin</strong> to stay lean!
      </div>

      <NavButtons />
    </div>
  )
}
