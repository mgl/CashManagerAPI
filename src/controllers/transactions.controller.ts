import { Request, Response } from "../../deps.ts";
import BankOperations from "../business/bank_operations.ts";
import { BankAccount } from "../interfaces/bank_account.interface.ts";

export default {
  /**
   * @description Get all transactions
   *
   * @route GET /api/transactions
   *
   * @param {Request} request
   * @param {Response} response
   *
   * @returns {Promise<void>}
   */

  /**
   * @description Initiates a new transactions between two accounts
   * @route POST /api/transactions
   */
  async createTransaction(
    { request, response, state }: {
      request: Request;
      response: Response;
      state: BankAccount;
    },
  ) {
    const body = request.body({ type: "json" });
    const { fromAccountNumber, toAccountNumber, amount } = await body.value;

    // Reject if fromAccountNumber is not current user_account
    // This is to prevent a user from transferring from another account
    if (Number(fromAccountNumber) != state.account_number) {
      response.status = 400;
      response.body = { message: "Cannot transfer from other account" };
      return;
    }

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
