import { describe, it, expect } from 'vitest'
import { UserRole } from '../../../src/domain/model/UserRole'
import { Permission } from '../../../src/domain/rules/Permission'

describe('Permission', () => {
  describe('hasPermission', () => {
    it('shouldReturnTrueWhenAdminCreatesRoom', () => {
      const permission = new Permission()

      const result = permission.hasPermission(UserRole.ADMIN, 'room:create')

      expect(result).toBe(true)
    })

    it('shouldReturnTrueWhenAdminDeletesRoom', () => {
      const permission = new Permission()

      const result = permission.hasPermission(UserRole.ADMIN, 'room:delete')

      expect(result).toBe(true)
    })

    it('shouldReturnTrueWhenAdminManagesUsers', () => {
      const permission = new Permission()

      const result = permission.hasPermission(UserRole.ADMIN, 'user:manage')

      expect(result).toBe(true)
    })

    it('shouldReturnTrueWhenUserCreatesReservation', () => {
      const permission = new Permission()

      const result = permission.hasPermission(UserRole.USER, 'reservation:create')

      expect(result).toBe(true)
    })

    it('shouldReturnFalseWhenUserCreatesRoom', () => {
      const permission = new Permission()

      const result = permission.hasPermission(UserRole.USER, 'room:create')

      expect(result).toBe(false)
    })

    it('shouldReturnFalseWhenUserManagesUsers', () => {
      const permission = new Permission()

      const result = permission.hasPermission(UserRole.USER, 'user:manage')

      expect(result).toBe(false)
    })

    it('shouldReturnTrueWhenManagerCreatesRoom', () => {
      const permission = new Permission()

      const result = permission.hasPermission(UserRole.MANAGER, 'room:create')

      expect(result).toBe(true)
    })

    it('shouldReturnFalseWhenManagerDeletesRoom', () => {
      const permission = new Permission()

      const result = permission.hasPermission(UserRole.MANAGER, 'room:delete')

      expect(result).toBe(false)
    })

    it('shouldReturnFalseWhenManagerManagesUsers', () => {
      const permission = new Permission()

      const result = permission.hasPermission(UserRole.MANAGER, 'user:manage')

      expect(result).toBe(false)
    })
  })
})
