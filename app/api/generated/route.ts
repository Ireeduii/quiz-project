import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { prisma } from "@/lib/prisma";
import { title } from "process";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json();

    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: input,
      config: {
        systemInstruction:
          "You have to make a short summary of the submitted content within 5 sentences.",
      },
    });

    const text = res.text;

    const articles = await prisma.articles.create({
      data: {
        summary: text,
        content: input,
        // title: input,
      },
    });

    return NextResponse.json({ text, articles, title });
  } catch (error) {
    console.error("Error generating summary:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
