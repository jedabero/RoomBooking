import { UserRole } from '../model/UserRole'

const PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.ADMIN]: [],
  [UserRole.MANAGER]: ['room:create'],
  [UserRole.USER]: ['reservation:create'],
}

export class Permission {
  hasPermission(role: UserRole, action: string): boolean {
    if (role === UserRole.ADMIN) return true
    return PERMISSIONS[role]?.includes(action) ?? false
  }
}
