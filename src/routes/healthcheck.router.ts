import { RouterContext } from "../../deps.ts";
import { Router } from "../../deps.ts";
import { mod } from "../../deps.ts";
const router = new Router();

router.get<string>("/api/healthcheck", (ctx: RouterContext<string>) => {
  ctx.response.body = {
    status: "success",
    message: "CashManager API is up and running :)",
    hostname: mod.hostname(),
    loadavg: mod.loadavg(),
  };
  ctx.response.status = 200;
});
export default router;
