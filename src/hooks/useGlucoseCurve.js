import { useMemo } from 'react'
import { FOOD_BY_ID } from '../data/foods'
import { buildGlucoseCurve } from '../data/scienceEngine'

export function useGlucoseCurve(selectedFoodIds, mealsPerDay) {
  return useMemo(() => {
    const foods = selectedFoodIds.map(id => FOOD_BY_ID[id]).filter(Boolean)
    return buildGlucoseCurve(foods, mealsPerDay)
  }, [selectedFoodIds, mealsPerDay])
}
