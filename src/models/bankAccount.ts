import db from "../db/mongo.ts";
import { BankAccount } from "../interfaces/bankAccount.ts";
import { ACCOUNTS_COLLECTION_NAME } from "../config.ts";

const database = db.getDb;
const bankAccounts = database.collection<BankAccount>(ACCOUNTS_COLLECTION_NAME);

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
   * @param {number} account_number
   * @returns bank account
   *
   * @example
   * await bankmodel.getById(123456789);
   */
  getByAccountNumber: async (account_number: number) => {
    return await bankAccounts.findOne({ account_number: account_number });
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
  update: async (account_number: number, body: []) => {
    return await bankAccounts.updateOne({ account_number: account_number }, {
      $set: body,
    });
  },

  /**
   * @description Update a bank account
   *
   * @param bankAccount: BankAccount object to update
   *
   * @returns updated bank account
   * @returns null if bank account does not exist
   * @returns null if bank account is not updated
   * @returns null if error
   *
   * @example
   * await bankModel.update({ _id: "123456789", balance: 1000 });
   */
  updateById: async (bankAccount: BankAccount) => {
    try {
      const { _id, ...body } = bankAccount;
      const updatedBankAccount = await bankAccounts.updateOne(
        { _id: _id },
        { $set: body },
        { upsert: true }, // upsert: true will insert the document if it doesn't exist
      );
      return updatedBankAccount;
    } catch (error) {
      console.warn(error);
      return null;
    }
  },

  /**
   * @description Deletes a bank account by account number
   *
   * @param account number to delete
   *
   * @returns count of deleted bank accounts
   */
  deleteByAccountNumber: async (account_number: number) => {
    return await bankAccounts.deleteOne({ account_number: account_number });
  },

  /**
   * @description Login a bank account
   *
   * @param account number
   * @param password
   *
   * @returns JWT token
   *
   * @example await bankModel.login(123456789, "password");
   */
  login: async (account_number: number, password: string) => {
    const bankAccount = await bankAccounts.findOne(
      { account_number: account_number },
    );

    if (!bankAccount) {
      throw new Error("Account does not exist");
    }

    if (bankAccount.password !== password) {
      throw new Error("Invalid password");
    }

    return await bankAccount;
  },
};
