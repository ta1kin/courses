import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	ParseIntPipe,
	Post,
	Request,
} from '@nestjs/common'

import { Request as R } from 'express'

import { Auth } from 'src/auth/decorators/auth.decorators'

import { SetRatingDto } from './dto/set-rating.dto'
import { RatingService } from './rating.service'

@Controller('rating')
export class RatingController {
	constructor(private readonly ratingService: RatingService) {}

	@Get(':courseId')
	@Auth()
	async getCourseValueByUser(
		@Param('courseId', ParseIntPipe) courseId: number,
		userId: number,
	) {
		return this.ratingService.getCourseValueByUser(courseId, userId)
	}

	@Post('set-rating')
	@HttpCode(200)
	@Auth()
	async setRating(@Request() req: R, @Body() dto: SetRatingDto) {
		return this.ratingService.setRating(req, dto)
	}
}
