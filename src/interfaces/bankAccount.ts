import { Bson, Long } from "../../deps.ts";

export interface BankAccount {
  _id?: Bson.ObjectId;
  account_number?: Long;
  firstname?: string;
  lastname?: string;
  balance: number;
}
