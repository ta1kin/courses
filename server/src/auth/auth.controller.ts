import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Request,
	Res,
	UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { Request as R, Response } from 'express'
import { Auth } from './decorators/auth.decorators'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	register(
		@Res({ passthrough: true }) res: Response,
		@Body() createAuthDto: RegisterDto,
	) {
		return this.authService.register(createAuthDto, res)
	}

	@Post('send-reset-code')
	async sendResetCode(@Body('email') email: string) {
		return this.authService.sendResetCode(email)
	}

	@Post('check-reset-code')
	async checkResetCode(
		@Res({ passthrough: true }) res: Response,
		@Body('code') code: string,
		@Body('email') email: string,
	) {
		return this.authService.checkResetCode(code, email, res)
	}

	@Post('change-password')
	// @Auth()
	changePassword(
		@Res({ passthrough: true }) res: Response,
		@Request() req: R,
		@Body('newPass') newPass: string,
	) {
		return this.authService.changePassword(newPass, res, req)
	}

	@Post('login')
	create(
		@Res({ passthrough: true }) res: Response,
		@Body() createAuthDto: LoginDto,
	) {
		return this.authService.login(createAuthDto, res)
	}

	@Post('refresh')
	@Auth()
	refresh(@Res({ passthrough: true }) res: Response, @Request() req: R) {
		return this.authService.refresh(req, res)
	}

	@Get('profile')
	@Auth('Admin')
	profile(@Request() req: R) {
		return this.authService.profile(req)
	}
}
