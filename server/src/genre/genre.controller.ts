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
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { CreateGenreDto } from './dto/create-genre.dto';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.genreService.bySlug(slug);
	}


	@Get()
	async getAll(@Query('searchTerm') searchTerm: string) {
		return this.genreService.getAll(searchTerm);
	}

	@Get(':id')
	@Auth('Admin')
	async get(@Param('id', ParseIntPipe) id: number) {
		return this.genreService.byId(id);
	}

	@Post()
	@HttpCode(200)
	@Auth('admin')
	async create(@Body() createGenreDto: CreateGenreDto) {
		return this.genreService.create(createGenreDto);
	}

	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: CreateGenreDto
	) {
		return this.genreService.update(id, dto);
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async delete(@Param('id', ParseIntPipe) id: number) {
		return this.genreService.delete(id);
	}
 }
