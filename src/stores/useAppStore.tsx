import * as React from 'react'

interface AppState {
  xp: number
  gems: number
  hearts: number
  streak: number
  currentUnit: number
  currentLevel: number
  completedLevels: string[] // e.g., "u1-l1", "u1-l2"
  unlockedLevels: string[]
}

type Action =
  | { type: 'ADD_XP'; payload: number }
  | { type: 'SPEND_GEMS'; payload: number }
  | { type: 'LOSE_HEART' }
  | { type: 'REFILL_HEARTS' }
  | { type: 'COMPLETE_LEVEL'; payload: { unitId: number; levelId: number } }
  | { type: 'RESET' }

const initialState: AppState = {
  xp: 1250,
  gems: 450,
  hearts: 5,
  streak: 12,
  currentUnit: 1,
  currentLevel: 3,
  completedLevels: ['1-1', '1-2'],
  unlockedLevels: ['1-1', '1-2', '1-3'],
}

const AppContext = React.createContext<
  | {
      state: AppState
      dispatch: React.Dispatch<Action>
    }
  | undefined
>(undefined)

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_XP':
      return { ...state, xp: state.xp + action.payload }
    case 'SPEND_GEMS':
      if (state.gems < action.payload) return state
      return { ...state, gems: state.gems - action.payload }
    case 'LOSE_HEART':
      return { ...state, hearts: Math.max(0, state.hearts - 1) }
    case 'REFILL_HEARTS':
      return { ...state, hearts: 5 }
    case 'COMPLETE_LEVEL': {
      const levelIdStr = `${action.payload.unitId}-${action.payload.levelId}`
      const nextLevelId = action.payload.levelId + 1
      const nextLevelStr = `${action.payload.unitId}-${nextLevelId}`

      const newCompleted = state.completedLevels.includes(levelIdStr)
        ? state.completedLevels
        : [...state.completedLevels, levelIdStr]

      const newUnlocked = state.unlockedLevels.includes(nextLevelStr)
        ? state.unlockedLevels
        : [...state.unlockedLevels, nextLevelStr]

      return {
        ...state,
        completedLevels: newCompleted,
        unlockedLevels: newUnlocked,
        currentLevel: Math.max(state.currentLevel, nextLevelId),
      }
    }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(appReducer, initialState)

  return React.createElement(
    AppContext.Provider,
    { value: { state, dispatch } },
    children,
  )
}

function useAppStore() {
  const context = React.useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppStore must be used within a AppProvider')
  }
  return context
}

export default useAppStore
