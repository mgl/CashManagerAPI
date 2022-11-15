import { db } from "../db/mongo.ts";
import { BankAccount } from "../interfaces/bankAccount.ts";

const collectionName: string = Deno.env.get("COLLECTION_NAME")
  ? Deno.env.get("COLLECTION_NAME")!
  : "bankAccounts";

const bankAccounts = db.collection<BankAccount>(collectionName);

export default {
  /**
   * @description Get all bank accounts count
   *
   * @returns number of bank accounts
   */
  getCount: async () => {
    return await bankAccounts.estimatedDocumentCount({
      _id: { $ne: null },
    });
  },

  /**
   * @description Will return all the entries
   *
   * @returns array of bank account entries
   */
  getAll: async () => {
    return await bankAccounts.find({ username: { $ne: null } }).toArray();
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
    const { _id } = bankAccount;
    const bankAccountExists = await bankAccounts.findOne({ _id: _id });
    if (bankAccountExists) {
      return null;
    }
    const { $oid } = await bankAccounts.insertOne(bankAccount);
    return await bankAccounts.findOne({ _id: $oid });
  },

  /**
   * @description Updates the content of a single bank account
   *
   * @param _id
   *
   * @returns object of bank account item
   * @returns null if bank account does not exist
   * @returns null if bank account is not updated
   */
  updateById: async ({ _id, ...bankAccount }: BankAccount) => {
    const bankAccountExists = await bankAccounts.findOne({ _id: _id });
    if (!bankAccountExists) {
      return null;
    }
    const { matchedCount, modifiedCount } = await bankAccounts.updateOne(
      { _id },
      { $set: bankAccount },
    );
    if (matchedCount && modifiedCount) {
      return await bankAccounts.findOne({ _id: _id });
    }
    return null;
  },

  /**
   * @description Deletes a bank account by ID
   *
   * @param id account to delete
   *
   * @returns count of deleted bank accounts
   */
  deleteById: async ({ _id }: BankAccount) => {
    const { deletedCount } = await bankAccounts.deleteOne({
      _id: _id,
    });
    return deletedCount;
  },
};
