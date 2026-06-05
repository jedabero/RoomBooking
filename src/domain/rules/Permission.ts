import type { UserRole } from '../model/UserRole'

export class Permission {
  hasPermission(role: UserRole, action: string): boolean {
    throw new Error('not implemented')
  }
}
