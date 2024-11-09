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
exports.RatingService = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("../course/course.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const auth_service_1 = require("../auth/auth.service");
let RatingService = class RatingService {
    constructor(prisma, courseService, authService) {
        this.prisma = prisma;
        this.courseService = courseService;
        this.authService = authService;
    }
    async getCourseValueByUser(courseId, userId) {
        const rating = await this.prisma.rating.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });
        return rating ? rating.value : 0;
    }
    async averageRatingByCourse(courseId) {
        const ratings = await this.prisma.rating.findMany({
            where: { courseId },
        });
        const totalRating = ratings.reduce((acc, item) => acc + item.value, 0);
        return ratings.length > 0 ? totalRating / ratings.length : 0;
    }
    async setRating(req, dto) {
        const { courseId, value } = dto;
        const access_token = req.headers.authorization.split(' ')[1];
        const payload = await this.authService.verify(access_token, 'access');
        if (payload.result === 'failed') {
            return {
                result: 'failed',
                data: 'Токен закончился'
            };
        }
        const userId = payload.id;
        const newRating = await this.prisma.rating.upsert({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
            update: {
                value,
            },
            create: {
                userId,
                courseId,
                value,
            },
        });
        const averageRating = await this.averageRatingByCourse(courseId);
        await this.courseService.updateRating(courseId, averageRating);
        return newRating;
    }
};
exports.RatingService = RatingService;
exports.RatingService = RatingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        course_service_1.CourseService,
        auth_service_1.AuthService])
], RatingService);
//# sourceMappingURL=rating.service.js.map