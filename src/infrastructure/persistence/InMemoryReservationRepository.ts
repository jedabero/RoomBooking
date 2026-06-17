import type { Reservation } from '../../domain/model/Reservation'
import type { ReservationRepository } from './interfaces'

export class InMemoryReservationRepository implements ReservationRepository {
  private readonly reservations = new Map<string, Reservation>()

  save(reservation: Reservation): void {
    this.reservations.set(reservation.id, reservation)
  }

  findById(id: string): Reservation | undefined {
    return this.reservations.get(id)
  }

  findAll(): Reservation[] {
    return [...this.reservations.values()]
  }

  findByRoomId(roomId: string): Reservation[] {
    return this.findAll().filter((reservation) => reservation.roomId === roomId)
  }
}
