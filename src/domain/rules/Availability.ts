import type { TimeRange } from '../model/TimeRange'
import type { Reservation } from '../model/Reservation'
import { ReservationStatus } from '../model/ReservationStatus'

export class Availability {
  isAvailable(roomId: string, timeRange: TimeRange, reservations: Reservation[]): boolean {
    return !reservations.some(
      (r) =>
        r.roomId === roomId &&
        r.status === ReservationStatus.CONFIRMED &&
        r.timeRange.start.getTime() < timeRange.end.getTime() &&
        timeRange.start.getTime() < r.timeRange.end.getTime(),
    )
  }
}
