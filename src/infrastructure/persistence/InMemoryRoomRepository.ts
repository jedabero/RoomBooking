import type { StoredRoom, RoomRepository } from './interfaces'

export class InMemoryRoomRepository implements RoomRepository {
  private readonly rooms = new Map<string, StoredRoom>()

  save(room: StoredRoom): void {
    this.rooms.set(room.room.id, room)
  }

  findById(id: string): StoredRoom | undefined {
    return this.rooms.get(id)
  }

  findAll(): StoredRoom[] {
    return [...this.rooms.values()]
  }
}
