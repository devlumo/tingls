import { Router } from "express";

import { login } from "../controllers/authController.js";

const authRouter = Router();

authRouter.route("/login").post(login);
// authRouter.route("/signup").post();

export default authRouter;
