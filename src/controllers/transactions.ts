import { Request, Response } from "../../deps.ts";
import BankOperations from "../business/bank_operations.ts";

export default {
  /**
   * @description Initiates a new transactions between two accounts
   * @route POST /api/transactions
   */
  async createTransaction(
    { request, response }: { request: Request; response: Response },
  ) {
    const body = await request.body({ type: "json" });
    const { fromAccountNumber, toAccountNumber, amount } = await body.value;

    try {
      await BankOperations.transfer(fromAccountNumber, toAccountNumber, amount);
      response.status = 200;
      response.body = { message: "Transaction successful" };
    } catch (error) {
      response.status = 400;
      response.body = { message: error.message };
    }
  },
};
