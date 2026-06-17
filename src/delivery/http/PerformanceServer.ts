import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { URL } from 'node:url'
import { AvailabilityService } from '../../application/services/AvailabilityService'
import { ReservationService } from '../../application/services/ReservationService'
import { RoomService } from '../../application/services/RoomService'
import { ReservationStatus } from '../../domain/model/ReservationStatus'
import { Room } from '../../domain/model/Room'
import { TimeRange } from '../../domain/model/TimeRange'
import { UserRole } from '../../domain/model/UserRole'
import { InMemoryReservationRepository } from '../../infrastructure/persistence/InMemoryReservationRepository'
import { InMemoryRoomRepository } from '../../infrastructure/persistence/InMemoryRoomRepository'

type AvailabilityBody = {
  start?: string
  end?: string
  requiredCapacity?: number
}

type ReservationBody = {
  id?: string
  roomId?: string
  userId?: string
  start?: string
  end?: string
  actorRole?: UserRole
}

const DEFAULT_PORT = 3000

const seedRooms = [
  new Room('room-1', 'Sala Andromeda', 4, 'Piso 1'),
  new Room('room-2', 'Sala Boreal', 6, 'Piso 1'),
  new Room('room-3', 'Sala Centauri', 8, 'Piso 2'),
  new Room('room-4', 'Sala Draco', 10, 'Piso 2'),
  new Room('room-5', 'Sala Equinox', 12, 'Piso 3'),
  new Room('room-6', 'Sala Fenix', 16, 'Piso 3'),
]

function createRuntime() {
  const rooms = new InMemoryRoomRepository()
  const reservations = new InMemoryReservationRepository()
  const roomService = new RoomService(rooms)
  const reservationService = new ReservationService(rooms, reservations)
  const availabilityService = new AvailabilityService(rooms, reservations)

  for (const room of seedRooms) {
    roomService.createRoom(room, UserRole.ADMIN)
  }

  const now = Date.now()
  reservationService.createReservation({
    id: 'seed-reservation-1',
    roomId: 'room-1',
    userId: 'seed-user-1',
    timeRange: new TimeRange(new Date(now + 2 * 60 * 60 * 1000), new Date(now + 3 * 60 * 60 * 1000)),
    actorRole: UserRole.USER,
  })

  return { rooms, reservations, reservationService, availabilityService }
}

let runtime = createRuntime()

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`)

  try {
    if (request.method === 'GET' && url.pathname === '/health') {
      return sendJson(response, 200, {
        status: 'ok',
        rooms: runtime.rooms.findAll().length,
        reservations: runtime.reservations.findAll().length,
      })
    }

    if (request.method === 'POST' && url.pathname === '/api/test/reset') {
      runtime = createRuntime()
      return sendJson(response, 200, { status: 'reset' })
    }

    if (request.method === 'POST' && url.pathname === '/api/availability') {
      const body = await readJson<AvailabilityBody>(request)
      const timeRange = parseTimeRange(body.start, body.end)
      if (!timeRange) {
        return sendJson(response, 400, { error: 'INVALID_TIME_RANGE' })
      }

      const requiredCapacity = body.requiredCapacity ?? 1
      const availableRooms = runtime.availabilityService
        .findAvailableRooms(timeRange)
        .filter((room) => room.capacity >= requiredCapacity)

      return sendJson(response, 200, { rooms: availableRooms })
    }

    if (request.method === 'POST' && url.pathname === '/api/reservations') {
      const body = await readJson<ReservationBody>(request)
      const timeRange = parseTimeRange(body.start, body.end)
      if (!body.id || !body.roomId || !body.userId || !timeRange) {
        return sendJson(response, 400, { error: 'INVALID_RESERVATION' })
      }

      const result = runtime.reservationService.createReservation({
        id: body.id,
        roomId: body.roomId,
        userId: body.userId,
        timeRange,
        actorRole: body.actorRole ?? UserRole.USER,
      })

      if (!result.ok) {
        return sendJson(response, mapReservationError(result.error), { error: result.error })
      }

      return sendJson(response, 201, serializeReservation(result.value))
    }

    const cancelMatch = url.pathname.match(/^\/api\/reservations\/([^/]+)\/cancel$/)
    if (request.method === 'PATCH' && cancelMatch) {
      const result = runtime.reservationService.cancelReservation(cancelMatch[1], UserRole.USER)
      if (!result.ok) {
        return sendJson(response, mapReservationError(result.error), { error: result.error })
      }

      return sendJson(response, 200, serializeReservation(result.value))
    }

    return sendJson(response, 404, { error: 'NOT_FOUND' })
  } catch (error) {
    return sendJson(response, 500, {
      error: 'INTERNAL_ERROR',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

function parseTimeRange(start?: string, end?: string): TimeRange | undefined {
  if (!start || !end) {
    return undefined
  }

  const startDate = new Date(start)
  const endDate = new Date(end)
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return undefined
  }

  return new TimeRange(startDate, endDate)
}

function mapReservationError(error: string): number {
  if (error === 'RESERVATION_CONFLICT') {
    return 409
  }

  if (error === 'UNAUTHORIZED') {
    return 403
  }

  if (error === 'ROOM_NOT_FOUND' || error === 'RESERVATION_NOT_FOUND') {
    return 404
  }

  return 400
}

function serializeReservation(reservation: {
  id: string
  roomId: string
  userId: string
  status: ReservationStatus
  createdAt: Date
  timeRange: TimeRange
}) {
  return {
    id: reservation.id,
    roomId: reservation.roomId,
    userId: reservation.userId,
    status: reservation.status,
    start: reservation.timeRange.start.toISOString(),
    end: reservation.timeRange.end.toISOString(),
    createdAt: reservation.createdAt.toISOString(),
  }
}

async function readJson<T>(request: IncomingMessage): Promise<T> {
  const chunks: Uint8Array[] = []

  for await (const chunk of request) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }

  const rawBody = Buffer.concat(chunks).toString('utf8')
  if (!rawBody) {
    return {} as T
  }

  return JSON.parse(rawBody) as T
}

function sendJson(response: ServerResponse, status: number, body: unknown) {
  response.writeHead(status, { 'content-type': 'application/json' })
  response.end(JSON.stringify(body))
}

const port = Number(process.env.PORT ?? DEFAULT_PORT)
server.listen(port, () => {
  console.log(`RoomBooking performance server listening on http://localhost:${port}`)
})
