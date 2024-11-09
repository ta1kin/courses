import { Injectable, Inject } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { UserService } from 'src/user/user.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { RedisService } from 'src/redis/redis.service'
import * as dotenv from 'dotenv'
import { Request, Response } from 'express'
import { access } from 'fs'
import { MailService } from 'src/mail/mail.service'
import { PrismaService } from 'prisma/prisma.service'

dotenv.config()

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private readonly jwtService: JwtService,
		private readonly mailService: MailService,
		private readonly prismaService: PrismaService,
		@Inject(RedisService) private readonly redisService: RedisService,
	) {}

	async register(register: RegisterDto, res: Response) {
		let user = await this.usersService.findByUsername(register.username)
		if (user) {
			return {
				result: 'failed',
				data: 'Пользователь с таким логином уже существует',
			}
		}
		user = await this.usersService.findByUsername(register.email)
		if (user) {
			return {
				result: 'failed',
				data: 'Почта занята',
			}
		}
		const reg = await this.usersService.create(register)
		const payload = {
			id: reg.id,
			username: String(reg.username),
			role: reg.role,
		}
		const tokens = await this.genTokenPair(payload)
		res.cookie(process.env.REFRESH_COOKIE_NAME, tokens.refresh_token, {
			secure: true,
			httpOnly: true,
			sameSite: 'none',
			maxAge: Number(process.env.REFRESH_TTL),
		})

		res.set('Authorization', `Bearer ${tokens.access_token}`)
		return {
			result: 'success',
		}
	}

	async login(loginDto: LoginDto, res: Response) {
		const user = await this.usersService.findByUsername(loginDto.username)
		if (!user) {
			return {
				result: 'failed',
				data: 'Пользователь не зарегистрирован',
			}
		}
		const isValid = await argon2.verify(user.password, loginDto.password)

		if (!isValid) {
			return {
				result: 'failed',
				data: 'Неверный пароль',
			}
		}
		const payload = {
			id: user.id,
			username: String(user.username),
			role: user.role,
		}
		const tokens = await this.genTokenPair(payload)

		res.cookie(process.env.REFRESH_COOKIE_NAME, tokens.refresh_token, {
			secure: true,
			httpOnly: true,
			sameSite: 'none',
			maxAge: Number(process.env.REFRESH_TTL),
		})

		res.set('Authorization', `Bearer ${tokens.access_token}`)

		return {
			result: 'success',
			user: {
				id: user.id,
				username: user.username,
				role: user.role,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
		}
	}

	async genTokenPair(payload) {
		const access_token = await this.jwtService.signAsync(payload)
		const refresh_token = await this.jwtService.signAsync(
			{ payload },
			{
				secret: process.env.REFRESH_JWT_SECRET,
				expiresIn: `${process.env.REFRESH_TTL}s`,
			},
		)

		await this.redisService.saveRefreshToken(payload.id, refresh_token)

		return { access_token: access_token, refresh_token: refresh_token }
	}

	async profile(req: Request) {
		const access_token = req.headers.authorization.split(' ')[1]
		const payload = await this.verify(access_token, 'access')
		if (payload.result === 'failed') {
			return {
				result: 'failed',
				data: 'Токен закончился',
			}
		}
		const userId = payload.id
		const user = await this.usersService.findOne(userId)

		if (!user)
			return {
				status: 'failed',
				data: 'Такого пользователя нет в системе',
			}
		const { ...data } = user
		return {
			status: 'success',
			data: data,
		}
	}

	async refresh(req, res) {
		const refresh_token = req.cookies.refresh_token
		if (!refresh_token) {
			return {
				result: 'failed',
				data: 'Не передан токен',
			}
		}
		const payload = await this.verify(refresh_token, 'refresh')
		const temp_token = await this.redisService.getRefreshToken(payload.id)
		if (req.body.username != payload.username || refresh_token != temp_token) {
			return {
				result: 'failed',
				data: 'некорректный refresh',
			}
		}

		const tokens = await this.genTokenPair(payload)

		res.cookie(process.env.REFRESH_COOKIE_NAME, tokens.refresh_token, {
			secure: true,
			httpOnly: true,
			sameSite: 'none',
			maxAge: Number(process.env.REFRESH_TTL),
		})

		res.set('Authorization', `Bearer ${tokens.access_token}`)
		return {
			result: 'success',
			data: 'All right, tokens were change',
		}
	}

	async verify(token: string, type: string) {
		try {
			if (type === 'refresh') {
				const payload = await this.jwtService.verifyAsync(token, {
					secret: process.env.REFRESH_JWT_SECRET,
				})
				return payload.payload
			} else if (type === 'access') {
				const payload = await this.jwtService.verifyAsync(token, {
					secret: process.env.JWT_SECRET,
				})
				return payload
			} else {
				return 'не удалось найти пользователя'
			}
		} catch (err) {
			return {
				result: 'failed',
				data: err,
			}
		}
	}

	async sendResetCode(email: string) {
		try {
			const codeConfirmation = Math.floor(
				100000 + Math.random() * 900000,
			).toString()

			// await this.mailService.sendMail(email, codeConfirmation)

			await this.redisService.saveConfirmCode(email, codeConfirmation)
			return {
				result: 'success',
			}
		} catch (err) {
			return {
				result: 'failed',
				data: err,
			}
		}
	}

	async checkResetCode(code: string, email: string, res: Response) {
		try {
			if (!code || !email) {
				return {
					result: 'failed',
					data: 'Не передан код',
				}
			}

			const resetCode = await await this.redisService.getConfirmCode(email)

			if (resetCode !== code) {
				return {
					result: 'failed',
					data: 'Не верный код',
				}
			}

			const resetToken = await this.jwtService.signAsync(
				{ email },
				{
					secret: process.env.JWT_SECRET,
					expiresIn: `${process.env.RESET_TTL}s`,
				},
			)

			await this.redisService.saveResetToken(email, resetToken)
			await this.redisService.delConfirmCode(email)

			res.set('Authorization', `Bearer ${resetToken}`)

			return { result: 'success' }
		} catch (err) {
			return {
				result: 'failed',
				data: err,
			}
		}
	}

	async changePassword(newPass: string, res: Response, req: Request) {
		try {
			if (!newPass) {
				return {
					result: 'failed',
					data: 'Не передан новый пароль',
				}
			}
			const resetToken = req.headers.authorization.split(' ')[1]
			const email = (await this.verify(resetToken, 'access')).email

			const tempToken = await this.redisService.getResetToken(email)
			if (!tempToken) {
				return {
					result: 'failed',
					data: 'Попробуйте еще раз',
					status: 'В редисе нет токена',
				}
			}

			if (tempToken !== resetToken) {
				return {
					result: 'failed',
					data: 'Попробуйте еще раз',
					status: 'Токены не равны',
				}
			}
			newPass = await argon2.hash(newPass)

			const updatePass = await this.prismaService.user.update({
				where: { email: email },
				data: { password: newPass },
				select: {
					id: true,
					username: true,
					email: true,
					role: true,
				}
			})

			await this.redisService.delResetToken(email)

			return {
				result: 'success',
				data: updatePass,
			}
		} catch (err) {
			return {
				result: 'failed',
				data: err,
			}
		}
	}
}
