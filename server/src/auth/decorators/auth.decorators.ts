import { applyDecorators, UseGuards } from '@nestjs/common'
import { OnlyAdminGuard } from '../guards/admin.guard'
import { JwtAuthGuard } from '../guards/jwt.guard'

export function Auth(role?: String) {
	return applyDecorators(
		role === 'Admin'
			? UseGuards(JwtAuthGuard, OnlyAdminGuard)
			: UseGuards(JwtAuthGuard)
	);
}
