const env = Deno.env.toObject();

const PORT: number = Number(Deno.env.get("PORT")) || 8080;
const URI: string = Deno.env.get("DB_URI") || "mongodb://root:root@mongo:27017";
const DB_NAME: string = Deno.env.get("DB_NAME") || "cashmanager";
const ACCOUNTS_COLLECTION_NAME: string =
  Deno.env.get("ACCOUNTS_COLLECTION_NAME") ||
  "bankAccounts";
const TRANSACTIONS_COLLECTION_NAME: string =
  Deno.env.get("TRANSACTIONS_COLLECTION_NAME") || "transactions";
const JWT_KEY: CryptoKey = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);
const JWT_EXPIRES_IN: number = Number(Deno.env.get("JWT_EXPIRES_IN")) ||
  3600 * 60 * 24;

export {
  ACCOUNTS_COLLECTION_NAME,
  DB_NAME,
  env,
  JWT_EXPIRES_IN,
  JWT_KEY,
  PORT,
  TRANSACTIONS_COLLECTION_NAME,
  URI,
};
