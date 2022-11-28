import { MongoClient } from "../../deps.ts";
import { DB_NAME, URI } from "../config.ts";

class DB {
  client: MongoClient;
  uri: string;
  dbName: string;

  constructor(dbName: string, uri: string) {
    this.client = {} as MongoClient;
    this.dbName = dbName;
    this.uri = uri;
  }

  connect() {
    this.client = new MongoClient();
    this.client.connect(URI);
  }

  get getDb() {
    return this.client.database(this.dbName);
  }
}

const db = new DB(DB_NAME, URI);
db.connect();

export default db;
