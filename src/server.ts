import { Application } from "../deps.ts";
import Logger from "./middlewares/logger.ts";
import ErrorMiddleware from "./middlewares/error.ts";
import AuthMiddleware from "./middlewares/auth.ts";
import routerAccount from "./routes/bankAccount.ts";
import routerTransaction from "./routes/transactions.ts";
import healthRouter from "./routes/healthcheck.ts";
import { PORT as port } from "./config.ts";

const app = new Application();

app.use(Logger.logger);
app.use(Logger.responseTime);
app.use(ErrorMiddleware);
app.use(AuthMiddleware);

app.use(routerTransaction.routes());
app.use(routerTransaction.allowedMethods());

app.use(routerAccount.routes());
app.use(routerAccount.allowedMethods());

app.use(healthRouter.routes());
app.use(healthRouter.allowedMethods());

console.log(`CashManager API server running on port ${port}`);

await app.listen({ port });
