import express from "express";
import morgan from "morgan";

import corsConfig from "./utils/corsConfig.js";
import currentSession from "./services/session.js";
import authRouter from "./routes/authRouter.js";
import soundsRouter from "./routes/soundsRouter.js";

import ApiError from "./utils/ApiError.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

app.use(corsConfig);
app.use(currentSession);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/sounds", soundsRouter);

app.all("*", (req, res, next) => {
  // if anything is passed into next express assumes it is an error
  next(new ApiError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

export default app;
