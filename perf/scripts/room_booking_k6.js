import http from 'k6/http'
import { check, sleep } from 'k6'
import { Rate } from 'k6/metrics'

const scenarioName = __ENV.SCENARIO || 'baseline'
const baseUrl = __ENV.BASE_URL || 'http://localhost:3000'
const unexpectedErrors = new Rate('unexpected_errors')

export const options = buildOptions(scenarioName)

http.setResponseCallback(http.expectedStatuses({ min: 200, max: 399 }, 409))

export function setup() {
  http.post(`${baseUrl}/api/test/reset`, null, { tags: { endpoint: 'reset' } })
}

export default function () {
  const slot = uniqueSlot()
  const reservationId = `perf-${scenarioName}-${__VU}-${__ITER}-${Date.now()}`

  const health = http.get(`${baseUrl}/health`, { tags: { endpoint: 'health' } })
  const healthOk = check(health, {
    'health status is 200': (response) => response.status === 200,
  })
  unexpectedErrors.add(!healthOk)

  const availability = http.post(
    `${baseUrl}/api/availability`,
    JSON.stringify({ start: slot.start, end: slot.end, requiredCapacity: 4 }),
    jsonParams('availability'),
  )
  const availabilityOk = check(availability, {
    'availability status is 200': (response) => response.status === 200,
    'availability returns rooms': (response) => Array.isArray(response.json('rooms')),
  })
  unexpectedErrors.add(!availabilityOk)

  const reservation = http.post(
    `${baseUrl}/api/reservations`,
    JSON.stringify({
      id: reservationId,
      roomId: selectRoomId(),
      userId: `user-${__VU}`,
      start: slot.start,
      end: slot.end,
      actorRole: 'USER',
    }),
    jsonParams('reservations'),
  )
  const reservationOk = check(reservation, {
    'reservation status is 201 or expected conflict': (response) => response.status === 201 || response.status === 409,
  })
  unexpectedErrors.add(!reservationOk)

  if (reservation.status === 201 && (__ITER + __VU) % 2 === 0) {
    const cancel = http.patch(`${baseUrl}/api/reservations/${reservationId}/cancel`, null, jsonParams('cancel'))
    const cancelOk = check(cancel, {
      'cancel status is 200 or 204': (response) => response.status === 200 || response.status === 204,
    })
    unexpectedErrors.add(!cancelOk)
  }

  sleep(1)
}

function buildOptions(name) {
  const commonThresholds = thresholdsFor(name)

  const scenarios = {
    baseline: {
      executor: 'constant-vus',
      vus: 3,
      duration: '30s',
    },
    load: {
      executor: 'ramping-vus',
      stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 30 },
        { duration: '30s', target: 0 },
      ],
    },
    stress: {
      executor: 'ramping-vus',
      stages: [
        { duration: '30s', target: 25 },
        { duration: '1m', target: 60 },
        { duration: '30s', target: 0 },
      ],
    },
    spike: {
      executor: 'ramping-vus',
      stages: [
        { duration: '15s', target: 5 },
        { duration: '10s', target: 75 },
        { duration: '30s', target: 75 },
        { duration: '10s', target: 5 },
        { duration: '15s', target: 0 },
      ],
    },
    soak: {
      executor: 'constant-vus',
      vus: 20,
      duration: '4m',
    },
    regression: {
      executor: 'constant-vus',
      vus: 5,
      duration: '45s',
    },
  }

  if (!scenarios[name]) {
    throw new Error(`Unsupported SCENARIO: ${name}`)
  }

  return {
    scenarios: {
      [name]: scenarios[name],
    },
    thresholds: commonThresholds,
    summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)'],
  }
}

function thresholdsFor(name) {
  const thresholds = {
    baseline: ['p(95)<300'],
    load: ['p(95)<500'],
    stress: ['p(95)<1000'],
    spike: ['p(95)<1500'],
    soak: ['p(95)<800'],
    regression: ['p(95)<500'],
  }

  const failed = {
    baseline: ['rate<0.01'],
    load: ['rate<0.02'],
    stress: ['rate<0.05'],
    spike: ['rate<0.08'],
    soak: ['rate<0.03'],
    regression: ['rate<0.02'],
  }

  return {
    http_req_failed: failed[name],
    http_req_duration: thresholds[name],
    unexpected_errors: ['rate<0.01'],
  }
}

function jsonParams(endpoint) {
  return {
    headers: { 'Content-Type': 'application/json' },
    tags: { endpoint },
  }
}

function selectRoomId() {
  return `room-${(slotIndex() % 6) + 1}`
}

function uniqueSlot() {
  const index = slotIndex()
  const base = new Date()
  base.setUTCDate(base.getUTCDate() + 1 + (index % 20))
  base.setUTCHours(8 + (Math.floor(index / 20) % 8), 0, 0, 0)
  base.setUTCMinutes((Math.floor(index / 160) % 4) * 15)

  const end = new Date(base.getTime() + 30 * 60 * 1000)
  return { start: base.toISOString(), end: end.toISOString() }
}

function slotIndex() {
  return __VU * 1000 + __ITER
}
