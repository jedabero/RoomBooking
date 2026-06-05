import type { TimeRange } from './TimeRange'
import type { ReservationStatus } from './ReservationStatus'

export class Reservation {
  constructor(
    public readonly id: string,
    public readonly roomId: string,
    public readonly userId: string,
    public readonly timeRange: TimeRange,
    public readonly status: ReservationStatus,
    public readonly createdAt: Date,
  ) {}
}
