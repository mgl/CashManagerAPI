import { Application, Router } from "../deps.ts";

const router = new Router();
const port = 8080;
router
  .get("/", (context) => {
    context.response.body = "CashManager API";
  })

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port });
