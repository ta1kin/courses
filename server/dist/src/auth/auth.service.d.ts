import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RedisService } from 'src/redis/redis.service';
import { Request, Response } from 'express';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'prisma/prisma.service';
export declare class AuthService {
    private usersService;
    private readonly jwtService;
    private readonly mailService;
    private readonly prismaService;
    private readonly redisService;
    constructor(usersService: UserService, jwtService: JwtService, mailService: MailService, prismaService: PrismaService, redisService: RedisService);
    register(register: RegisterDto, res: Response): Promise<{
        result: string;
        data: string;
    } | {
        result: string;
        data?: undefined;
    }>;
    login(loginDto: LoginDto, res: Response): Promise<{
        result: string;
        data: string;
        user?: undefined;
    } | {
        result: string;
        user: {
            id: number;
            username: string;
            role: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
        };
        data?: undefined;
    }>;
    genTokenPair(payload: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    profile(req: Request): Promise<{
        result: string;
        data: string;
        status?: undefined;
    } | {
        status: string;
        data: string;
        result?: undefined;
    } | {
        status: string;
        data: {
            username: string;
            role: string;
            id: number;
            email: string;
        };
        result?: undefined;
    }>;
    refresh(req: any, res: any): Promise<{
        result: string;
        data: string;
    }>;
    verify(token: string, type: string): Promise<any>;
    sendResetCode(email: string): Promise<{
        result: string;
        data?: undefined;
    } | {
        result: string;
        data: any;
    }>;
    checkResetCode(code: string, email: string, res: Response): Promise<{
        result: string;
        data?: undefined;
    } | {
        result: string;
        data: any;
    }>;
    changePassword(newPass: string, res: Response, req: Request): Promise<{
        result: string;
        data: string;
        status: string;
    } | {
        result: string;
        data: any;
        status?: undefined;
    }>;
}
