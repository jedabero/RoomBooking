import { describe, expect, it } from 'vitest'
import { RoomService } from '../../../src/application/services/RoomService'
import { Room } from '../../../src/domain/model/Room'
import { UserRole } from '../../../src/domain/model/UserRole'
import { InMemoryRoomRepository } from '../../../src/infrastructure/persistence/InMemoryRoomRepository'

describe('RoomService integration', () => {
  it('shouldRejectAdministrativeActionWhenActorIsUser', () => {
    // Arrange / Given
    const rooms = new InMemoryRoomRepository()
    const service = new RoomService(rooms)

    // Act / When
    const result = service.createRoom(new Room('room-1', 'Sala Principal', 10), UserRole.USER)

    // Assert / Then
    expect(result).toEqual({ ok: false, error: 'UNAUTHORIZED' })
    expect(rooms.findAll()).toEqual([])
  })

  it('shouldPersistRoomWhenActorIsAdmin', () => {
    // Arrange / Given
    const rooms = new InMemoryRoomRepository()
    const service = new RoomService(rooms)

    // Act / When
    const result = service.createRoom(new Room('room-1', 'Sala Principal', 10), UserRole.ADMIN)

    // Assert / Then
    expect(result.ok).toBe(true)
    expect(rooms.findById('room-1')).toEqual(expect.objectContaining({ active: true }))
  })
})
