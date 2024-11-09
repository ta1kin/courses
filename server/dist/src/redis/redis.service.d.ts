import { RedisRepository } from './redis.repository';
export declare class RedisService {
    private readonly redisRepository;
    constructor(redisRepository: RedisRepository);
    saveConfirmCode(email: string, code: string): Promise<void>;
    getConfirmCode(email: string): Promise<string>;
    delConfirmCode(email: string): Promise<void>;
    saveResetToken(email: string, token: string): Promise<void>;
    getResetToken(email: string): Promise<string>;
    delResetToken(email: string): Promise<void>;
    saveRefreshToken(userId: string, token: string): Promise<void>;
    delRefreshToken(userId: string): Promise<void>;
    getRefreshToken(userId: string): Promise<string>;
}
