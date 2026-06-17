import { describe, it, expect } from 'vitest'
import { Reservation } from '../../../src/domain/model/Reservation'
import { TimeRange } from '../../../src/domain/model/TimeRange'
import { ReservationStatus } from '../../../src/domain/model/ReservationStatus'
import { ReservationConflict } from '../../../src/domain/rules/ReservationConflict'

function makeReservation(id: string, roomId: string, start: Date, end: Date, status: ReservationStatus = ReservationStatus.CONFIRMED): Reservation {
  return new Reservation(id, roomId, 'user-1', new TimeRange(start, end), status, new Date())
}

describe('ReservationConflict', () => {
  describe('check', () => {
    it('shouldReturnFalseWhenExistingListIsEmpty', () => {
      const conflict = new ReservationConflict()
      const reservation = makeReservation('1', 'room-1', new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00'))

      const result = conflict.check(reservation, [])

      expect(result).toBe(false)
    })

    it('shouldReturnFalseWhenDifferentRoom', () => {
      const conflict = new ReservationConflict()
      const reservation = makeReservation('1', 'room-1', new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00'))
      const existing = [
        makeReservation('2', 'room-2', new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00')),
      ]

      const result = conflict.check(reservation, existing)

      expect(result).toBe(false)
    })

    it('shouldReturnFalseWhenNoOverlapSameRoom', () => {
      const conflict = new ReservationConflict()
      const reservation = makeReservation('1', 'room-1', new Date('2026-01-01T12:00'), new Date('2026-01-01T13:00'))
      const existing = [
        makeReservation('2', 'room-1', new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00')),
      ]

      const result = conflict.check(reservation, existing)

      expect(result).toBe(false)
    })

    it('shouldReturnTrueWhenExactOverlap', () => {
      const conflict = new ReservationConflict()
      const reservation = makeReservation('1', 'room-1', new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00'))
      const existing = [
        makeReservation('2', 'room-1', new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00')),
      ]

      const result = conflict.check(reservation, existing)

      expect(result).toBe(true)
    })

    it('shouldReturnTrueWhenPartialOverlapStart', () => {
      const conflict = new ReservationConflict()
      const reservation = makeReservation('1', 'room-1', new Date('2026-01-01T09:00'), new Date('2026-01-01T11:00'))
      const existing = [
        makeReservation('2', 'room-1', new Date('2026-01-01T10:00'), new Date('2026-01-01T12:00')),
      ]

      const result = conflict.check(reservation, existing)

      expect(result).toBe(true)
    })

    it('shouldReturnTrueWhenPartialOverlapEnd', () => {
      const conflict = new ReservationConflict()
      const reservation = makeReservation('1', 'room-1', new Date('2026-01-01T10:00'), new Date('2026-01-01T12:00'))
      const existing = [
        makeReservation('2', 'room-1', new Date('2026-01-01T09:00'), new Date('2026-01-01T11:00')),
      ]

      const result = conflict.check(reservation, existing)

      expect(result).toBe(true)
    })

    it('shouldReturnTrueWhenNewContainsExisting', () => {
      const conflict = new ReservationConflict()
      const reservation = makeReservation('1', 'room-1', new Date('2026-01-01T09:00'), new Date('2026-01-01T13:00'))
      const existing = [
        makeReservation('2', 'room-1', new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00')),
      ]

      const result = conflict.check(reservation, existing)

      expect(result).toBe(true)
    })

    it('shouldReturnTrueWhenExistingContainsNew', () => {
      const conflict = new ReservationConflict()
      const reservation = makeReservation('1', 'room-1', new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00'))
      const existing = [
        makeReservation('2', 'room-1', new Date('2026-01-01T09:00'), new Date('2026-01-01T13:00')),
      ]

      const result = conflict.check(reservation, existing)

      expect(result).toBe(true)
    })

    it('shouldReturnFalseWhenExistingIsCancelled', () => {
      const conflict = new ReservationConflict()
      const reservation = makeReservation('1', 'room-1', new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00'))
      const existing = [
        makeReservation('2', 'room-1', new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00'), ReservationStatus.CANCELLED),
      ]

      const result = conflict.check(reservation, existing)

      expect(result).toBe(false)
    })
  })
})
