import type { Reservation } from '../model/Reservation'
import { ReservationStatus } from '../model/ReservationStatus'

export class ReservationConflict {
  check(reservation: Reservation, existingReservations: Reservation[]): boolean {
    return existingReservations.some(
      (existing) =>
        existing.roomId === reservation.roomId &&
        existing.status === ReservationStatus.CONFIRMED &&
        existing.timeRange.start.getTime() < reservation.timeRange.end.getTime() &&
        reservation.timeRange.start.getTime() < existing.timeRange.end.getTime(),
    )
  }
}
