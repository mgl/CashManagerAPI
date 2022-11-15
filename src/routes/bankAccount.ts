import { Router } from "../../deps.ts";
import bankAccountController from "../controllers/bankAccount.ts";

const router = new Router();

router
  .get("/api/accounts", bankAccountController.getAll)
  .post("/api/accounts", bankAccountController.create)
  .get("/api/accounts/:id", bankAccountController.getById)
  .put("/api/accounts/:id", bankAccountController.updateById)
  .delete("/api/accounts/:id", bankAccountController.deleteById);

export default router;