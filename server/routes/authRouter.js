import { Router } from "express";

import { login, signup } from "../controllers/auth/authController.js";
import getSession from "../controllers/auth/getSession.js";

const authRouter = Router();

authRouter.route("/login").post(login);
authRouter.route("/signup").post(signup);
authRouter.route("/getSession").get(getSession);

export default authRouter;
