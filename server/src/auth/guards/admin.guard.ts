import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core'
import { CreateUserDto } from '../../user/dto/create-user.dto'

@Injectable()
export class OnlyAdminGuard implements CanActivate {
	constructor(private reflector: Reflector) {}
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{ user: CreateUserDto }>()
		const user = request.user

		if (user.role !== 'Admin') throw new ForbiddenException('You have no rights!')

		return user.role === 'Admin'
	}
}
