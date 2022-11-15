import { Bson } from "../../deps.ts"

export interface BankAccount {
  _id: Bson.ObjectId
  email: string
  firstname?: string
  lastname?: string
  password: string
  balance: number
}

