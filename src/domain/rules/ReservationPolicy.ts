import type { TimeRange } from '../model/TimeRange'

export class ReservationPolicy {
  validate(roomId: string, timeRange: TimeRange): boolean {
    throw new Error('not implemented')
  }
}
