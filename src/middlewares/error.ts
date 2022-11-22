import { isHttpError, Response } from "../../deps.ts";

const errorMiddleware = async (
  { response }: { response: Response },
  next: Function,
) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      response.status = err.status;
      const { message, status, stack } = err;
      response.body = { message, status, stack };
      response.type = "json";
    } else {
      response.status = 500;
      response.body = { message: err.message };
      response.type = "json";
    }
  }
};

export default errorMiddleware;
