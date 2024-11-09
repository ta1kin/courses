import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorators'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { CourseService } from './course.service'
import { UpdateCourseDto } from './dto/update-course.dto'
import { CreateCourseDto } from './dto/create-course.dto'

@Controller('course')
export class CourseController {
	constructor(private readonly courseService: CourseService) {}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.courseService.bySlug(slug)
	}


	@Post('by-genres')
	@HttpCode(200)
	async byGenres(
		@Body('genreIds')
		genreIds: number[],
	) {
		return this.courseService.byGenres(genreIds)
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm: string) {
		return this.courseService.getAll(searchTerm)
	}

	@Get('most-popular')
	async getMostPopular() {
		return this.courseService.getMostPopular()
	}

	@Put('update-count-opened/:id')
	@HttpCode(200)
	async updateCountOpened(@Param('id', ParseIntPipe) id: number) {
		return this.courseService.updateCountOpened(id)
	}

	@Get(':id')
	async get(@Param('id', ParseIntPipe) id: number) {
		return this.courseService.byId(id)
	}

	@Post()
	@HttpCode(200)
	@Auth('admin')
	async create(@Body() dto: CreateCourseDto) {
		return this.courseService.create(dto)
	}

	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateCourseDto,
	) {
		return this.courseService.update(id, dto)
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async delete(@Param('id', ParseIntPipe) id: number) {
		return this.courseService.delete(id)
	}
}
