import { Context } from "../../deps.ts";
import { verifyJwt } from "../utils/jwt.ts";

const authMiddleware = async (ctx: Context, next: () => Promise<unknown>) => {
  const jwtToken: string = ctx.request.headers.get("Authorization")
    ? ctx.request.headers.get("Authorization")!
    : "";
  const isValid = await verifyJwt(jwtToken);
  if (!isValid) {
    ctx.response.body = { msg: "Unauthorized" };
    ctx.response.status = 401;
    return;
  }
  await next();
};

export default authMiddleware;
