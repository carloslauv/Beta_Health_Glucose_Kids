import { auth } from '../../../lib/auth.js'
import { getDb } from '../../../lib/db.js'
import { mealLogs } from '../../../lib/schema.js'
import { eq, desc } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { selectedFoods, mealsPerDay, peakGlucose, peakInsulin, insulinLoad, fatScore } =
    await request.json()

  const db = getDb()
  const [log] = await db
    .insert(mealLogs)
    .values({
      userId:       session.user.id,
      selectedFoods: selectedFoods.join(','),
      mealsPerDay,
      peakGlucose,
      peakInsulin,
      insulinLoad,
      fatScore,
    })
    .returning()

  return NextResponse.json({ log })
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const db = getDb()
  const logs = await db
    .select()
    .from(mealLogs)
    .where(eq(mealLogs.userId, session.user.id))
    .orderBy(desc(mealLogs.createdAt))
    .limit(20)

  return NextResponse.json({ logs })
}
