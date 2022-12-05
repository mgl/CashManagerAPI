import { Context } from "../../deps.ts";
import { verifyJwt } from "../utils/jwt.ts";
import { EXCLUDED_ROUTES } from "../config.ts";

const authMiddleware = async (ctx: Context, next: () => Promise<unknown>) => {
  if (EXCLUDED_ROUTES.includes(ctx.request.url.pathname)) {
    await next();
    return;
  }
  const jwtToken: string =
    ctx.request.headers.get("Authorization")?.replace("Bearer ", "") || "";
  try {
    if (jwtToken && await verifyJwt(jwtToken)) {
      await next();
      return;
    }
  } catch (_e) {
    // Respond with 401
  }
  ctx.response.body = { status: false, message: "Unauthorized" };
  ctx.response.status = 401;
};

export default authMiddleware;
