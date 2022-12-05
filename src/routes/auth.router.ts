import { Router } from "../../deps.ts";
import authController from "../controllers/auth.controller.ts";

const router = new Router();

router
  .post("/api/auth/login", authController.login)
  .post("/api/auth/register", authController.register);

export default router;
