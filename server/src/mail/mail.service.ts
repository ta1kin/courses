import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async sendMail(email: string, name: string) {
		try {
			await this.mailerService.sendMail({
				to: email,
				subject: 'Greeting from NestJS NodeMailer',
				template: 'email',
				context: {
					name: name,
				},
			})
		} catch (e) {
			console.log(e)
			return {
				result: 'failed',
				data: 'Не удалось отправить сообщение попробуйте регистрацию еще  раз',
			}
		}
	}
}
