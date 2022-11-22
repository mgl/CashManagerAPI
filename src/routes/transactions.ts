import { Router } from "../../deps.ts";
import Transactions from "../controllers/transactions.ts";

const router = new Router();

router
  .post("/api/transactions", Transactions.createTransaction);

export default router;
