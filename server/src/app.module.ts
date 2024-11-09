import { MailerModule } from '@nestjs-modules/mailer'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { join } from 'path'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { MailController } from './mail/mail.controller'
import { MailService } from './mail/mail.service'
import * as dotenv from 'dotenv'
import { AppLoggerMiddleware } from './logger'
import { CourseModule } from './course/course.module'
import { GenreModule } from './genre/genre.module'
import { RatingModule } from './rating/rating.module'

dotenv.config()

@Module({
	imports: [
		UserModule,
		AuthModule,
		CourseModule,
		GenreModule,
		RatingModule,
		MailerModule.forRootAsync({
			imports: [],
			useFactory: async () => ({
				transport: {
					service: process.env.EMAIL_SERVICE,
					host: process.env.EMAIL_HOST,
					secure: true,
					port: Number(process.env.EMAIL_PORT),
					auth: {
						user: process.env.EMAIL_USER,
						pass: process.env.EMAIL_PASSWORD,
					},
				
				},
				template: {
					dir: join(process.cwd(), 'templates'),
					adapter: new HandlebarsAdapter(),
					options: {
						strict: true,
					},
				},
			}),
		}),
	],
	controllers: [AppController, MailController],
	providers: [AppService, MailService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
