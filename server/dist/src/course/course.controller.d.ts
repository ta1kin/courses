import { CourseService } from './course.service';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    bySlug(slug: string): Promise<{
        result: string;
        data: string;
    } | {
        result: string;
        data: {
            genres: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                slug: string;
                description: string;
                icon_path: string;
            }[];
        } & {
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
        };
    }>;
    byGenres(genreIds: number[]): Promise<{
        result: string;
        data: string;
    } | {
        result: string;
        data: ({
            genres: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                slug: string;
                description: string;
                icon_path: string;
            }[];
        } & {
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
        })[];
    }>;
    getAll(searchTerm: string): Promise<{
        result: string;
        data: string;
    } | {
        result: string;
        data: ({
            genres: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                slug: string;
                description: string;
                icon_path: string;
            }[];
        } & {
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
        })[];
    }>;
    getMostPopular(): Promise<{
        result: string;
        data: string;
    } | {
        result: string;
        data: ({
            genres: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                slug: string;
                description: string;
                icon_path: string;
            }[];
        } & {
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
        })[];
    }>;
    updateCountOpened(id: number): Promise<{
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
        };
        messages?: undefined;
    }>;
    get(id: number): Promise<{
        result: string;
        data: string;
    } | {
        result: string;
        data: {
            genres: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                slug: string;
                description: string;
                icon_path: string;
            }[];
        } & {
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
        };
    }>;
    create(dto: CreateCourseDto): Promise<{
        result: string;
        data: string;
    } | {
        result: string;
        data: {
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
        };
    }>;
    update(id: number, dto: UpdateCourseDto): Promise<{
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
            genres: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                slug: string;
                description: string;
                icon_path: string;
            }[];
        } & {
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
        };
        messages?: undefined;
    }>;
    delete(id: number): Promise<{
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
            genres: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                slug: string;
                description: string;
                icon_path: string;
            }[];
        } & {
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
        };
        messages?: undefined;
    }>;
}
