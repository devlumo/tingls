import express from "express";
import morgan from "morgan";

import corsConfig from "./utils/corsConfig.js";
import currentSession from "./services/session.js";
import authRouter from "./routes/authRouter.js";

const app = express();

app.use(corsConfig);
app.use(morgan("dev"));
app.use(express.json());
app.use(currentSession);

app.use("/api/auth", authRouter);

export default app;
