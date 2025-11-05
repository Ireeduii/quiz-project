import { query } from "@/lib/connectDB";
import { NextRequest } from "next/server";

export async function GET() {
  const students = await query("SELECT * FROM students");
  return Response.json({ message: "success", data: students });
}

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { name, age, gender } = body;

  const students = await query(
    `INSERT INTO students(name, age, gender) VALUES(${name}, ${age}, ${gender})`
  );
  return Response.json({ message: "successfully added", data: students });
};
