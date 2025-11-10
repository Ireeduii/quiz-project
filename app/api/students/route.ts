// import { query } from "@/lib/connectDB";
// import { NextRequest } from "next/server";

// export async function GET() {
//   const students = await query("SELECT * FROM students");
//   return Response.json({ message: "success", data: students });
// }

// export const POST = async (request: NextRequest) => {
//   const body = await request.json();
//   const { name, age, gender } = body;

//   const students = await query(
//     `INSERT INTO students(name, age, gender) VALUES(${name}, ${age}, ${gender})`
//   );
//   return Response.json({ message: "successfully added", data: students });
// };

import { query } from "@/lib/connectDB";
import { prisma } from "@/lib/prisma";
import { request } from "http";
import { NextRequest } from "next/server";

export const GET = async () => {
  const students = await prisma.students.findMany({
    where: {
      age: {
        gt: 18,
      },
    },
  });

  return Response.json({ message: "succes", data: students });
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { name, age, gender } = body;

  const students = await prisma.students.create({
    data: {
      name: "Iredui",
      age: 20,
      gender: "female",
    },
  });
  return Response.json({ message: "successfully added", data: students });
};
