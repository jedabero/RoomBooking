import type { TimeRange } from '../model/TimeRange'
import type { Reservation } from '../model/Reservation'
import { ReservationStatus } from '../model/ReservationStatus'

export class Availability {
  isAvailable(roomId: string, timeRange: TimeRange, reservations: Reservation[]): boolean {
    return !reservations.some((r) => this.makesUnavailable(roomId, timeRange, r))
  }

  private makesUnavailable(roomId: string, timeRange: TimeRange, reservation: Reservation): boolean {
    if (reservation.roomId !== roomId) return false
    if (reservation.status !== ReservationStatus.CONFIRMED) return false
    return reservation.timeRange.start.getTime() < timeRange.end.getTime() &&
      timeRange.start.getTime() < reservation.timeRange.end.getTime()
  }
}
