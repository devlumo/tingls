import redis from "redis";
import "../utils/envConfig.js";

const redisClient = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PW,
});

export default redisClient;
