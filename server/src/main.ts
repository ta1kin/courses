import { NestFactory } from '@nestjs/core'
import * as dotenv from 'dotenv'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'

dotenv.config()

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	const corsOptions = {
		origin: process.env.CORS_ORIGIN || '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
		allowedHeaders: ['Content-Type', 'Authorization']
	}
	app.enableCors(corsOptions)
	app.use(cookieParser())
	await app.listen(4200)
}

bootstrap()
