import { Inject, Injectable } from '@nestjs/common'
import { RedisPrefixEnum } from './redis.prefix'
import { RedisRepository } from './redis.repository'
import * as dotenv from 'dotenv'

dotenv.config()

const timeExpiration = Number(process.env.REFRESH_TTL)
const RESET_TTL = Number(process.env.RESET_TTL)

@Injectable()
export class RedisService {
	constructor(
		@Inject(RedisRepository) private readonly redisRepository: RedisRepository,
	) {}

	async saveConfirmCode(email: string, code: string): Promise<void> {
		await this.redisRepository.setWithExpiry(
			RedisPrefixEnum.CONFIRM_CODE,
			email,
			code,
			RESET_TTL,
		)
	}

	async getConfirmCode(email: string) {
		return await this.redisRepository.get(RedisPrefixEnum.CONFIRM_CODE, email)
	}

	async delConfirmCode(email: string) {
		return await this.redisRepository.delete(
			RedisPrefixEnum.CONFIRM_CODE,
			email,
		)
	}

	async saveResetToken(email: string, token: string): Promise<void> {
		await this.redisRepository.setWithExpiry(
			RedisPrefixEnum.RESET_TOKEN,
			email,
			token,
			RESET_TTL,
		)
	}

	async getResetToken(email: string) {
		return await this.redisRepository.get(RedisPrefixEnum.RESET_TOKEN, email)
	}

	async delResetToken(email: string) {
		return await this.redisRepository.delete(RedisPrefixEnum.RESET_TOKEN, email)
	}

	async saveRefreshToken(userId: string, token: string): Promise<void> {
		await this.redisRepository.setWithExpiry(
			RedisPrefixEnum.REFRESH_TOKEN,
			userId,
			token,
			timeExpiration,
		)
	}

	async delRefreshToken(userId: string): Promise<void> {
		await this.redisRepository.delete(RedisPrefixEnum.REFRESH_TOKEN, userId)
	}

	async getRefreshToken(userId: string): Promise<string> {
		return await this.redisRepository.get(RedisPrefixEnum.REFRESH_TOKEN, userId)
	}
}
