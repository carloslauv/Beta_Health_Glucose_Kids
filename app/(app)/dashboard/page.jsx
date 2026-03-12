import { auth } from '../../../lib/auth.js'
import AppShell from '../../../components/AppShell'

export default async function DashboardPage() {
  const session = await auth()
  // Dashboard is accessible to everyone; session just enables save-to-log
  const user = session?.user ?? null

  return <AppShell user={user} />
}
