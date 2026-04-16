import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";
import { PgBoolean } from "drizzle-orm/pg-core";

if (!ENV.DB_URL) {
  throw new Error("DB_URL is not set in environment variables");
}

export const pool = new Pool({ connectionString: ENV.DB_URL });

pool.on("connect", () => {
  console.log("Database connected successfully");
});

pool.on("error", (err) => {
  console.error("💥 Database connection error:", err);
});

export const db = drizzle({ client: pool, schema });
