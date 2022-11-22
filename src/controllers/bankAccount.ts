import { BankAccount } from "../interfaces/bankAccount.ts";
import BankAccountModel from "../models/bankAccount.ts";

// Pour debug :
/*const bidule = body
    response.status = 200;
    response.body = {
        dump: bidule
    };
    return */

export default {
  /**
   * @description Get all bank accounts
   * @route GET /api/accounts
   */
  getAll: async ({ response }: { response: any }) => {
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
  create: async ({ request, response }: { request: any; response: any }) => {
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
    { params, response }: { params: { account_num: string }; response: any },
  ) => {
    try {
      console.log(params.account_num);
      const isAvailable = await BankAccountModel.getByAccountNumber(
        { accountNumber: Number(params.account_num) },
      );

      if (!isAvailable) {
        response.status = 404;
        response.body = {
          success: false,
          message: "No todo found",
        };
        return;
      }

      const todo: BankAccount = await BankAccountModel.getById({
        id: Number(params.id),
      });
      response.status = 200;
      response.body = {
        success: true,
        data: todo,
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
   * @description Update bank account by id
   * @route PUT /accounts/:id
   */
  updateById: async (
    { params, request, response }: {
      params: { id: string };
      request: any;
      response: any;
    },
  ) => {
    try {
      const isAvailable = await BankAccountModel.doesExistById(
        { id: Number(params.id) },
      );
      if (!isAvailable) {
        response.status = 404;
        response.body = {
          success: false,
          message: "No todo found",
        };
        return;
      }

      // if todo found then update todo
      const body = await request.body();
      const updatedRows = await BankAccountModel.updateById({
        id: Number(params.id),
        ...body.value,
      });
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
   * @route DELETE /accounts/:id
   */
  deleteById: async (
    { params, response }: { params: { id: string }; response: any },
  ) => {
    try {
      const updatedRows = await BankAccountModel.deleteById({
        id: Number(params.id),
      });
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
};
