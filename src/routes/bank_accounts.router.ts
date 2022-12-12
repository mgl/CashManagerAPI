import { Router } from "../../deps.ts";
import bankAccountController from "../controllers/bank_accounts.controller.ts";

const router = new Router();

router
  .get("/api/accounts", bankAccountController.getAll)
  .get("/api/accounts/:account_num", bankAccountController.getByAccountNum)
  .put("/api/accounts/:account_num", bankAccountController.updateByAccountNum)
  .delete("/api/accounts/:account_num", bankAccountController.deleteById);

export default router;
