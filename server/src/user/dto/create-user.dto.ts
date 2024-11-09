import { IsNotEmpty, IsString, Length, Matches } from 'class-validator'

export class CreateUserDto {
	username: string

	@IsNotEmpty()
  @IsString()
	name: string

	@IsNotEmpty()
  @IsString()
  @Length(8, 100)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak, it should contain one uppercase letter, one lowercase letter and one digital or special symbol',
  })
	password: string
	role: string
}
