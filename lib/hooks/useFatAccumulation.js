import { useMemo } from 'react'
import { calculateFatScore } from '../data/scienceEngine'

export function useFatAccumulation(insulinPoints, weeks) {
  return useMemo(() => {
    return calculateFatScore(insulinPoints, weeks)
  }, [insulinPoints, weeks])
}
