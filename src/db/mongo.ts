import { MongoClient } from "../../deps.ts";

const URI: string = Deno.env.get("DB_URI")
  ? Deno.env.get("DB_URI")!
  : "mongodb://localhost:27017";

const mongoClient: MongoClient = new MongoClient();
try {
  await mongoClient.connect(URI);
  console.log("Database successfully connected");
} catch (err) {
  console.error("Exiting because database connection failed: ", err);
  Deno.exit(1);
}

export { mongoClient };
