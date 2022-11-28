import { db } from "../db/mongo.ts";
import { Transaction } from "../interfaces/transaction.ts";

const collectionName: string = Deno.env.get("TRANSACTIONS_COLLECTION_NAME") ||
  "transactions";

const transactions = db.collection<Transaction>(collectionName);

export default {
  /**
   * @description Add a new transaction to the database
   *
   * @param transaction
   *
   * @returns object of transaction item
   * @returns null if transaction is not added
   */
  add: async (transaction: Transaction) => {
    const { _id } = transaction;
    const transactionExists = await transactions.findOne({ _id: _id });

    if (transactionExists) {
      return null;
    }

    const id = await transactions.insertOne(transaction);
    transaction._id = id;
    return transaction;
  },

  /**
   * @description Get all transactions count
   *
   * @returns number of transactions
   */
  getCount: async () => {
    return await transactions.estimatedDocumentCount();
  },

  /**
   * @description Will return all the entries
   *
   * @returns array of transaction entries
   * @returns null if no transactions found
   * @returns null if error
   */
  getAll: async () => {
    return await transactions.find();
  },

  /**
   * @description Takes in the id params & returns the transaction item found
   *
   * @param id
   *
   * @returns object of todo item
   * @returns null if no transaction found
   * @returns null if error
   */
  getById: async ({ _id }: Transaction) => {
    return await transactions.findOne({ _id: _id });
  },

  /**
   * @description Updates a transaction in the database by ID
   *
   * @param transaction - transaction object
   *
   * @returns object of transaction item
   * @returns null if transaction does not exist
   * @returns null if transaction is not updated
   */
  update: async (transaction: Transaction) => {
    return await transactions.updateOne({ _id: transaction._id }, {
      $set: transaction,
    });
  },

  /**
   * @description Deletes a transaction from the database by ID
   *
   * @param _id of transaction
   *
   * @returns object of transaction item
   * @returns null if transaction does not exist
   * @returns null if transaction is not deleted
   */
  delete: async (transaction: Transaction) => {
    return await transactions.deleteOne(transaction);
  },
};
