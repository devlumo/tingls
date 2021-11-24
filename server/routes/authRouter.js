import { Router } from "express";

import { login, signup } from "../controllers/authController.js";

const authRouter = Router();

authRouter.route("/login").post(login);
authRouter.route("/signup").post(signup);

export default authRouter;
