import Redis from "ioredis"

export class RedisService {
    private redisClient: Redis
    private static instance: RedisService

    constructor() {
        this.redisClient = new Redis({
            port: parseInt(process.env.REDIS_PORT as string),
            host: process.env.REDIS_HOST as string,
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD
        })
    }

    static getInstance(): RedisService {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService()
        }

        return RedisService.instance
    }


    async set(key: string, value: string, expiringInSeconds?: number): Promise<void> {
        if (expiringInSeconds) {
            await this.redisClient.set(key, value, 'EX', expiringInSeconds)
        } else {
            await this.redisClient.set(key, value)
        }
    }

    async get(key: string): Promise<string | null> {
       return await this.redisClient.get(key)
    }
}