import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
console.log("gemini", process.env.GEMINI_API_KEY);

export async function POST(request: NextRequest) {
  const { input, response } = await request.json();
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: input,
    config: {
      systemInstruction: `You have to make a short summary of the submitted content within 5 sentences. ${response}`,
    },
  });
  const text = res.text;
  return NextResponse.json({ text });
}

// function neon(DATABASE_URL: string | undefined) {
//   throw new Error("Function not implemented.");
// }
// const articleContent = await query(
//       `INSERT INTO articles(title, content, summary) VALUES($1, $2, $3)`,
//       [titlePrompt, transformedContentPrompt, text]
//     );
