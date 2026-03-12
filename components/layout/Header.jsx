'use client'

import { useApp } from '../../lib/context/AppContext'
import UserNav from '../UserNav'

export default function Header({ user }) {
  const { state, dispatch } = useApp()
  const { compareMode } = state

  return (
    <header className="h-12 bg-white border-b border-zinc-200 flex items-center justify-between px-6 flex-shrink-0 z-10">
      <div className="flex items-center gap-2.5">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-indigo-500">
          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 5v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="font-semibold text-zinc-900 tracking-tight">Glucose Explorer</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_COMPARE' })}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            compareMode
              ? 'bg-indigo-600 text-white'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="2" width="5" height="10" rx="1" stroke="currentColor" strokeWidth="1.3" />
            <rect x="8" y="2" width="5" height="10" rx="1" stroke="currentColor" strokeWidth="1.3" />
          </svg>
          Compare
        </button>

        <UserNav user={user} />
      </div>
    </header>
  )
}
