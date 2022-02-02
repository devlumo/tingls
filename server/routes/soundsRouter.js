import { Router } from "express";
import {
  createSound,
  getAllSounds,
} from "../controllers/sounds-storage/soundController.js";

import { createMix, getAllMixes } from "../controllers/mixes/mixController.js";

const soundsRouter = Router();

soundsRouter.get("/", getAllSounds);
soundsRouter.get("/getAllMixes", getAllMixes);

soundsRouter.post("/createSound", createSound);
soundsRouter.post("/createMix", createMix);

export default soundsRouter;
