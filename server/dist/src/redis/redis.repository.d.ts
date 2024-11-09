import { OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';
export declare class RedisRepository implements OnModuleDestroy {
    private readonly redisClient;
    constructor(redisClient: Redis);
    onModuleDestroy(): void;
    get(prefix: string, key: string): Promise<string | null>;
    set(prefix: string, key: string, value: string): Promise<void>;
    delete(prefix: string, key: string): Promise<void>;
    setWithExpiry(prefix: string, key: string, value: string, expiry: number): Promise<void>;
}
