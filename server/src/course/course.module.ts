import { Module } from '@nestjs/common'
import { CourseController } from './course.controller'

import { CourseService } from './course.service'
import { PrismaModule } from 'prisma/prisma.module'
import { GenreModule } from 'src/genre/genre.module'

@Module({
	imports: [PrismaModule],
	controllers: [CourseController],
	providers: [CourseService],
	exports: [CourseService]
})
export class CourseModule {}
