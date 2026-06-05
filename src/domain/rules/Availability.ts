import type { TimeRange } from '../model/TimeRange'
import type { Reservation } from '../model/Reservation'

export class Availability {
  isAvailable(roomId: string, timeRange: TimeRange, reservations: Reservation[]): boolean {
    throw new Error('not implemented')
  }
}
