'use client'

import { AppProvider, useApp } from '../lib/context/AppContext'
import Header from './layout/Header'
import Sidebar from './sidebar/Sidebar'
import Dashboard from './dashboard/Dashboard'
import CompareLayout from './compare/CompareLayout'

function AppInner({ user }) {
  const { state } = useApp()
  const { compareMode } = state

  return (
    <div className="flex flex-col h-screen bg-zinc-50 overflow-hidden">
      <Header user={user} />
      <div className="flex flex-1 overflow-hidden">
        {compareMode ? (
          <CompareLayout user={user} />
        ) : (
          <>
            <Sidebar scenario="A" />
            <main className="flex-1 overflow-y-auto">
              <Dashboard scenario="A" user={user} />
            </main>
          </>
        )}
      </div>
    </div>
  )
}

export default function AppShell({ user }) {
  return (
    <AppProvider>
      <AppInner user={user} />
    </AppProvider>
  )
}
