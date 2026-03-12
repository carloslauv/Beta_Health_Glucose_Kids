import { AppProvider, useApp } from './context/AppContext'
import Header from './components/layout/Header'
import Sidebar from './components/sidebar/Sidebar'
import Dashboard from './components/dashboard/Dashboard'
import CompareLayout from './components/compare/CompareLayout'

function AppInner() {
  const { state } = useApp()
  const { compareMode } = state

  return (
    <div className="flex flex-col h-screen bg-zinc-50 overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {compareMode ? (
          <CompareLayout />
        ) : (
          <>
            <Sidebar scenario="A" />
            <main className="flex-1 overflow-y-auto">
              <Dashboard scenario="A" />
            </main>
          </>
        )}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
