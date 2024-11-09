import { Request as R } from 'express';
import { SetRatingDto } from './dto/set-rating.dto';
import { RatingService } from './rating.service';
export declare class RatingController {
    private readonly ratingService;
    constructor(ratingService: RatingService);
    getCourseValueByUser(courseId: number, userId: number): Promise<number>;
    setRating(req: R, dto: SetRatingDto): Promise<{
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
