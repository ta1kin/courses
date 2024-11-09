import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<{
        username: string;
        role: string;
    }[]>;
    findOne(id: string): Promise<{
        username: string;
        role: string;
        id: number;
        email: string;
    }>;
}
