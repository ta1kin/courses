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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorators_1 = require("../auth/decorators/auth.decorators");
const course_service_1 = require("./course.service");
const update_course_dto_1 = require("./dto/update-course.dto");
const create_course_dto_1 = require("./dto/create-course.dto");
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    async bySlug(slug) {
        return this.courseService.bySlug(slug);
    }
    async byGenres(genreIds) {
        return this.courseService.byGenres(genreIds);
    }
    async getAll(searchTerm) {
        return this.courseService.getAll(searchTerm);
    }
    async getMostPopular() {
        return this.courseService.getMostPopular();
    }
    async updateCountOpened(id) {
        return this.courseService.updateCountOpened(id);
    }
    async get(id) {
        return this.courseService.byId(id);
    }
    async create(dto) {
        return this.courseService.create(dto);
    }
    async update(id, dto) {
        return this.courseService.update(id, dto);
    }
    async delete(id) {
        return this.courseService.delete(id);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.Get)('by-slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "bySlug", null);
__decorate([
    (0, common_1.Post)('by-genres'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('genreIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "byGenres", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('searchTerm')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('most-popular'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getMostPopular", null);
__decorate([
    (0, common_1.Put)('update-count-opened/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "updateCountOpened", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "delete", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.Controller)('course'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map