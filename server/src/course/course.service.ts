import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { UpdateCourseDto } from './dto/update-course.dto'
import { CreateCourseDto } from './dto/create-course.dto'

@Injectable()
export class CourseService {
	constructor(private prisma: PrismaService) {}

	async bySlug(slug: string) {
		const doc = await this.prisma.course.findFirst({
			where: { slug },
			include: { genres: true },
		})

		if (!doc) return { result: 'failed', data: 'Course not found' }

		return { result: 'success', data: doc }
	}

	async getAll(searchTerm: string) {
		let options = {}

		if (searchTerm) {
			options = {
				OR: [
					{
						title: { contains: searchTerm, mode: 'insensitive' },
					},
				],
			}
		}

		const courses = await this.prisma.course.findMany({
			where: options,
			orderBy: { countOpened: 'desc' },
			include: { genres: true },
		})

		if (!courses.length) return { result: 'failed', data: 'Courses not found' }

		return { result: 'success', data: courses }
	}

	async byGenres(genreIds: number[]) {
		const courses = await this.prisma.course.findMany({
			where: {
				genres: { some: { id: { in: genreIds } } },
			},
			include: { genres: true },
		})

		if (!courses.length) return { result: 'failed', data: 'Courses not found' }

		return { result: 'success', data: courses }
	}

	async getMostPopular() {
		const courses = await this.prisma.course.findMany({
			where: { countOpened: { gt: 0 } },
			orderBy: { countOpened: 'desc' },
			include: { genres: true },
		})

		if (!courses.length) return { result: 'failed', data: 'Courses not found' }

		return { result: 'success', data: courses }
	}

	async updateCountOpened(id: number) {
		const temp = await this.prisma.course.findFirst({ where: { id } })
		if (!temp)
			return {
				result: 'failed',
				messages: `Course with id=${id} not found`,
			}

		const course = await this.prisma.course.update({
			where: { id },
			data: { countOpened: { increment: 1 } },
		})

		if (!course) return { result: 'failed', data: 'Course not found' }

		return { result: 'success', data: course }
	}

	async updateRating(id: number, newRating: number) {
    return this.prisma.course.update({
        where: { id },
        data: { rating: newRating },
        include: { genres: true }, 
    });
}
	async byId(id: number) {
		const course = await this.prisma.course.findUnique({
			where: { id },
			include: { genres: true },
		})

		if (!course) return { result: 'failed', data: 'Course not found' }

		return { result: 'success', data: course }
	}

	async create(dto: CreateCourseDto) {
		if (!dto.title) {
			return {
				result: 'failed',
				data: 'Dto missing',
			}
		}
		const temp = await this.prisma.course.findFirst({
			where: { title: dto.title },
		})
		if (temp) {
			return {
				result: 'failed',
				data: 'Course with same name is already exists',
			}
		}
		const course = await this.prisma.course.create({
			data: {
				title: dto.title,
				slug: dto.slug,
				duration: dto.duration,
				company: dto.company,
				url: dto.url,
				genres: {
					connect: dto.genres.map(genreId => ({ id: genreId })),
				},
			},
		})

		if (!course) return { result: 'failed', data: 'Course not created' }

		return { result: 'success', data: course }
	}

	async delete(id: number) {
		const temp = await this.prisma.course.findFirst({ where: { id } })
		if (!temp)
			return {
				result: 'failed',
				messages: `Course with id=${id} not found`,
			}
		const course = await this.prisma.course.delete({
			where: { id },
			include: { genres: true },
		})

		if (!course) return { result: 'failed', data: 'Course not found' }

		return { result: 'success', data: course }
	}

	async update(id: number, dto: UpdateCourseDto) {
		const updateData: any = {
			...dto,
		}

		const course = await this.prisma.course.findFirst({ where: { id } })
		if (!course)
			return {
				result: 'failed',
				messages: `Course with id=${id} not found`,
			}

		if (dto.genres && dto.genres.length > 0) {
			updateData.genres = {
				set: dto.genres.map(genreId => ({ id: genreId })),
			}
		}

		const updateDoc = await this.prisma.course.update({
			where: { id },
			data: updateData,
			include: { genres: true },
		})

		if (!updateDoc)
			return {
				result: 'failed',
				data: 'Course not found',
			}

		return {
			result: 'success',
			data: updateDoc,
		}
	}

	async sendNotification(dto: UpdateCourseDto) {
		// Integration with Telegram notification service
	}
}
