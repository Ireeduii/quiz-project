import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { clerkId, email, name } = await request.json();

    if (!clerkId || !email || !name) {
      return NextResponse.json({ error: "Missing" }, { status: 400 });
    }

    let loginUser = await prisma.users.findUnique({
      where: { clerkid: clerkId },
    });

    console.log("FIND", loginUser);

    if (!loginUser) {
      loginUser = await prisma.users.create({
        data: { clerkid: clerkId, email, name },
      });
    }

    return NextResponse.json({
      message: "Successfully",
      data: loginUser,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
