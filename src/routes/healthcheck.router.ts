import { RouterContext } from "../../deps.ts";
import { Router } from "../../deps.ts";
const router = new Router();

router.get<string>("/api/healthcheck", (ctx: RouterContext<string>) => {
  ctx.response.body = {
    status: "success",
    message: "CashManager API is up and running :)",
  };
  ctx.response.status = 200;
});
export default router;
