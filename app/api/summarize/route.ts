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
      systemInstruction: `You should take a short content ${response}`,
    },
  });
  const text = res.text;
  return NextResponse.json({ text });
}
//   try {
//     const {prompt} = await request.json()

//     if (!prompt) {
//         return NextResponse.json(
//             {error: "Prompt is required"},
//             {status: 400}
//         )
//     }
//     const response = await hf.chatCompletion({

//     })
//   }
