import type { Room } from '../../domain/model/Room'
import type { UserRole } from '../../domain/model/UserRole'
import { Permission } from '../../domain/rules/Permission'
import { RoomValidation } from '../../domain/rules/RoomValidation'
import type { RoomRepository, StoredRoom } from '../../infrastructure/persistence/interfaces'

export type RoomServiceError = 'UNAUTHORIZED' | 'INVALID_ROOM' | 'ROOM_NOT_FOUND'

export type RoomServiceResult<T> =
  | { ok: true, value: T }
  | { ok: false, error: RoomServiceError }

export class RoomService {
  constructor(
    private readonly rooms: RoomRepository,
    private readonly permission = new Permission(),
    private readonly validator = new RoomValidation(),
  ) {}

  createRoom(room: Room, actorRole: UserRole): RoomServiceResult<StoredRoom> {
    if (!this.permission.hasPermission(actorRole, 'room:create')) {
      return { ok: false, error: 'UNAUTHORIZED' }
    }

    if (!this.validator.validate(room)) {
      return { ok: false, error: 'INVALID_ROOM' }
    }

    const storedRoom = { room, active: true }
    this.rooms.save(storedRoom)
    return { ok: true, value: storedRoom }
  }

  deactivateRoom(roomId: string, actorRole: UserRole): RoomServiceResult<StoredRoom> {
    if (!this.permission.hasPermission(actorRole, 'room:create')) {
      return { ok: false, error: 'UNAUTHORIZED' }
    }

    const existing = this.rooms.findById(roomId)
    if (!existing) {
      return { ok: false, error: 'ROOM_NOT_FOUND' }
    }

    const inactiveRoom = { ...existing, active: false }
    this.rooms.save(inactiveRoom)
    return { ok: true, value: inactiveRoom }
  }
}
