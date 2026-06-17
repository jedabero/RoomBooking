import type { TimeRange } from '../model/TimeRange'

const ONE_HOUR_MS = 60 * 60 * 1000
const MAX_DURATION_MS = 4 * ONE_HOUR_MS
const MAX_ADVANCE_MS = 30 * 24 * ONE_HOUR_MS

export class ReservationPolicy {
  validate(_roomId: string, timeRange: TimeRange): boolean {
    return (
      this.hasValidDuration(timeRange) &&
      this.isInFuture(timeRange) &&
      this.isWithinAdvanceLimit(timeRange)
    )
  }

  private hasValidDuration(timeRange: TimeRange): boolean {
    const durationMs = timeRange.end.getTime() - timeRange.start.getTime()
    return durationMs > 0 && durationMs <= MAX_DURATION_MS
  }

  private isInFuture(timeRange: TimeRange): boolean {
    return timeRange.start.getTime() > Date.now()
  }

  private isWithinAdvanceLimit(timeRange: TimeRange): boolean {
    const advanceMs = timeRange.start.getTime() - Date.now()
    return advanceMs <= MAX_ADVANCE_MS
  }
}
