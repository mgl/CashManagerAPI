import { Application } from "../deps.ts";
import Logger from "./middlewares/logger.middleware.ts";
import ErrorMiddleware from "./middlewares/error.middleware.ts";
import AuthMiddleware from "./middlewares/auth.middleware.ts";
import routerAccount from "./routes/bank_accounts.router.ts";
import routerTransaction from "./routes/transactions.router.ts";
import healthRouter from "./routes/healthcheck.router.ts";
import authRouter from "./routes/auth.router.ts";
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

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

console.log(`CashManager API server running on port ${port}`);

await app.listen({ port });
