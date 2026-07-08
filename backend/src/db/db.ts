import postgres from "postgres";
import { config } from "../config.js";

const sql = postgres(config.databaseUrl);

export async function verifyDatabaseConnection() {
  await sql`SELECT NOW()`;
  console.log("Connected to Database");
}

export default sql;
