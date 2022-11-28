import { MongoClient } from "../../deps.ts";

const URI: string = Deno.env.get("DB_URI") || "mongodb://root:root@mongo:27017";

const database: string = Deno.env.get("DB_NAME") || "cashmanager";

const mongoClient: MongoClient = new MongoClient();
try {
  await mongoClient.connect(URI);
  console.log("Database successfully connected");
} catch (err) {
  console.error("Exiting because database connection failed: ", err);
  Deno.exit(1);
}

const db = mongoClient.database(database);

export { db };
