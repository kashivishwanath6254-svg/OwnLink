import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("Missing DATABASE_URL environment variable.");
}

const sql = postgres(DATABASE_URL);

export async function verifyDatabaseConnection() {
  await sql`SELECT NOW()`;
  console.log("Connected to Database");
}

export default sql;
