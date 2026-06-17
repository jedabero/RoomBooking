import { afterEach, describe, expect, it, vi } from 'vitest'
import { AvailabilityService } from '../../../src/application/services/AvailabilityService'
import { ReservationService } from '../../../src/application/services/ReservationService'
import { Room } from '../../../src/domain/model/Room'
import { TimeRange } from '../../../src/domain/model/TimeRange'
import { UserRole } from '../../../src/domain/model/UserRole'
import { InMemoryReservationRepository } from '../../../src/infrastructure/persistence/InMemoryReservationRepository'
import { InMemoryRoomRepository } from '../../../src/infrastructure/persistence/InMemoryRoomRepository'

function makeFutureRange(startHour: string, endHour: string): TimeRange {
  return new TimeRange(new Date(`2026-01-01T${startHour}:00`), new Date(`2026-01-01T${endHour}:00`))
}

describe('AvailabilityService integration', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shouldExcludeOccupiedAndInactiveRoomsFromAvailability', () => {
    // Arrange / Given
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-12-20T08:00:00'))
    const rooms = new InMemoryRoomRepository()
    const reservations = new InMemoryReservationRepository()
    const reservationService = new ReservationService(rooms, reservations)
    const availabilityService = new AvailabilityService(rooms, reservations)
    rooms.save({ room: new Room('room-1', 'Sala Ocupada', 10), active: true })
    rooms.save({ room: new Room('room-2', 'Sala Disponible', 8), active: true })
    rooms.save({ room: new Room('room-3', 'Sala Inactiva', 6), active: false })
    reservationService.createReservation({
      id: 'reservation-1',
      roomId: 'room-1',
      userId: 'user-1',
      timeRange: makeFutureRange('09:00', '10:00'),
      actorRole: UserRole.USER,
    })

    // Act / When
    const availableRooms = availabilityService.findAvailableRooms(makeFutureRange('09:30', '10:30'))

    // Assert / Then
    expect(availableRooms.map((room) => room.id)).toEqual(['room-2'])
  })
})
