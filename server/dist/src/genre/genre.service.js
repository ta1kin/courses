"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const course_service_1 = require("../course/course.service");
let GenreService = class GenreService {
    constructor(prisma, courseService) {
        this.prisma = prisma;
        this.courseService = courseService;
    }
    async create(createGenreDto) {
        if (!createGenreDto.name) {
            return {
                result: 'failed',
                data: 'Dto missing',
            };
        }
        const temp = await this.prisma.genre.findFirst({
            where: { name: createGenreDto.name },
        });
        if (temp) {
            return {
                result: 'failed',
                data: 'Genre with same name is already exists',
            };
        }
        console.log(createGenreDto.name);
        const genre = await this.prisma.genre.create({
            data: {
                name: createGenreDto.name,
                slug: createGenreDto.slug,
                description: createGenreDto.description,
                icon_path: createGenreDto.icon_path,
            },
        });
        return {
            result: 'success',
            data: genre,
        };
    }
    async getAll(searchTerm) {
        let options = {};
        if (searchTerm)
            options = {
                $or: [
                    {
                        name: new RegExp(searchTerm, 'i'),
                    },
                    {
                        slug: new RegExp(searchTerm, 'i'),
                    },
                    {
                        description: new RegExp(searchTerm, 'i'),
                    },
                ],
            };
        const genres = await this.prisma.genre.findMany({
            where: options,
            select: {
                name: true,
                description: true,
                icon_path: true,
                courses: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        if (!genres.length) {
            return {
                result: 'failed',
                data: 'Genres not found',
            };
        }
        return {
            result: 'success',
            data: genres,
        };
    }
    async byId(id) {
        if (!id) {
            return {
                result: 'failed',
                data: 'Не передан ID',
            };
        }
        const genre = await this.prisma.genre.findFirst({ where: { id } });
        if (!genre)
            return {
                result: 'failed',
                messages: `Genre with id=${id} not found`,
            };
        return {
            result: 'success',
            data: genre,
        };
    }
    async update(id, dto) {
        const genre = await this.prisma.genre.findFirst({ where: { id } });
        if (!genre)
            return {
                result: 'failed',
                messages: `Genre with id=${id} not found`,
            };
        const updateDoc = await this.prisma.genre.update({
            where: { id: id },
            data: dto,
        });
        if (!updateDoc)
            return {
                result: 'failed',
                data: 'Genre not found!',
            };
        return {
            result: 'success',
            data: updateDoc,
        };
    }
    async delete(id) {
        if (!id) {
            return {
                result: 'failed',
                data: 'Не передан ID',
            };
        }
        const genre = await this.prisma.genre.findFirst({ where: { id } });
        if (!genre)
            return {
                result: 'failed',
                messages: `Genre with id=${id} not found`,
            };
        const deleteDoc = await this.prisma.genre.delete({ where: { id } });
        if (!deleteDoc)
            return {
                result: 'failed',
                data: 'Genre not found!',
            };
        return {
            result: 'success',
            data: deleteDoc,
        };
    }
    async bySlug(slug) {
        const doc = await this.prisma.genre.findFirst({ where: { slug } });
        if (!doc)
            return {
                result: 'failed',
                data: 'Genre not found!',
            };
        return {
            result: 'success',
            data: doc,
        };
    }
};
exports.GenreService = GenreService;
exports.GenreService = GenreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        course_service_1.CourseService])
], GenreService);
//# sourceMappingURL=genre.service.js.map