import { describe, it, expect } from 'vitest'
import { Reservation } from '../../../src/domain/model/Reservation'
import { TimeRange } from '../../../src/domain/model/TimeRange'
import { ReservationStatus } from '../../../src/domain/model/ReservationStatus'
import { Availability } from '../../../src/domain/rules/Availability'

function makeReservation(id: string, roomId: string, start: Date, end: Date, status: ReservationStatus = ReservationStatus.CONFIRMED): Reservation {
  return new Reservation(id, roomId, 'user-1', new TimeRange(start, end), status, new Date())
}

describe('Availability', () => {
  describe('isAvailable', () => {
    it('shouldReturnTrueWhenNoReservations', () => {
      const availability = new Availability()
      const timeRange = new TimeRange(new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00'))

      const result = availability.isAvailable('room-1', timeRange, [])

      expect(result).toBe(true)
    })

    it('shouldReturnTrueWhenDifferentRoom', () => {
      const availability = new Availability()
      const timeRange = new TimeRange(new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00'))
      const reservations = [
        makeReservation('1', 'room-2', new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00')),
      ]

      const result = availability.isAvailable('room-1', timeRange, reservations)

      expect(result).toBe(true)
    })

    it('shouldReturnTrueWhenNoOverlap', () => {
      const availability = new Availability()
      const timeRange = new TimeRange(new Date('2026-01-01T12:00'), new Date('2026-01-01T13:00'))
      const reservations = [
        makeReservation('1', 'room-1', new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00')),
      ]

      const result = availability.isAvailable('room-1', timeRange, reservations)

      expect(result).toBe(true)
    })

    it('shouldReturnFalseWhenExactOverlap', () => {
      const availability = new Availability()
      const timeRange = new TimeRange(new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00'))
      const reservations = [
        makeReservation('1', 'room-1', new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00')),
      ]

      const result = availability.isAvailable('room-1', timeRange, reservations)

      expect(result).toBe(false)
    })

    it('shouldReturnFalseWhenPartialOverlap', () => {
      const availability = new Availability()
      const timeRange = new TimeRange(new Date('2026-01-01T09:00'), new Date('2026-01-01T11:00'))
      const reservations = [
        makeReservation('1', 'room-1', new Date('2026-01-01T10:00'), new Date('2026-01-01T12:00')),
      ]

      const result = availability.isAvailable('room-1', timeRange, reservations)

      expect(result).toBe(false)
    })

    it('shouldReturnTrueWhenExistingIsCancelled', () => {
      const availability = new Availability()
      const timeRange = new TimeRange(new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00'))
      const reservations = [
        makeReservation('1', 'room-1', new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00'), ReservationStatus.CANCELLED),
      ]

      const result = availability.isAvailable('room-1', timeRange, reservations)

      expect(result).toBe(true)
    })

    it('shouldReturnFalseWhenMultipleConflicts', () => {
      const availability = new Availability()
      const timeRange = new TimeRange(new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00'))
      const reservations = [
        makeReservation('1', 'room-2', new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00')),
        makeReservation('2', 'room-1', new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00')),
        makeReservation('3', 'room-3', new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00')),
      ]

      const result = availability.isAvailable('room-1', timeRange, reservations)

      expect(result).toBe(false)
    })
  })
})
