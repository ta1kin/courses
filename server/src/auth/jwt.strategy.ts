import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import * as dotenv from 'dotenv'

dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			usernameField: 'username',
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET 
		}) 
	}

	async validate(payload: any) {
		return {
			userId: payload.id,
			username: payload.username,
			role: payload.role
		}
	}
}
