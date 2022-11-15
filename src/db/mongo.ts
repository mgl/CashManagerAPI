import { MongoClient } from "../../deps.ts";

const URI: string = Deno.env.get("DB_URI")
  ? Deno.env.get("DB_URI")!
  : "mongodb://localhost:27017";

const database = Deno.env.get("DB_NAME")
  ? Deno.env.get("DB_NAME")!
  : "cashmanager";

const mongoClient: MongoClient = new MongoClient();
try {
  await mongoClient.connect(URI);
  console.log("Database successfully connected");
} catch (err) {
  console.error("Exiting because database connection failed: ", err);
  Deno.exit(1);
}

const db = mongoClient.database(database);
db.createCollection("bankaccounts");

export { db };
