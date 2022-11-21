import { db } from "../db/mongo.ts";
import { BankAccount } from "../interfaces/bankAccount.ts";

const collectionName: string = Deno.env.get("ACCOUNTS_COLLECTION_NAME")
  ? Deno.env.get("ACCOUNTS_COLLECTION_NAME")!
  : "bankAccounts";

const bankAccounts = db.collection<BankAccount>(collectionName);

export default {
  /**
   * @description Get all bank accounts count
   *
   * @returns number of bank accounts
   */
  getCount: async () => {
    return await bankAccounts.estimatedDocumentCount();
  },

  /**
   * @description Get bank account by account number
   *
   * @param {number} accountNumber
   * @returns bank account
   *
   * @example
   * await bankmodel.getById(123456789);
   */
  getByAccountNumber: async (accountNumber: number) => {
    return await bankAccounts.findOne({ accountNumber: accountNumber });
  },

  /**
   * @description Will return all the entries
   *
   * @returns array of bank account entries
   * @returns null if no bank accounts found
   * @returns null if error
   */
  getAll: async () => {
    try {
      const data = await bankAccounts.find().toArray();
      return data;
    } catch (error) {
      console.warn(error);
      return null;
    }
  },

  /**
   * @description Takes in the id params & returns the bank account item found
   *
   * @param id
   *
   * @returns object of todo item
   */
  getById: async ({ _id }: BankAccount) => {
    return await bankAccounts.findOne({ _id: _id });
  },

  /**
   * @description Adds a new bank account to the database
   *
   * @param bankAccount
   *
   * @returns object of bank account item
   * @returns null if bank account already exists
   * @returns null if bank account is not added
   */
  add: async (bankAccount: BankAccount) => {
    const bankAccountExists = await bankAccounts.findOne({
      account_number: bankAccount.account_number,
    });

    if (bankAccountExists) {
      throw new Error("Account already exist");
    }

    const id = await bankAccounts.insertOne(bankAccount);
    bankAccount._id = id;
    return bankAccount;
  },

  /**
   * @description Updates the content of a single bank account
   *
   * @param bank account
   *
   * @returns object of bank account item
   * @returns null if bank account does not exist
   * @returns null if bank account is not updated
   */
  update: async (bankAccount: BankAccount) => {
    return await bankAccounts.updateOne({ _id: bankAccount._id }, {
      $set: bankAccount,
    });
  },

  /**
   * @description Deletes a bank account by ID
   *
   * @param id account to delete
   *
   * @returns count of deleted bank accounts
   */
  deleteById: async ({ _id }: BankAccount) => {
    return await bankAccounts.deleteOne({
      _id: _id,
    });
  },
};
