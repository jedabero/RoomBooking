import type { TimeRange } from '../model/TimeRange'

const ONE_HOUR_MS = 60 * 60 * 1000
const MAX_DURATION_MS = 4 * ONE_HOUR_MS
const MAX_ADVANCE_MS = 30 * 24 * ONE_HOUR_MS

export class ReservationPolicy {
  validate(_roomId: string, timeRange: TimeRange): boolean {
    const now = new Date()
    const durationMs = timeRange.end.getTime() - timeRange.start.getTime()
    const advanceMs = timeRange.start.getTime() - now.getTime()

    if (durationMs <= 0) return false
    if (durationMs > MAX_DURATION_MS) return false
    if (advanceMs < 0) return false
    if (advanceMs > MAX_ADVANCE_MS) return false
    return true
  }
}
