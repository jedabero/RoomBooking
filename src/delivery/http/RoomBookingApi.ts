import { AvailabilityService } from '../../application/services/AvailabilityService'
import type { CreateReservationRequest } from '../../application/services/ReservationService'
import { ReservationService } from '../../application/services/ReservationService'
import { RoomService } from '../../application/services/RoomService'
import { Room } from '../../domain/model/Room'
import { TimeRange } from '../../domain/model/TimeRange'
import type { UserRole } from '../../domain/model/UserRole'

export type ApiResponse<T = unknown> = {
  status: number
  body: T
}

export type CreateRoomBody = {
  id: string
  name: string
  capacity: number
  location?: string
  actorRole: UserRole
}

export type CreateReservationBody = {
  id: string
  roomId: string
  userId: string
  start: string
  end: string
  actorRole: UserRole
}

export type AvailabilityQuery = {
  start: string
  end: string
}

export class RoomBookingApi {
  constructor(
    private readonly rooms: RoomService,
    private readonly reservations: ReservationService,
    private readonly availability: AvailabilityService,
  ) {}

  postRoom(body: CreateRoomBody): ApiResponse {
    const result = this.rooms.createRoom(
      new Room(body.id, body.name, body.capacity, body.location),
      body.actorRole,
    )

    if (!result.ok) {
      return { status: result.error === 'UNAUTHORIZED' ? 403 : 400, body: { error: result.error } }
    }

    return { status: 201, body: result.value }
  }

  deactivateRoom(roomId: string, actorRole: UserRole): ApiResponse {
    const result = this.rooms.deactivateRoom(roomId, actorRole)

    if (!result.ok) {
      const status = result.error === 'UNAUTHORIZED' ? 403 : 404
      return { status, body: { error: result.error } }
    }

    return { status: 200, body: result.value }
  }

  postReservation(body: CreateReservationBody): ApiResponse {
    const timeRange = this.toTimeRange(body.start, body.end)
    if (!timeRange) {
      return { status: 400, body: { error: 'INVALID_RESERVATION' } }
    }

    const request: CreateReservationRequest = {
      id: body.id,
      roomId: body.roomId,
      userId: body.userId,
      timeRange,
      actorRole: body.actorRole,
    }
    const result = this.reservations.createReservation(request)

    if (!result.ok) {
      if (result.error === 'RESERVATION_CONFLICT') {
        return { status: 409, body: { error: result.error } }
      }

      if (result.error === 'UNAUTHORIZED') {
        return { status: 403, body: { error: result.error } }
      }

      if (result.error === 'ROOM_NOT_FOUND') {
        return { status: 404, body: { error: result.error } }
      }

      return { status: 400, body: { error: result.error } }
    }

    return { status: 201, body: result.value }
  }

  getAvailability(query: AvailabilityQuery): ApiResponse {
    const timeRange = this.toTimeRange(query.start, query.end)
    if (!timeRange) {
      return { status: 400, body: { error: 'INVALID_TIME_RANGE' } }
    }

    return { status: 200, body: { rooms: this.availability.findAvailableRooms(timeRange) } }
  }

  private toTimeRange(start: string, end: string): TimeRange | undefined {
    const startDate = new Date(start)
    const endDate = new Date(end)

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return undefined
    }

    return new TimeRange(startDate, endDate)
  }
}
