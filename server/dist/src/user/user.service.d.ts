import { PrismaService } from 'prisma/prisma.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(register: RegisterDto): Promise<{
        password: string;
        username: string;
        role: string;
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        username: string;
        role: string;
    }[]>;
    findOne(id: number): Promise<{
        username: string;
        role: string;
        id: number;
        email: string;
    }>;
    findByUsername(username: string): Promise<{
        password: string;
        username: string;
        role: string;
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        username: string;
        role: string;
        id: number;
        email: string;
    }>;
    setAdmin(id: number): Promise<{
        username: string;
        role: string;
        id: number;
        email: string;
    }>;
    remove(id: number): Promise<{
        username: string;
        role: string;
        id: number;
        email: string;
    }>;
}
