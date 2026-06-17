import { Reservation } from '../../domain/model/Reservation'
import { ReservationStatus } from '../../domain/model/ReservationStatus'
import type { TimeRange } from '../../domain/model/TimeRange'
import type { UserRole } from '../../domain/model/UserRole'
import { Permission } from '../../domain/rules/Permission'
import { ReservationConflict } from '../../domain/rules/ReservationConflict'
import { ReservationPolicy } from '../../domain/rules/ReservationPolicy'
import type { ReservationRepository, RoomRepository } from '../../infrastructure/persistence/interfaces'

export type CreateReservationRequest = {
  id: string
  roomId: string
  userId: string
  timeRange: TimeRange
  actorRole: UserRole
  createdAt?: Date
}

export type ReservationServiceError =
  | 'UNAUTHORIZED'
  | 'ROOM_NOT_FOUND'
  | 'ROOM_INACTIVE'
  | 'INVALID_RESERVATION'
  | 'RESERVATION_CONFLICT'
  | 'RESERVATION_NOT_FOUND'

export type ReservationServiceResult<T> =
  | { ok: true, value: T }
  | { ok: false, error: ReservationServiceError }

export class ReservationService {
  constructor(
    private readonly rooms: RoomRepository,
    private readonly reservations: ReservationRepository,
    private readonly permission = new Permission(),
    private readonly policy = new ReservationPolicy(),
    private readonly conflict = new ReservationConflict(),
  ) {}

  createReservation(request: CreateReservationRequest): ReservationServiceResult<Reservation> {
    if (!this.permission.hasPermission(request.actorRole, 'reservation:create')) {
      return { ok: false, error: 'UNAUTHORIZED' }
    }

    const room = this.rooms.findById(request.roomId)
    if (!room) {
      return { ok: false, error: 'ROOM_NOT_FOUND' }
    }

    if (!room.active) {
      return { ok: false, error: 'ROOM_INACTIVE' }
    }

    if (!this.policy.validate(request.roomId, request.timeRange)) {
      return { ok: false, error: 'INVALID_RESERVATION' }
    }

    const reservation = new Reservation(
      request.id,
      request.roomId,
      request.userId,
      request.timeRange,
      ReservationStatus.CONFIRMED,
      request.createdAt ?? new Date(),
    )

    if (this.conflict.check(reservation, this.reservations.findByRoomId(request.roomId))) {
      return { ok: false, error: 'RESERVATION_CONFLICT' }
    }

    this.reservations.save(reservation)
    return { ok: true, value: reservation }
  }

  cancelReservation(id: string, actorRole: UserRole): ReservationServiceResult<Reservation> {
    if (!this.permission.hasPermission(actorRole, 'reservation:create')) {
      return { ok: false, error: 'UNAUTHORIZED' }
    }

    const existing = this.reservations.findById(id)
    if (!existing) {
      return { ok: false, error: 'RESERVATION_NOT_FOUND' }
    }

    const cancelled = new Reservation(
      existing.id,
      existing.roomId,
      existing.userId,
      existing.timeRange,
      ReservationStatus.CANCELLED,
      existing.createdAt,
    )

    this.reservations.save(cancelled)
    return { ok: true, value: cancelled }
  }
}
