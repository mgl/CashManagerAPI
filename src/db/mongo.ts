import { MongoClient } from "../../deps.ts";
import { DB_NAME, URI } from "../config.ts";

const mongoClient: MongoClient = new MongoClient();
try {
  await mongoClient.connect(URI);
  console.log("Database successfully connected");
} catch (err) {
  console.error("Exiting because database connection failed: ", err);
  Deno.exit(1);
}

const db = mongoClient.database(DB_NAME);

export { db };
