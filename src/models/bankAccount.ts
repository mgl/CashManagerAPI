import { db } from "../db/mongo.ts"
import { BankAccount } from "../interfaces/bankAccount.ts"

const collectionName: string = Deno.env.get("COLLECTION_NAME") ? Deno.env.get("COLLECTION_NAME")! : "bankAccounts"

const bankAccounts = db.collection<BankAccount>(collectionName)

export default {

  /**
   * Takes in the id params & checks if the bank account item exists
   * in the database
   * @param id
  * @returns boolean to tell if an entry of bank account exists
   */
  doesExistById: async ({ _id }: BankAccount) => {
    const count = await bankAccounts.estimatedDocumentCount({
      _id: { $ne: null },
    })
    return count > 0
  },

  /**
   * Will return all the entries
   * @returns array of bank account entries
   */
  getAll: async () => {
    return await bankAccounts.find({ username: { $ne: null } }).toArray()
  },

  /**
   * Takes in the id params & returns the bank account item found
   * against it.
   * @param id
   * @returns object of todo item
   */
  getById: async ({ _id }: BankAccount) => {
    return await bankAccounts.findOne({ _id: _id })
  },

  /**
   * Adds a new todo item to todo table
   * @param todo
   * @param isCompleted
   */
  add: async (
    { todo, isCompleted }: Todo,
  ) => {
    return await client.query(
      `INSERT INTO ${TABLE.TODO}(todo, isCompleted) values(?, ?)`,
      [
        todo,
        isCompleted,
      ],
    )
  },

  /**
   * Updates the content of a single todo item
   * @param id
   * @param todo
   * @param isCompleted
   * @returns integer (count of effect rows)
   */
  updateById: async ({ id, todo, isCompleted }: Todo) => {
    const result = await client.query(
      `UPDATE ${TABLE.TODO} SET todo=?, isCompleted=? WHERE id=?`,
      [
        todo,
        isCompleted,
        id,
      ],
    )
    // return count of rows updated
    return result.affectedRows
  },

  /**
   * Deletes a todo by ID
   * @param id
   * @returns integer (count of effect rows)
   */
  deleteById: async ({ id }: Todo) => {
    const result = await client.query(
      `DELETE FROM ${TABLE.TODO} WHERE id = ?`,
      [id],
    )
    // return count of rows updated
    return result.affectedRows
  },
}
