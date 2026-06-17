import { afterEach, describe, expect, it, vi } from 'vitest'
import { ReservationService } from '../../../src/application/services/ReservationService'
import { Room } from '../../../src/domain/model/Room'
import { TimeRange } from '../../../src/domain/model/TimeRange'
import { UserRole } from '../../../src/domain/model/UserRole'
import { ReservationStatus } from '../../../src/domain/model/ReservationStatus'
import { InMemoryReservationRepository } from '../../../src/infrastructure/persistence/InMemoryReservationRepository'
import { InMemoryRoomRepository } from '../../../src/infrastructure/persistence/InMemoryRoomRepository'

function makeFutureRange(startHour: string, endHour: string): TimeRange {
  return new TimeRange(new Date(`2026-01-01T${startHour}:00`), new Date(`2026-01-01T${endHour}:00`))
}

function setup() {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2025-12-20T08:00:00'))

  const rooms = new InMemoryRoomRepository()
  const reservations = new InMemoryReservationRepository()
  const service = new ReservationService(rooms, reservations)
  rooms.save({ room: new Room('room-1', 'Sala Principal', 10), active: true })

  return { rooms, reservations, service }
}

describe('ReservationService integration', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shouldPersistReservationWhenRequestIsValid', () => {
    // Arrange / Given
    const { reservations, service } = setup()

    // Act / When
    const result = service.createReservation({
      id: 'reservation-1',
      roomId: 'room-1',
      userId: 'user-1',
      timeRange: makeFutureRange('09:00', '10:00'),
      actorRole: UserRole.USER,
    })

    // Assert / Then
    expect(result.ok).toBe(true)
    expect(reservations.findById('reservation-1')).toEqual(expect.objectContaining({
      id: 'reservation-1',
      roomId: 'room-1',
      status: ReservationStatus.CONFIRMED,
    }))
  })

  it('shouldRejectReservationWhenExactConflictExists', () => {
    // Arrange / Given
    const { service } = setup()
    service.createReservation({
      id: 'reservation-1',
      roomId: 'room-1',
      userId: 'user-1',
      timeRange: makeFutureRange('09:00', '10:00'),
      actorRole: UserRole.USER,
    })

    // Act / When
    const result = service.createReservation({
      id: 'reservation-2',
      roomId: 'room-1',
      userId: 'user-2',
      timeRange: makeFutureRange('09:00', '10:00'),
      actorRole: UserRole.USER,
    })

    // Assert / Then
    expect(result).toEqual({ ok: false, error: 'RESERVATION_CONFLICT' })
  })

  it('shouldRejectReservationWhenPartialConflictExists', () => {
    // Arrange / Given
    const { service } = setup()
    service.createReservation({
      id: 'reservation-1',
      roomId: 'room-1',
      userId: 'user-1',
      timeRange: makeFutureRange('09:00', '10:00'),
      actorRole: UserRole.USER,
    })

    // Act / When
    const result = service.createReservation({
      id: 'reservation-2',
      roomId: 'room-1',
      userId: 'user-2',
      timeRange: makeFutureRange('09:30', '10:30'),
      actorRole: UserRole.USER,
    })

    // Assert / Then
    expect(result).toEqual({ ok: false, error: 'RESERVATION_CONFLICT' })
  })

  it('shouldAllowConsecutiveReservationWhenRangesOnlyTouch', () => {
    // Arrange / Given
    const { reservations, service } = setup()
    service.createReservation({
      id: 'reservation-1',
      roomId: 'room-1',
      userId: 'user-1',
      timeRange: makeFutureRange('09:00', '10:00'),
      actorRole: UserRole.USER,
    })

    // Act / When
    const result = service.createReservation({
      id: 'reservation-2',
      roomId: 'room-1',
      userId: 'user-2',
      timeRange: makeFutureRange('10:00', '11:00'),
      actorRole: UserRole.USER,
    })

    // Assert / Then
    expect(result.ok).toBe(true)
    expect(reservations.findAll()).toHaveLength(2)
  })

  it('shouldAllowNewReservationWhenPreviousReservationWasCancelled', () => {
    // Arrange / Given
    const { reservations, service } = setup()
    service.createReservation({
      id: 'reservation-1',
      roomId: 'room-1',
      userId: 'user-1',
      timeRange: makeFutureRange('09:00', '10:00'),
      actorRole: UserRole.USER,
    })
    service.cancelReservation('reservation-1', UserRole.USER)

    // Act / When
    const result = service.createReservation({
      id: 'reservation-2',
      roomId: 'room-1',
      userId: 'user-2',
      timeRange: makeFutureRange('09:00', '10:00'),
      actorRole: UserRole.USER,
    })

    // Assert / Then
    expect(result.ok).toBe(true)
    expect(reservations.findById('reservation-1')?.status).toBe(ReservationStatus.CANCELLED)
    expect(reservations.findById('reservation-2')?.status).toBe(ReservationStatus.CONFIRMED)
  })

  it('shouldRejectReservationWhenRoomIsInactive', () => {
    // Arrange / Given
    const { rooms, service } = setup()
    rooms.save({ room: new Room('room-1', 'Sala Principal', 10), active: false })

    // Act / When
    const result = service.createReservation({
      id: 'reservation-1',
      roomId: 'room-1',
      userId: 'user-1',
      timeRange: makeFutureRange('09:00', '10:00'),
      actorRole: UserRole.USER,
    })

    // Assert / Then
    expect(result).toEqual({ ok: false, error: 'ROOM_INACTIVE' })
  })

  it('shouldRejectReservationWhenActorCannotCreateReservations', () => {
    // Arrange / Given
    const { service } = setup()

    // Act / When
    const result = service.createReservation({
      id: 'reservation-1',
      roomId: 'room-1',
      userId: 'user-1',
      timeRange: makeFutureRange('09:00', '10:00'),
      actorRole: UserRole.MANAGER,
    })

    // Assert / Then
    expect(result).toEqual({ ok: false, error: 'UNAUTHORIZED' })
  })

  it('shouldRejectReservationWhenRoomDoesNotExist', () => {
    // Arrange / Given
    const { service } = setup()

    // Act / When
    const result = service.createReservation({
      id: 'reservation-1',
      roomId: 'missing-room',
      userId: 'user-1',
      timeRange: makeFutureRange('09:00', '10:00'),
      actorRole: UserRole.USER,
    })

    // Assert / Then
    expect(result).toEqual({ ok: false, error: 'ROOM_NOT_FOUND' })
  })

  it('shouldRejectReservationWhenPolicyFails', () => {
    // Arrange / Given
    const { service } = setup()

    // Act / When
    const result = service.createReservation({
      id: 'reservation-1',
      roomId: 'room-1',
      userId: 'user-1',
      timeRange: makeFutureRange('09:00', '14:00'),
      actorRole: UserRole.USER,
    })

    // Assert / Then
    expect(result).toEqual({ ok: false, error: 'INVALID_RESERVATION' })
  })

  it('shouldRejectCancelReservationWhenActorCannotCreateReservations', () => {
    // Arrange / Given
    const { service } = setup()

    // Act / When
    const result = service.cancelReservation('reservation-1', UserRole.MANAGER)

    // Assert / Then
    expect(result).toEqual({ ok: false, error: 'UNAUTHORIZED' })
  })

  it('shouldRejectCancelReservationWhenReservationDoesNotExist', () => {
    // Arrange / Given
    const { service } = setup()

    // Act / When
    const result = service.cancelReservation('reservation-1', UserRole.USER)

    // Assert / Then
    expect(result).toEqual({ ok: false, error: 'RESERVATION_NOT_FOUND' })
  })
})
