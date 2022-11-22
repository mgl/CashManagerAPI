import { Application, Router } from "../deps.ts";
import Logger from "./middlewares/logger.ts";
import ErrorMiddleware from "./middlewares/error.ts";
import routerAccount from "./routes/bankAccount.ts";

const router: Router = new Router();
const port: number = Deno.env.get("PORT")
  ? parseInt(Deno.env.get("PORT")!)
  : 8080;

router
  .get("/", (context) => {
    context.response.body = "CashManager API";
  });

const app = new Application();

app.use(Logger.logger);
app.use(Logger.responseTime);

app.use(ErrorMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

app.use(routerAccount.routes());
app.use(routerAccount.allowedMethods());

console.log(`CashManager API server running on port ${port}`);

await app.listen({ port });
