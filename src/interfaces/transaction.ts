import { Bson } from "../../deps.ts";
import { BankAccount } from "./bankAccount.ts";

export interface Transaction {
  _id?: Bson.ObjectId;
  date: Date;
  amount: number;
  from: BankAccount;
  to: BankAccount;
}
