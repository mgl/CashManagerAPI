import { Application, Router } from "../deps.ts";
import { MongoClient } from "../deps.ts";

const router: Router = new Router();
const port: number = Deno.env.get("PORT") ? parseInt(Deno.env.get("PORT")!) : 3000;

router
  .get("/", (context) => {
    context.response.body = "CashManager API";
  });

// Connect to MongoDB
const client = new MongoClient();
const mongoURI: string = Deno.env.get("DB_URI") ? Deno.env.get("DB_URI")! : "mongodb://localhost:27017";
client.connect(mongoURI);
console.log(client.listDatabases());

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port });