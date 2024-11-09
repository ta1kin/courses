import { Injectable } from '@nestjs/common'

import { PrismaService } from 'prisma/prisma.service'
import { CourseService } from 'src/course/course.service'
import { CreateGenreDto } from './dto/create-genre.dto'
import { log } from 'console'

@Injectable()
export class GenreService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly courseService: CourseService,
	) {}

	async create(createGenreDto: CreateGenreDto) {
		if (!createGenreDto.name) {
			return {
				result: 'failed',
				data: 'Dto missing',
			}
		}
		const temp = await this.prisma.genre.findFirst({
			where: { name: createGenreDto.name },
		})
		if (temp) {
			return {
				result: 'failed',
				data: 'Genre with same name is already exists',
			}
		}
		console.log(createGenreDto.name)
		const genre = await this.prisma.genre.create({
			data: {
				name: createGenreDto.name,
				slug: createGenreDto.slug,
				description: createGenreDto.description,
				icon_path: createGenreDto.icon_path,
			},
		})
		return {
			result: 'success',
			data: genre,
		}
	}

	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm)
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, 'i'),
					},
					{
						slug: new RegExp(searchTerm, 'i'),
					},
					{
						description: new RegExp(searchTerm, 'i'),
					},
				],
			}
		const genres = await this.prisma.genre.findMany({
			where: options,
			select: {
				name: true,
				description: true,
				icon_path: true,
				courses: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})
		if (!genres.length) {
			return {
				result: 'failed',
				data: 'Genres not found',
			}
		}
		return {
			result: 'success',
			data: genres,
		}
	}

	async byId(id: number) {
		if (!id) {
			return {
				result: 'failed',
				data: 'Не передан ID',
			}
		}

		const genre = await this.prisma.genre.findFirst({ where: { id } })
		if (!genre)
			return {
				result: 'failed',
				messages: `Genre with id=${id} not found`,
			}

		return {
			result: 'success',
			data: genre,
		}
	}

	async update(id: number, dto: CreateGenreDto) {
		const genre = await this.prisma.genre.findFirst({ where: { id } })
		if (!genre)
			return {
				result: 'failed',
				messages: `Genre with id=${id} not found`,
			}

		const updateDoc = await this.prisma.genre.update({
			where: { id: id },
			data: dto,
		})

		if (!updateDoc)
			return {
				result: 'failed',
				data: 'Genre not found!',
			}

		return {
			result: 'success',
			data: updateDoc,
		}
	}

	async delete(id: number) {
		if (!id) {
			return {
				result: 'failed',
				data: 'Не передан ID',
			}
		}
		const genre = await this.prisma.genre.findFirst({ where: { id } })
		if (!genre)
			return {
				result: 'failed',
				messages: `Genre with id=${id} not found`,
			}

		const deleteDoc = await this.prisma.genre.delete({ where: { id } })
		if (!deleteDoc)
			return {
				result: 'failed',
				data: 'Genre not found!',
			}

		return {
			result: 'success',
			data: deleteDoc,
		}
	}

	async bySlug(slug: string) {
		const doc = await this.prisma.genre.findFirst({ where: { slug } })
		if (!doc)
			return {
				result: 'failed',
				data: 'Genre not found!',
			}
		return {
			result: 'success',
			data: doc,
		}
	}

	//TODO:
	// getCollections()
}
