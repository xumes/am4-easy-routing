import Redis from "ioredis"

export class RedisService {
    redisClient: Redis

    constructor() {
        this.redisClient = new Redis({
            port: parseInt(process.env.REDIS_PORT as string),
            host: process.env.REDIS_HOST as string,
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD
        })
    }


    async save(key: string, value: string): Promise<void> {
        await this.redisClient.set(key, value)
    }

    async read(key: string): Promise<string | null> {
       return await this.redisClient.get(key)
    }
}