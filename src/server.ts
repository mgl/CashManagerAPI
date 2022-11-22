import { Application } from "../deps.ts";
import Logger from "./middlewares/logger.ts";
import ErrorMiddleware from "./middlewares/error.ts";
import routerAccount from "./routes/bankAccount.ts";
import routerTransaction from "./routes/transactions.ts";

const port: number = Deno.env.get("PORT")
  ? parseInt(Deno.env.get("PORT")!)
  : 8080;

const app = new Application();

app.use(Logger.logger);
app.use(Logger.responseTime);

app.use(ErrorMiddleware);

app.use(routerTransaction.routes());
app.use(routerTransaction.allowedMethods());

app.use(routerAccount.routes());
app.use(routerAccount.allowedMethods());

console.log(`CashManager API server running on port ${port}`);

await app.listen({ port });
