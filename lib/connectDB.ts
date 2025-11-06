import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function query(text: string, values?: string[]) {
  console.log("ENV", process.env.DATABASE_URL);
  const res = await pool.query(text, values);
  return res;
}
