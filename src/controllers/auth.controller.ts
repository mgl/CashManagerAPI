import bankAccounts from "../models/bank_account.model.ts";
import { bcrypt, Context } from "../../deps.ts";
import { createJwt } from "../utils/jwt.ts";
import { BankAccount } from "../interfaces/bank_account.interface.ts";
import { generateAccountNumber } from "../utils/account_number_gen.ts";

export default {
  register: async ({ request, response }: Context) => {
    const body = request.body();
    const { password } = await body.value;
    if (!password) {
      response.status = 400;
      response.body = { msg: "Please specify a password" };
      return;
    }
    const hashedPassword = await bcrypt.hash(password);
    const user: BankAccount = {
      account_number: generateAccountNumber(),
      password: hashedPassword,
      balance: 0,
    };
    const account: BankAccount = await bankAccounts.add(user);
    if (account) {
      response.status = 201;
      response.body = {
        success: true,
        message: "Account created successfully",
        data: {
          account_number: account.account_number,
          balance: account.balance,
        },
      };
    } else {
      response.status = 500;
      response.body = {
        success: false,
        message: "Account not created",
      };
    }
  },

  login: async ({ request, response }: Context) => {
    const body = await request.body().value;
    const { account_number, password } = body;
    const user = await bankAccounts.getByAccountNumber(account_number);
    if (!user) {
      response.status = 404;
      response.body = {
        success: false,
        message: "User not found",
      };
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      response.status = 400;
      response.body = {
        success: false,
        message: "Invalid credentials",
      };
      return;
    }
    const token = await createJwt(user.account_number);
    response.status = 200;
    response.body = {
      success: true,
      message: "Successfully logged in",
      token,
    };
  },
};
