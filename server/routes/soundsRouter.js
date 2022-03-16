import { Router } from "express";
import { protect } from "../controllers/auth/protectController.js";
import {
  createSound,
  getAllSounds,
  likeSound,
} from "../controllers/sounds-storage/soundController.js";

import { createMix, getAllMixes } from "../controllers/mixes/mixController.js";

const soundsRouter = Router();

soundsRouter.get("/", getAllSounds);
soundsRouter.get("/getAllMixes", getAllMixes);
soundsRouter.post("/createSound", createSound);
soundsRouter.post("/createMix", createMix);
soundsRouter.route("/:id/likeSound").patch(protect, likeSound);

export default soundsRouter;
