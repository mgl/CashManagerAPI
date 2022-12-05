import { Context } from "../../deps.ts";
import { verifyJwt } from "../utils/jwt.ts";

const authMiddleware = async (ctx: Context, next: () => Promise<unknown>) => {
  if (ctx.request.url.pathname.startsWith("/api/auth")) {
    await next();
    return;
  }
  const jwtToken: string =
    ctx.request.headers.get("Authorization")?.replace("Bearer ", "") || "";
  try {
    if (jwtToken && await verifyJwt(jwtToken)) {
      await next();
    }
  } catch (_e) {
    // Dont do anything
  }
  ctx.response.body = { status: false, message: "Unauthorized" };
  ctx.response.status = 401;
};

export default authMiddleware;
