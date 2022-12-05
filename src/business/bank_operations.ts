import bankModel from "../models/bank_account.model.ts";
import transactionModel from "../models/transaction.model.ts";

/**
 * @description Attempts a bank transaction between two accounts.
 * @description If the transaction is successful, it is logged in the database.
 *
 * @param {string} fromAccountNumber
 * @param {string} toAccountNumber
 * @param {number} amount
 *
 * @throws {Error} if fromAccountNumber is not found
 * @throws {Error} if toAccountNumber is not found
 * @throws {Error} if fromAccountNumber is the same as toAccountNumber
 * @throws {Error} if fromAccountNumber does not have enough funds
 * @throws {Error} if amount is less than 0
 * @throws {Error} if amount is not a number
 *
 * @example
 * await bankOperations.transfer("123456789", "987654321", 100);
 */
export default {
  async transfer(
    fromAccountNumber: number,
    toAccountNumber: number,
    amount: number,
  ) {
    if (fromAccountNumber === toAccountNumber) {
      throw new Error("Cannot transfer to the same account");
    }

    if (amount < 0) {
      throw new Error("Cannot transfer a negative amount");
    }

    if (isNaN(amount)) {
      throw new Error("Amount must be a number");
    }

    const fromAccount = await bankModel.getByAccountNumber(fromAccountNumber);
    const toAccount = await bankModel.getByAccountNumber(toAccountNumber);

    if (!fromAccount) {
      throw new Error("From account not found");
    }

    if (!toAccount) {
      throw new Error("To account not found");
    }

    if (fromAccount.balance < amount) {
      throw new Error("Insufficient funds");
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    if (!await bankModel.updateById(fromAccount)) {
      throw new Error("Failed to update from account");
    }

    if (!await bankModel.updateById(toAccount)) {
      throw new Error("Failed to update to account");
    }

    // Logs the transaction in the database
    await transactionModel.add({
      date: new Date(),
      amount: amount,
      fromAccountNumber: fromAccount,
      toAccountNumber: toAccount,
    });
  },
};
