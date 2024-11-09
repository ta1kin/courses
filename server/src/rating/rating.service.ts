import { Injectable } from '@nestjs/common'
import { CourseService } from 'src/course/course.service'
import { SetRatingDto } from './dto/set-rating.dto'
import { PrismaService } from 'prisma/prisma.service'
import { Request } from 'express'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class RatingService {
	constructor(
		private prisma: PrismaService,
		private readonly courseService: CourseService,
		private readonly authService: AuthService
	) {}

	async getCourseValueByUser(courseId: number, userId: number) {
		const rating = await this.prisma.rating.findUnique({
			where: {
				userId_courseId: {
					userId,
					courseId,
				},
			},
		})

		return rating ? rating.value : 0
	}

	async averageRatingByCourse(courseId: number) {
		const ratings = await this.prisma.rating.findMany({
			where: { courseId },
		})

		const totalRating = ratings.reduce((acc, item) => acc + item.value, 0)

		return ratings.length > 0 ? totalRating / ratings.length : 0
	}

	async setRating(req: Request, dto: SetRatingDto) {
		const { courseId, value } = dto
		const access_token = req.headers.authorization.split(' ')[1]
		const payload = await this.authService.verify(access_token, 'access')
		if (payload.result === 'failed') {
			return {
				result: 'failed',
				data: 'Токен закончился'
			}
		}
		const userId = payload.id
		
		const newRating = await this.prisma.rating.upsert({
			where: {
				userId_courseId: {
					userId,
					courseId,
				},
			},
			update: {
				value,
			},
			create: {
				userId,
				courseId,
				value,
			},
		})

		const averageRating = await this.averageRatingByCourse(courseId)

		await this.courseService.updateRating(courseId, averageRating)

		return newRating
	}
}
