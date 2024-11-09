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
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const redis_prefix_1 = require("./redis.prefix");
const redis_repository_1 = require("./redis.repository");
const dotenv = require("dotenv");
dotenv.config();
const timeExpiration = Number(process.env.REFRESH_TTL);
const RESET_TTL = Number(process.env.RESET_TTL);
let RedisService = class RedisService {
    constructor(redisRepository) {
        this.redisRepository = redisRepository;
    }
    async saveConfirmCode(email, code) {
        await this.redisRepository.setWithExpiry(redis_prefix_1.RedisPrefixEnum.CONFIRM_CODE, email, code, RESET_TTL);
    }
    async getConfirmCode(email) {
        return await this.redisRepository.get(redis_prefix_1.RedisPrefixEnum.CONFIRM_CODE, email);
    }
    async delConfirmCode(email) {
        return await this.redisRepository.delete(redis_prefix_1.RedisPrefixEnum.CONFIRM_CODE, email);
    }
    async saveResetToken(email, token) {
        await this.redisRepository.setWithExpiry(redis_prefix_1.RedisPrefixEnum.RESET_TOKEN, email, token, RESET_TTL);
    }
    async getResetToken(email) {
        return await this.redisRepository.get(redis_prefix_1.RedisPrefixEnum.RESET_TOKEN, email);
    }
    async delResetToken(email) {
        return await this.redisRepository.delete(redis_prefix_1.RedisPrefixEnum.RESET_TOKEN, email);
    }
    async saveRefreshToken(userId, token) {
        await this.redisRepository.setWithExpiry(redis_prefix_1.RedisPrefixEnum.REFRESH_TOKEN, userId, token, timeExpiration);
    }
    async delRefreshToken(userId) {
        await this.redisRepository.delete(redis_prefix_1.RedisPrefixEnum.REFRESH_TOKEN, userId);
    }
    async getRefreshToken(userId) {
        return await this.redisRepository.get(redis_prefix_1.RedisPrefixEnum.REFRESH_TOKEN, userId);
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(redis_repository_1.RedisRepository)),
    __metadata("design:paramtypes", [redis_repository_1.RedisRepository])
], RedisService);
//# sourceMappingURL=redis.service.js.map