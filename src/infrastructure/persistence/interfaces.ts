import type { Reservation } from '../../domain/model/Reservation'
import type { Room } from '../../domain/model/Room'

export type StoredRoom = {
  room: Room
  active: boolean
}

export interface RoomRepository {
  save(room: StoredRoom): void
  findById(id: string): StoredRoom | undefined
  findAll(): StoredRoom[]
}

export interface ReservationRepository {
  save(reservation: Reservation): void
  findById(id: string): Reservation | undefined
  findAll(): Reservation[]
  findByRoomId(roomId: string): Reservation[]
}
