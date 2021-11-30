import express from "express";
import morgan from "morgan";

import corsConfig from "./utils/corsConfig.js";
import currentSession from "./services/session.js";
import authRouter from "./routes/authRouter.js";
import soundsRouter from "./routes/soundsRouter.js";

const app = express();

app.use(corsConfig);
app.use(currentSession);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/sounds", soundsRouter);

export default app;
