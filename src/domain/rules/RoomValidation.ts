import type { Room } from '../model/Room'

export class RoomValidation {
  validate(room: Room): boolean {
    if (!room.id) return false
    if (!room.name) return false
    if (!Number.isInteger(room.capacity) || room.capacity <= 0) return false
    return true
  }
}
