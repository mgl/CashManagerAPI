import { MongoClient } from "../../deps.ts";
import { DB_NAME, URI } from "../config.ts";

class DB {
  public client: MongoClient;
  uri: string;
  dbName: string;

  constructor(dbName: string, uri: string) {
    this.client = {} as MongoClient;
    this.dbName = dbName;
    this.uri = uri;
  }

  async connect() {
    const client = new MongoClient();
    await client.connect(this.uri);
    this.client = client;
  }

  get getDb() {
    return this.client.database(this.dbName);
  }
}

const db = new DB(DB_NAME, URI);
await db.connect();

export default db;
