import { Router } from "express";
import {
  createSound,
  getAllSounds,
} from "../controllers/sounds-storage/soundController.js";

import { createMix } from "../controllers/mixes/mixController.js";

const soundsRouter = Router();

soundsRouter.get("/", getAllSounds);
soundsRouter.post("/createSound", createSound);
soundsRouter.post("/createMix", createMix);

export default soundsRouter;
