import type { Reservation } from '../model/Reservation'
import { ReservationStatus } from '../model/ReservationStatus'

export class ReservationConflict {
  check(reservation: Reservation, existingReservations: Reservation[]): boolean {
    return existingReservations.some((existing) => this.conflictsWith(reservation, existing))
  }

  private conflictsWith(a: Reservation, b: Reservation): boolean {
    if (a.roomId !== b.roomId) return false
    if (b.status !== ReservationStatus.CONFIRMED) return false
    return this.overlaps(a.timeRange.start.getTime(), a.timeRange.end.getTime(), b.timeRange.start.getTime(), b.timeRange.end.getTime())
  }

  private overlaps(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
    return aStart < bEnd && bStart < aEnd
  }
}
