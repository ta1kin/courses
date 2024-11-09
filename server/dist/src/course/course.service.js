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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CourseService = class CourseService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async bySlug(slug) {
        const doc = await this.prisma.course.findFirst({
            where: { slug },
            include: { genres: true },
        });
        if (!doc)
            return { result: 'failed', data: 'Course not found' };
        return { result: 'success', data: doc };
    }
    async getAll(searchTerm) {
        let options = {};
        if (searchTerm) {
            options = {
                OR: [
                    {
                        title: { contains: searchTerm, mode: 'insensitive' },
                    },
                ],
            };
        }
        const courses = await this.prisma.course.findMany({
            where: options,
            orderBy: { countOpened: 'desc' },
            include: { genres: true },
        });
        if (!courses.length)
            return { result: 'failed', data: 'Courses not found' };
        return { result: 'success', data: courses };
    }
    async byGenres(genreIds) {
        const courses = await this.prisma.course.findMany({
            where: {
                genres: { some: { id: { in: genreIds } } },
            },
            include: { genres: true },
        });
        if (!courses.length)
            return { result: 'failed', data: 'Courses not found' };
        return { result: 'success', data: courses };
    }
    async getMostPopular() {
        const courses = await this.prisma.course.findMany({
            where: { countOpened: { gt: 0 } },
            orderBy: { countOpened: 'desc' },
            include: { genres: true },
        });
        if (!courses.length)
            return { result: 'failed', data: 'Courses not found' };
        return { result: 'success', data: courses };
    }
    async updateCountOpened(id) {
        const temp = await this.prisma.course.findFirst({ where: { id } });
        if (!temp)
            return {
                result: 'failed',
                messages: `Course with id=${id} not found`,
            };
        const course = await this.prisma.course.update({
            where: { id },
            data: { countOpened: { increment: 1 } },
        });
        if (!course)
            return { result: 'failed', data: 'Course not found' };
        return { result: 'success', data: course };
    }
    async updateRating(id, newRating) {
        return this.prisma.course.update({
            where: { id },
            data: { rating: newRating },
            include: { genres: true },
        });
    }
    async byId(id) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: { genres: true },
        });
        if (!course)
            return { result: 'failed', data: 'Course not found' };
        return { result: 'success', data: course };
    }
    async create(dto) {
        if (!dto.title) {
            return {
                result: 'failed',
                data: 'Dto missing',
            };
        }
        const temp = await this.prisma.course.findFirst({
            where: { title: dto.title },
        });
        if (temp) {
            return {
                result: 'failed',
                data: 'Course with same name is already exists',
            };
        }
        const course = await this.prisma.course.create({
            data: {
                title: dto.title,
                slug: dto.slug,
                duration: dto.duration,
                company: dto.company,
                url: dto.url,
                genres: {
                    connect: dto.genres.map(genreId => ({ id: genreId })),
                },
            },
        });
        if (!course)
            return { result: 'failed', data: 'Course not created' };
        return { result: 'success', data: course };
    }
    async delete(id) {
        const temp = await this.prisma.course.findFirst({ where: { id } });
        if (!temp)
            return {
                result: 'failed',
                messages: `Course with id=${id} not found`,
            };
        const course = await this.prisma.course.delete({
            where: { id },
            include: { genres: true },
        });
        if (!course)
            return { result: 'failed', data: 'Course not found' };
        return { result: 'success', data: course };
    }
    async update(id, dto) {
        const updateData = {
            ...dto,
        };
        const course = await this.prisma.course.findFirst({ where: { id } });
        if (!course)
            return {
                result: 'failed',
                messages: `Course with id=${id} not found`,
            };
        if (dto.genres && dto.genres.length > 0) {
            updateData.genres = {
                set: dto.genres.map(genreId => ({ id: genreId })),
            };
        }
        const updateDoc = await this.prisma.course.update({
            where: { id },
            data: updateData,
            include: { genres: true },
        });
        if (!updateDoc)
            return {
                result: 'failed',
                data: 'Course not found',
            };
        return {
            result: 'success',
            data: updateDoc,
        };
    }
    async sendNotification(dto) {
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CourseService);
//# sourceMappingURL=course.service.js.map