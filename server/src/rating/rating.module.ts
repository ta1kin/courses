import { Module } from '@nestjs/common'
import { CourseModule } from 'src/course/course.module'
import { RatingController } from './rating.controller'
import { RatingService } from './rating.service'
import { PrismaModule } from 'prisma/prisma.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
	imports: [PrismaModule, CourseModule, AuthModule],
	controllers: [RatingController],
	providers: [RatingService],
})
export class RatingModule {}
