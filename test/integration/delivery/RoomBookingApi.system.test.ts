import { afterEach, describe, expect, it, vi } from 'vitest'
import { AvailabilityService } from '../../../src/application/services/AvailabilityService'
import { ReservationService } from '../../../src/application/services/ReservationService'
import { RoomService } from '../../../src/application/services/RoomService'
import { RoomBookingApi } from '../../../src/delivery/http/RoomBookingApi'
import { UserRole } from '../../../src/domain/model/UserRole'
import { InMemoryReservationRepository } from '../../../src/infrastructure/persistence/InMemoryReservationRepository'
import { InMemoryRoomRepository } from '../../../src/infrastructure/persistence/InMemoryRoomRepository'

function setupApi(): RoomBookingApi {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2025-12-20T08:00:00'))

  const rooms = new InMemoryRoomRepository()
  const reservations = new InMemoryReservationRepository()

  return new RoomBookingApi(
    new RoomService(rooms),
    new ReservationService(rooms, reservations),
    new AvailabilityService(rooms, reservations),
  )
}

describe('RoomBookingApi system test', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shouldReturn201WhenReservationIsCreated', () => {
    // Arrange / Given
    const api = setupApi()
    api.postRoom({ id: 'room-1', name: 'Sala Principal', capacity: 10, actorRole: UserRole.ADMIN })

    // Act / When
    const response = api.postReservation({
      id: 'reservation-1',
      roomId: 'room-1',
      userId: 'user-1',
      start: '2026-01-01T09:00:00',
      end: '2026-01-01T10:00:00',
      actorRole: UserRole.USER,
    })

    // Assert / Then
    expect(response.status).toBe(201)
    expect(response.body).toEqual(expect.objectContaining({ id: 'reservation-1', roomId: 'room-1' }))
  })

  it('shouldReturn409WhenReservationHasConflict', () => {
    // Arrange / Given
    const api = setupApi()
    api.postRoom({ id: 'room-1', name: 'Sala Principal', capacity: 10, actorRole: UserRole.ADMIN })
    api.postReservation({
      id: 'reservation-1',
      roomId: 'room-1',
      userId: 'user-1',
      start: '2026-01-01T09:00:00',
      end: '2026-01-01T10:00:00',
      actorRole: UserRole.USER,
    })

    // Act / When
    const response = api.postReservation({
      id: 'reservation-2',
      roomId: 'room-1',
      userId: 'user-2',
      start: '2026-01-01T09:30:00',
      end: '2026-01-01T10:30:00',
      actorRole: UserRole.USER,
    })

    // Assert / Then
    expect(response).toEqual({ status: 409, body: { error: 'RESERVATION_CONFLICT' } })
  })

  it('shouldReturn200WhenAvailabilityIsRequested', () => {
    // Arrange / Given
    const api = setupApi()
    api.postRoom({ id: 'room-1', name: 'Sala Principal', capacity: 10, actorRole: UserRole.ADMIN })
    api.postRoom({ id: 'room-2', name: 'Sala Alterna', capacity: 8, actorRole: UserRole.ADMIN })
    api.postReservation({
      id: 'reservation-1',
      roomId: 'room-1',
      userId: 'user-1',
      start: '2026-01-01T09:00:00',
      end: '2026-01-01T10:00:00',
      actorRole: UserRole.USER,
    })

    // Act / When
    const response = api.getAvailability({ start: '2026-01-01T09:30:00', end: '2026-01-01T10:30:00' })

    // Assert / Then
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ rooms: [expect.objectContaining({ id: 'room-2' })] })
  })

  it('shouldReturn403WhenUserTriesAdministrativeAction', () => {
    // Arrange / Given
    const api = setupApi()

    // Act / When
    const response = api.postRoom({ id: 'room-1', name: 'Sala Principal', capacity: 10, actorRole: UserRole.USER })

    // Assert / Then
    expect(response).toEqual({ status: 403, body: { error: 'UNAUTHORIZED' } })
  })

  it('shouldReturn400WhenReservationDatesAreInvalid', () => {
    // Arrange / Given
    const api = setupApi()
    api.postRoom({ id: 'room-1', name: 'Sala Principal', capacity: 10, actorRole: UserRole.ADMIN })

    // Act / When
    const response = api.postReservation({
      id: 'reservation-1',
      roomId: 'room-1',
      userId: 'user-1',
      start: 'invalid-date',
      end: '2026-01-01T10:00:00',
      actorRole: UserRole.USER,
    })

    // Assert / Then
    expect(response).toEqual({ status: 400, body: { error: 'INVALID_RESERVATION' } })
  })
})
