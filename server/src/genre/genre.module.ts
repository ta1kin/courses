import { Module } from '@nestjs/common'
import { GenreController } from './genre.controller'
import { GenreService } from './genre.service'
import { CourseModule } from 'src/course/course.module'
import { PrismaModule } from 'prisma/prisma.module'

@Module({
	imports: [PrismaModule, CourseModule],
	controllers: [GenreController],
	providers: [GenreService],
})
export class GenreModule {}
