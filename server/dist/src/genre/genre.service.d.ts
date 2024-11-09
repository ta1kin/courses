import { PrismaService } from 'prisma/prisma.service';
import { CourseService } from 'src/course/course.service';
import { CreateGenreDto } from './dto/create-genre.dto';
export declare class GenreService {
    private readonly prisma;
    private readonly courseService;
    constructor(prisma: PrismaService, courseService: CourseService);
    create(createGenreDto: CreateGenreDto): Promise<{
        result: string;
        data: string;
    } | {
        result: string;
        data: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string;
            icon_path: string;
        };
    }>;
    getAll(searchTerm?: string): Promise<{
        result: string;
        data: string;
    } | {
        result: string;
        data: {
            name: string;
            description: string;
            icon_path: string;
            courses: {
                rating: number;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                slug: string;
                duration: number;
                company: string;
                url: string;
                countOpened: number;
                isSendTelegram: boolean;
            }[];
        }[];
    }>;
    byId(id: number): Promise<{
        result: string;
        data: string;
        messages?: undefined;
    } | {
        result: string;
        messages: string;
        data?: undefined;
    } | {
        result: string;
        data: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string;
            icon_path: string;
        };
        messages?: undefined;
    }>;
    update(id: number, dto: CreateGenreDto): Promise<{
        result: string;
        messages: string;
        data?: undefined;
    } | {
        result: string;
        data: string;
        messages?: undefined;
    } | {
        result: string;
        data: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string;
            icon_path: string;
        };
        messages?: undefined;
    }>;
    delete(id: number): Promise<{
        result: string;
        data: string;
        messages?: undefined;
    } | {
        result: string;
        messages: string;
        data?: undefined;
    } | {
        result: string;
        data: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string;
            icon_path: string;
        };
        messages?: undefined;
    }>;
    bySlug(slug: string): Promise<{
        result: string;
        data: string;
    } | {
        result: string;
        data: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string;
            icon_path: string;
        };
    }>;
}
