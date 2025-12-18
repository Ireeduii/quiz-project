// import { Pool } from "pg";

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// export async function query(text: string, values?: string[]) {
//   const res = await pool.query(text, values);
//   return res;
// }

import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

attachDatabasePool(pool);

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});
