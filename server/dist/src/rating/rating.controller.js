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
exports.RatingController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorators_1 = require("../auth/decorators/auth.decorators");
const set_rating_dto_1 = require("./dto/set-rating.dto");
const rating_service_1 = require("./rating.service");
let RatingController = class RatingController {
    constructor(ratingService) {
        this.ratingService = ratingService;
    }
    async getCourseValueByUser(courseId, userId) {
        return this.ratingService.getCourseValueByUser(courseId, userId);
    }
    async setRating(req, dto) {
        return this.ratingService.setRating(req, dto);
    }
};
exports.RatingController = RatingController;
__decorate([
    (0, common_1.Get)(':courseId'),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "getCourseValueByUser", null);
__decorate([
    (0, common_1.Post)('set-rating'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, set_rating_dto_1.SetRatingDto]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "setRating", null);
exports.RatingController = RatingController = __decorate([
    (0, common_1.Controller)('rating'),
    __metadata("design:paramtypes", [rating_service_1.RatingService])
], RatingController);
//# sourceMappingURL=rating.controller.js.map