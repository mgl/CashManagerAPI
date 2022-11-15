/**
 * deps.ts
 *
 * This module re-exports the required methods from the dependant remote Ramda module.
 */
export { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
export { Bson, MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
export { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";