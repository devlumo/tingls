import express from "express";

import corsConfig from "./utils/corsConfig.js";
import currentSession from "./services/session.js";

const app = express();

app.use(corsConfig);
app.use(express.json());
app.use(currentSession);

export default app;
