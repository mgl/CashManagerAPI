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
  3600 * 24;

const EXCLUDED_ROUTES: string[] = [""];

if (Deno.env.get("DB_NAME") === "cashmanagertest") {
  const EXCLUDED_ROUTES: string[] = [
    "/api/auth/login",
    "/api/auth/register",
    "/api/healthcheck"
  ];
} else {
  const EXCLUDED_ROUTES: string[] = [
    "/api/auth/register",
    "/api/healthcheck"
  ];
}

export {
  ACCOUNTS_COLLECTION_NAME,
  DB_NAME,
  env,
  EXCLUDED_ROUTES,
  JWT_EXPIRES_IN,
  JWT_KEY,
  PORT,
  TRANSACTIONS_COLLECTION_NAME,
  URI,
};
