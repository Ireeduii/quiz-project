import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
console.log("gemini", process.env.GEMINI_API_KEY);

export async function POST(request: NextRequest) {
  const { input, response } = await request.json();
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: input,
    config: {
      systemInstruction: `You have to convert short content ${response}`,
    },
  });
  const text = res.text;
  return NextResponse.json({ text });
}
