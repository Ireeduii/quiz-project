// import { NextResponse } from "next/server";
// import { GoogleGenAI } from "@google/genai";
// import { prisma } from "@/lib/prisma";

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// export async function POST(req: Request) {
//   try {
//     const { content, title } = await req.json();

//     if (!content) {
//       return NextResponse.json(
//         { error: "No content provided" },
//         { status: 400 }
//       );
//     }

//     const res = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: `
//         Generate 5 multiple choice questions based on this article: ${content}.
//         Return the response in this exact JSON format:
//         [
//           {
//             "question": "Question text here",
//             "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
//             "answer": "0"
//           }
//         ]
//         Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.
//       `,
//     });

//     const text = res.text;

//     const quizzes = await prisma.quizzes.createMany({
//       data: [],
//     });

//     return NextResponse.json({ text });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to generate quiz" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { prisma } from "@/lib/prisma";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { content, title, articleId } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "No content provided" },
        { status: 400 }
      );
    }

    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        Generate 5 multiple choice questions based on this article: ${content}.
        Return the response in this exact JSON format:
        [
          {
            "question": "Question text here",
            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "answer": 0
          }
        ]
        Make sure the response is valid JSON.
      `,
    });
    console.log("resssssss", res);

    const text = res.text || "[]";

    let cleanedJson = text.replace(/```json\s*|```/g, "").trim();
    let quizArray: any[] = [];
    quizArray = JSON.parse(cleanedJson);

    const saved = await prisma.quizzes.createMany({
      data: quizArray.map((q) => ({
        // title: title,
        question: q.question,
        options: q.options,
        answer: q.answer.toString(),
        articleid: articleId,
      })),
    });

    return NextResponse.json({ quizArray, saved });
  } catch (error) {
    console.log("quiz generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
}
