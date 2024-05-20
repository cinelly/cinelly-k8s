import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const [req] = context.getArgs();
    const userPermissions = req?.auth?.permissions || [];
    const requiredPermissions =
      this.reflector.get('permissions', context.getHandler()) || [];
    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (requiredPermissions.length === 0 || hasPermission) {
      return true;
    }

    throw new ForbiddenException(
      'You do not have permission to access this resource',
    );
  }
}
