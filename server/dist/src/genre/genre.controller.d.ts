import { CreateGenreDto } from './dto/create-genre.dto';
import { GenreService } from './genre.service';
export declare class GenreController {
    private readonly genreService;
    constructor(genreService: GenreService);
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
    getAll(searchTerm: string): Promise<{
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
    get(id: number): Promise<{
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
}
