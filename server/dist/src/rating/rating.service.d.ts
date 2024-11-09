import { CourseService } from 'src/course/course.service';
import { SetRatingDto } from './dto/set-rating.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
export declare class RatingService {
    private prisma;
    private readonly courseService;
    private readonly authService;
    constructor(prisma: PrismaService, courseService: CourseService, authService: AuthService);
    getCourseValueByUser(courseId: number, userId: number): Promise<number>;
    averageRatingByCourse(courseId: number): Promise<number>;
    setRating(req: Request, dto: SetRatingDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        courseId: number;
        value: number;
        userId: number;
    } | {
        result: string;
        data: string;
    }>;
}
