import client from "../db/client.ts";
// config
import { TABLE } from "../db/config.ts";
// Interface
import { BankAccount } from "../interfaces/BankAccount.ts";

export default {
  /**
   * Takes in the id params & checks if the todo item exists
   * in the database
   * @param id
   * @returns boolean to tell if an entry of todo exits in table
   */
  doesExistById: async ({ _id }: BankAccount) => {
    const [result] = await client.query(
      `SELECT COUNT(*) count FROM ${TABLE.TODO} WHERE id = ? LIMIT 1`,
      [_id],
    );
    return result.count > 0;
  },
  /**
   * Will return all the entries in the todo column
   * @returns array of todos
   */
  getAll: async () => {
    return await client.query(`SELECT * FROM ${TABLE.TODO}`);
  },
  /**
   * Takes in the id params & returns the todo item found
   * against it.
   * @param id
   * @returns object of todo item
   */
  getById: async ({ _id }: BankAccount) => {
    return await client.query(
      `SELECT * FROM ${TABLE.TODO} WHERE id = ?`,
      [_id],
    );
  },
  /**
   * Adds a new todo item to todo table
   * @param todo
   * @param isCompleted
   */
  add: async (
    { todo, isCompleted }: BankAccount,
  ) => {
    return await client.query(
      `INSERT INTO ${TABLE.TODO}(todo, isCompleted) values(?, ?)`,
      [
        todo,
        isCompleted,
      ],
    );
  },
  /**
   * Updates the content of a single todo item
   * @param id
   * @param todo
   * @param isCompleted
   * @returns integer (count of effect rows)
   */
  updateById: async ({ _id, todo, isCompleted }: BankAccount) => {
    const result = await client.query(
      `UPDATE ${TABLE.TODO} SET todo=?, isCompleted=? WHERE id=?`,
      [
        todo,
        isCompleted,
        _id,
      ],
    );
    // return count of rows updated
    return result.affectedRows;
  },
  /**
   * Deletes a todo by ID
   * @param id
   * @returns integer (count of effect rows)
   */
  deleteById: async ({ _id }: BankAccount) => {
    const result = await client.query(
      `DELETE FROM ${TABLE.TODO} WHERE id = ?`,
      [_id],
    );
    // return count of rows updated
    return result.affectedRows;
  },
};