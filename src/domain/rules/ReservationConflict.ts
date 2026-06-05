import type { Reservation } from '../model/Reservation'

export class ReservationConflict {
  check(reservation: Reservation, existingReservations: Reservation[]): boolean {
    throw new Error('not implemented')
  }
}
