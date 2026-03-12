import { createContext, useContext, useReducer } from 'react'

const initialState = {
  scenarioA: { selectedFoods: [], mealsPerDay: 3 },
  scenarioB: { selectedFoods: [], mealsPerDay: 3 },
  activeScenario: 'A',
  compareMode: false,
  timelineWeeks: 12,
  selectedMacroTab: 'carbs',
}

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FOOD': {
      const key = state.activeScenario === 'A' ? 'scenarioA' : 'scenarioB'
      const scenario = state[key]
      const exists = scenario.selectedFoods.includes(action.payload)
      return {
        ...state,
        [key]: {
          ...scenario,
          selectedFoods: exists
            ? scenario.selectedFoods.filter(id => id !== action.payload)
            : [...scenario.selectedFoods, action.payload],
        },
      }
    }

    case 'TOGGLE_FOOD_IN': {
      const key = action.scenario === 'A' ? 'scenarioA' : 'scenarioB'
      const scenario = state[key]
      const exists = scenario.selectedFoods.includes(action.payload)
      return {
        ...state,
        [key]: {
          ...scenario,
          selectedFoods: exists
            ? scenario.selectedFoods.filter(id => id !== action.payload)
            : [...scenario.selectedFoods, action.payload],
        },
      }
    }

    case 'SET_MEALS': {
      const key = state.activeScenario === 'A' ? 'scenarioA' : 'scenarioB'
      return { ...state, [key]: { ...state[key], mealsPerDay: action.payload } }
    }

    case 'SET_MEALS_IN': {
      const key = action.scenario === 'A' ? 'scenarioA' : 'scenarioB'
      return { ...state, [key]: { ...state[key], mealsPerDay: action.payload } }
    }

    case 'SET_ACTIVE_SCENARIO':
      return { ...state, activeScenario: action.payload }

    case 'TOGGLE_COMPARE':
      return {
        ...state,
        compareMode: !state.compareMode,
        scenarioB: !state.compareMode
          ? { selectedFoods: [], mealsPerDay: 3 }
          : state.scenarioB,
      }

    case 'SET_MACRO_TAB':
      return { ...state, selectedMacroTab: action.payload }

    case 'SET_TIMELINE_WEEKS':
      return { ...state, timelineWeeks: action.payload }

    case 'RESET_SCENARIO': {
      const key = action.scenario === 'A' ? 'scenarioA' : 'scenarioB'
      return { ...state, [key]: { selectedFoods: [], mealsPerDay: 3 } }
    }

    default:
      return state
  }
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}

export function useActiveScenario() {
  const { state } = useApp()
  return state.activeScenario === 'A' ? state.scenarioA : state.scenarioB
}
