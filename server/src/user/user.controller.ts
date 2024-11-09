import { Controller, Get, Param } from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from 'src/auth/decorators/auth.decorators'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@Auth('Admin')
	findAll() {
		return this.userService.findAll()
	}

	@Get(':id')
	@Auth('Admin')
	findOne(@Param('id') id: string) {
		return this.userService.findOne(+id)
	}
}
