// interfaces
import BankAccount from "../interfaces/bankAccount.ts";
// models
import BankAccountModel from "../models/bankAccount.ts";

export default {
  /**
   * @description Get all bank accounts
   * @route GET /accounts
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
   * @route POST /accounts
   */
  create: async (
    { request, response }: { request: any; response: any },
  ) => {
    const body = await request.body();
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data provided",
      };
      return;
    }

    try {
      await BankAccountModel.add(
        { todo: body.value.todo, isCompleted: false },
      );
      response.body = {
        success: true,
        message: "The record was added successfully",
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
   * @description Get bank account by id
   * @route GET /accounts/:id
   */
  getById: async (
    { params, response }: { params: { id: string }; response: any },
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

      const todo: BankAccount = await BankAccountModel.getById({ id: Number(params.id) });
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
