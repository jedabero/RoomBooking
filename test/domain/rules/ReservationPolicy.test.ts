import { describe, it, expect, vi, afterEach } from 'vitest'
import { TimeRange } from '../../../src/domain/model/TimeRange'
import { ReservationPolicy } from '../../../src/domain/rules/ReservationPolicy'

describe('ReservationPolicy', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  describe('validate', () => {
    it('shouldReturnTrueWhenDurationIsWithinLimit', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2026-01-01T08:00'))
      const policy = new ReservationPolicy()
      const timeRange = new TimeRange(new Date('2026-01-01T10:00'), new Date('2026-01-01T12:00'))

      const result = policy.validate('room-1', timeRange)

      expect(result).toBe(true)
    })

    it('shouldReturnFalseWhenDurationExceedsLimit', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2026-01-01T08:00'))
      const policy = new ReservationPolicy()
      const timeRange = new TimeRange(new Date('2026-01-01T10:00'), new Date('2026-01-01T18:00'))

      const result = policy.validate('room-1', timeRange)

      expect(result).toBe(false)
    })

    it('shouldReturnFalseWhenStartIsInPast', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2026-01-01T12:00'))
      const policy = new ReservationPolicy()
      const timeRange = new TimeRange(new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00'))

      const result = policy.validate('room-1', timeRange)

      expect(result).toBe(false)
    })

    it('shouldReturnFalseWhenDurationIsZero', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2026-01-01T08:00'))
      const policy = new ReservationPolicy()
      const timeRange = new TimeRange(new Date('2026-01-01T10:00'), new Date('2026-01-01T10:00'))

      const result = policy.validate('room-1', timeRange)

      expect(result).toBe(false)
    })

    it('shouldReturnTrueWhenValidWithAdvanceBooking', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2026-01-01T08:00'))
      const policy = new ReservationPolicy()
      const timeRange = new TimeRange(new Date('2026-01-15T10:00'), new Date('2026-01-15T12:00'))

      const result = policy.validate('room-1', timeRange)

      expect(result).toBe(true)
    })

    it('shouldReturnFalseWhenAdvanceBookingExceedsLimit', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2026-01-01T08:00'))
      const policy = new ReservationPolicy()
      const timeRange = new TimeRange(new Date('2026-03-01T10:00'), new Date('2026-03-01T12:00'))

      const result = policy.validate('room-1', timeRange)

      expect(result).toBe(false)
    })
  })
})
