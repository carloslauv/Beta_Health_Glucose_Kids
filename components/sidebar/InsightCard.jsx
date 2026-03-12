'use client'

import { FOOD_BY_ID } from '../../lib/data/foods'

function getInsight(selectedFoodIds, mealsPerDay, fatScore, timelineWeeks) {
  if (selectedFoodIds.length === 0) {
    return {
      text: 'Select foods above to see your glucose and insulin response.',
      type: 'neutral',
    }
  }

  const foods = selectedFoodIds.map(id => FOOD_BY_ID[id]).filter(Boolean)
  const categories = new Set(foods.map(f => f.category))
  const hasSimpleCarb = foods.some(f => f.subcategory === 'simple_carb')
  const hasProtein = categories.has('protein')
  const hasFat = categories.has('fat')
  const hasFiber = categories.has('fiber')
  const hasCarb = categories.has('carbs')
  const moderatorCount = [hasProtein, hasFat, hasFiber].filter(Boolean).length

  if (mealsPerDay >= 5 && hasSimpleCarb) {
    return {
      text: `${mealsPerDay} meals of simple carbs keeps insulin elevated nearly all day — the body has almost no time in fat-burning mode.`,
      type: 'bad',
    }
  }
  if (mealsPerDay >= 5) {
    return {
      text: `Eating ${mealsPerDay} times a day keeps insulin elevated for most of the day, even with moderate foods. Reducing meal frequency helps.`,
      type: 'warning',
    }
  }
  if (moderatorCount === 3 && hasCarb) {
    return {
      text: 'Excellent combination — protein, fat, and fiber together cut the glucose spike by more than half compared to eating carbs alone.',
      type: 'good',
    }
  }
  if (moderatorCount >= 2 && hasCarb) {
    return {
      text: `Good plate — adding ${[hasProtein && 'protein', hasFat && 'fat', hasFiber && 'fiber'].filter(Boolean).join(' and ')} blunts the glucose spike by ~35–45%.`,
      type: 'good',
    }
  }
  if (hasSimpleCarb && moderatorCount === 0) {
    return {
      text: 'High spike expected from simple carbs alone. Try adding protein, fat, or vegetables to reduce the glucose rise significantly.',
      type: 'bad',
    }
  }
  if (!hasCarb) {
    return {
      text: 'Very low glucose impact — protein and fat cause minimal blood sugar changes. Insulin stays near baseline.',
      type: 'good',
    }
  }
  if (fatScore > 60 && timelineWeeks > 12) {
    return {
      text: `At this eating pattern over ${timelineWeeks} weeks, substantial fat accumulation builds. Reducing meal frequency and simple carbs makes a large difference.`,
      type: 'bad',
    }
  }
  return {
    text: 'Moderate glucose response. Complex carbs digest slowly — better than simple carbs, especially combined with other macros.',
    type: 'neutral',
  }
}

const TYPE_STYLE = {
  good:    'border-emerald-200 bg-emerald-50 text-emerald-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  bad:     'border-red-200 bg-red-50 text-red-800',
  neutral: 'border-zinc-200 bg-zinc-50 text-zinc-600',
}

const TYPE_BAR = {
  good:    'bg-emerald-500',
  warning: 'bg-amber-500',
  bad:     'bg-red-500',
  neutral: 'bg-zinc-400',
}

export default function InsightCard({ selectedFoodIds, mealsPerDay, fatScore, timelineWeeks }) {
  const { text, type } = getInsight(selectedFoodIds, mealsPerDay, fatScore, timelineWeeks)

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">Insight</p>
      <div className={`rounded-lg border p-3 flex gap-2.5 ${TYPE_STYLE[type]}`}>
        <div className={`w-0.5 rounded-full flex-shrink-0 self-stretch ${TYPE_BAR[type]}`} />
        <p className="text-xs leading-relaxed">{text}</p>
      </div>
    </div>
  )
}
