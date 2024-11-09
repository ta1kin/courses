import { IsArray, IsNumber, IsObject, IsString } from 'class-validator'

export class UpdateCourseDto {
	@IsString()
	title?: string

	@IsString()
	slug?: string

	@IsNumber()
	duration?: number

	@IsString()
	company?: string

	@IsString()
	url?: string

	@IsArray()
	@IsNumber({}, { each: true })
	genres?: number[]

	isSendTelegram?: boolean
}
