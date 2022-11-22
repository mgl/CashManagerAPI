import { Request, Response } from "../../deps.ts";
import BankAccountModel from "../models/bankAccount.ts";

export default {
  /**
   * @description Get all bank accounts
   * @route GET /api/accounts
   */
  getAll: async ({ response }: { response: Response }) => {
    try {
      const data = await BankAccountModel.getAll();
      response.status = 200;
      response.body = {
        success: true,
        data,
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      };
    }
  },

  /**
   * @description Add a new bank account
   * @route POST /api/accounts
   */
  create: async (
    { request, response }: { request: Request; response: Response },
  ) => {
    const body = await request.body().value;

    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data provided",
      };
      return;
    }

    try {
      await BankAccountModel.add({
        account_number: body.account_number,
        firstname: body.firstname,
        lastname: body.lastname,
        balance: body.balance,
      });

      response.body = {
        success: true,
        message: "The record was added successfully",
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `${error}`,
      };
    }
  },

  /**
   * @description Get bank account by id
   * @route GET /accounts/:account_num
   */
  getByAccountNum: async (
    { params, response }: {
      params: { account_num: string };
      response: Response;
    },
  ) => {
    try {
      const account_number: number = +params.account_num;
      const isAvailable = await BankAccountModel.getByAccountNumber(
        account_number,
      );

      if (!isAvailable) {
        response.status = 404;
        response.body = {
          success: false,
          message: "No account found",
        };
        return;
      }

      response.status = 200;
      response.body = {
        success: true,
        data: isAvailable,
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      };
    }
  },

  /**
   * @description Update bank account by account number
   * @route PUT /accounts/:account_num
   */
  updateByAccountNum: async (
    { params, request, response }: {
      params: { account_num: string };
      request: Request;
      response: Response;
    },
  ) => {
    try {
      const account_number: number = +params.account_num;
      const isAvailable = await BankAccountModel.getByAccountNumber(
        account_number,
      );
      if (!isAvailable) {
        response.status = 404;
        response.body = {
          success: false,
          message: "No account found",
        };
        return;
      }

      const body = await request.body().value;
      const updatedRows =
        await (await BankAccountModel.update(account_number, body))
          .modifiedCount;
      response.status = 200;
      response.body = {
        success: true,
        message: `Successfully updated ${updatedRows} row(s)`,
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      };
    }
  },

  /**
   * @description Delete bank account by id
   * @route DELETE /accounts/:account_num
   */
  deleteById: async (
    { params, response }: {
      params: { account_num: string };
      response: Response;
    },
  ) => {
    try {
      const account_number: number = +params.account_num;
      const updatedRows = await BankAccountModel.deleteByAccountNumber(
        account_number,
      );
      response.status = 200;
      response.body = {
        success: true,
        message: `Successfully updated ${updatedRows} row(s)`,
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `${error}`,
      };
    }
  },
};
