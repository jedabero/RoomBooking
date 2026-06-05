import type { Room } from '../model/Room'

const MIN_CAPACITY = 1

export class RoomValidation {
  validate(room: Room): boolean {
    return (
      this.hasValidId(room.id) &&
      this.hasValidName(room.name) &&
      this.hasValidCapacity(room.capacity)
    )
  }

  private hasValidId(id: string): boolean {
    return id.length > 0
  }

  private hasValidName(name: string): boolean {
    return name.length > 0
  }

  private hasValidCapacity(capacity: number): boolean {
    return Number.isInteger(capacity) && capacity >= MIN_CAPACITY
  }
}
