import { Router } from "../../deps.ts";
import authController from "../controllers/auth.ts";

const router = new Router();

router
  .post("/api/login", authController.login)
  .post("/api/register", authController.register);

export default router;
