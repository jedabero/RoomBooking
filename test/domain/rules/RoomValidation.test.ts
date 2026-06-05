import { describe, it, expect } from 'vitest'
import { Room } from '../../../src/domain/model/Room'
import { RoomValidation } from '../../../src/domain/rules/RoomValidation'

describe('RoomValidation', () => {
  describe('validate', () => {
    it('shouldReturnTrueWhenRoomIsValid', () => {
      // Given a room with all required fields
      const room = new Room('1', 'Sala A', 10)
      const validator = new RoomValidation()

      // When the room is validated
      const result = validator.validate(room)

      // Then the result should be true
      expect(result).toBe(true)
    })

    it('shouldReturnTrueWhenLocationIsProvided', () => {
      // Given a room with an optional location
      const room = new Room('2', 'Sala B', 5, 'Piso 1')
      const validator = new RoomValidation()

      // When the room is validated
      const result = validator.validate(room)

      // Then the result should be true
      expect(result).toBe(true)
    })

    it('shouldReturnFalseWhenIdIsEmpty', () => {
      // Given a room with an empty id
      const room = new Room('', 'Sala C', 8)
      const validator = new RoomValidation()

      // When the room is validated
      const result = validator.validate(room)

      // Then the result should be false
      expect(result).toBe(false)
    })

    it('shouldReturnFalseWhenNameIsEmpty', () => {
      // Given a room with an empty name
      const room = new Room('3', '', 8)
      const validator = new RoomValidation()

      // When the room is validated
      const result = validator.validate(room)

      // Then the result should be false
      expect(result).toBe(false)
    })

    it('shouldReturnFalseWhenCapacityIsZero', () => {
      // Given a room with capacity of zero (boundary value)
      const room = new Room('4', 'Sala D', 0)
      const validator = new RoomValidation()

      // When the room is validated
      const result = validator.validate(room)

      // Then the result should be false
      expect(result).toBe(false)
    })

    it('shouldReturnFalseWhenCapacityIsNegative', () => {
      // Given a room with a negative capacity
      const room = new Room('5', 'Sala E', -1)
      const validator = new RoomValidation()

      // When the room is validated
      const result = validator.validate(room)

      // Then the result should be false
      expect(result).toBe(false)
    })

    it('shouldReturnFalseWhenCapacityIsNotInteger', () => {
      // Given a room with a non-integer capacity
      const room = new Room('6', 'Sala F', 2.5)
      const validator = new RoomValidation()

      // When the room is validated
      const result = validator.validate(room)

      // Then the result should be false
      expect(result).toBe(false)
    })
  })
})
