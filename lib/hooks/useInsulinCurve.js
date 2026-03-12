import { useMemo } from 'react'
import { deriveInsulinCurve } from '../data/scienceEngine'

export function useInsulinCurve(glucosePoints) {
  return useMemo(() => {
    return deriveInsulinCurve(glucosePoints)
  }, [glucosePoints])
}
