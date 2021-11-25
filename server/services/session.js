import session from "express-session";
import redisClient from "../database/redisConfig.js";
import connectRedis from "connect-redis";

const RedisStore = connectRedis(session);

const currentSession = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSIONS_SECRET,
  resave: false,
  name: "session-id",
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 30, // 30 min
  },
});

export default currentSession;
