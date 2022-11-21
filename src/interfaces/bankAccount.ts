import { Long } from "https://deno.land/x/web_bson@v0.2.5/mod.ts";
import { Bson } from "../../deps.ts";

export interface BankAccount {
  _id: Bson.ObjectId;
  account_number: Long;
  firstname?: string;
  lastname?: string;
  balance: number;
}
