import type { Room } from '../../domain/model/Room'
import type { TimeRange } from '../../domain/model/TimeRange'
import { Availability } from '../../domain/rules/Availability'
import type { ReservationRepository, RoomRepository } from '../../infrastructure/persistence/interfaces'

export class AvailabilityService {
  constructor(
    private readonly rooms: RoomRepository,
    private readonly reservations: ReservationRepository,
    private readonly availability = new Availability(),
  ) {}

  findAvailableRooms(timeRange: TimeRange): Room[] {
    const reservations = this.reservations.findAll()

    return this.rooms.findAll()
      .filter((storedRoom) => storedRoom.active)
      .filter((storedRoom) => this.availability.isAvailable(storedRoom.room.id, timeRange, reservations))
      .map((storedRoom) => storedRoom.room)
  }
}
