import { Router } from "express";
import {
  createSound,
  getAllSounds,
} from "../controllers/sounds-storage/soundController.js";

const soundsRouter = Router();

soundsRouter.get("/", getAllSounds);
soundsRouter.post("/createSound", createSound);

export default soundsRouter;
