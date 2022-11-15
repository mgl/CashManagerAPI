import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/mod.ts";
import { Application, Router } from "../deps.ts";
import { db } from "./db/mongo.ts";
import { Bson } from '../deps.ts';
import routerAccount from "./routes/bankAccount.ts"

const router: Router = new Router();
const port: number = Deno.env.get("PORT")
  ? parseInt(Deno.env.get("PORT")!)
  : 8080;

router
  .get("/", (context) => {
    context.response.body = "CashManager API";
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods())

app.use(routerAccount.routes());
app.use(routerAccount.allowedMethods());

console.log(`CashManager API server running on port ${port}`);

await app.listen({ port });
