import { Bson } from "../../deps.ts";

export interface BankAccount {
  _id?: Bson.ObjectId;
  account_number?: number;
  firstname?: string;
  lastname?: string;
  balance: number;
}
