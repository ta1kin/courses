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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const argon2 = require("argon2");
const prisma_service_1 = require("../../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(register) {
        const hashedPassword = await argon2.hash(register.password);
        return this.prisma.user.create({
            data: {
                username: register.username,
                email: register.email,
                password: hashedPassword,
                role: register.role,
            },
        });
    }
    async findAll() {
        return await this.prisma.user.findMany({
            select: { username: true, role: true },
        });
    }
    async findOne(id) {
        return await this.prisma.user.findFirst({
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
            },
        });
    }
    async findByUsername(username) {
        return await this.prisma.user.findFirst({ where: { username } });
    }
    async update(id, updateUserDto) {
        return await this.prisma.user.update({
            data: updateUserDto,
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
            },
        });
    }
    async setAdmin(id) {
        return await this.prisma.user.update({
            data: { role: 'Admin' },
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
            },
        });
    }
    async remove(id) {
        return await this.prisma.user.delete({
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
            },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map