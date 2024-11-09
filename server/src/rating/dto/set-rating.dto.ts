import { IsNumber } from 'class-validator'

export class SetRatingDto {
	@IsNumber()
	courseId: number

	@IsNumber()
	value: number
}
