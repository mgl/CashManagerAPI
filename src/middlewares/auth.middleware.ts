import { Context } from "../../deps.ts";
import { verifyJwt } from "../utils/jwt.ts";
import { excluded_routes } from "../config.ts";

const authMiddleware = async (ctx: Context, next: () => Promise<unknown>) => {
  if (excluded_routes.includes(ctx.request.url.pathname)) {
    await next();
    return;
  }
  const jwtToken: string =
    ctx.request.headers.get("Authorization")?.replace("Bearer ", "") || "";
  try {
    // Add the user to the context
    if (jwtToken) {
      const payload = await verifyJwt(jwtToken);
      ctx.state = payload;
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
