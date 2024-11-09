import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request as R, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(res: Response, createAuthDto: RegisterDto): Promise<{
        result: string;
        data: string;
    } | {
        result: string;
        data?: undefined;
    }>;
    sendResetCode(email: string): Promise<{
        result: string;
        data?: undefined;
    } | {
        result: string;
        data: any;
    }>;
    checkResetCode(res: Response, code: string, email: string): Promise<{
        result: string;
        data?: undefined;
    } | {
        result: string;
        data: any;
    }>;
    changePassword(res: Response, req: R, newPass: string): Promise<{
        result: string;
        data: string;
        status: string;
    } | {
        result: string;
        data: any;
        status?: undefined;
    }>;
    create(res: Response, createAuthDto: LoginDto): Promise<{
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
    refresh(res: Response, req: R): Promise<{
        result: string;
        data: string;
    }>;
    profile(req: R): Promise<{
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
}
