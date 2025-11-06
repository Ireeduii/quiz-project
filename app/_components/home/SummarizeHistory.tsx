"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SummarizeHistory() {
  const [name, setName] = useState("");
  const [input, setInput] = useState("");

  const router = useRouter();

  const onSummarize = async () => {
    if (!input.trim()) return;

    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();

    if (data.text) {
      localStorage.setItem("summaryResult", data.text);
      router.push("/summarize");
    }
  };

  return (
    <div>
      <ChevronLeft className="bg-black" />
      <Card className="w-[600px] ml-40 mt-20">
        <CardHeader>
          <div className="flex gap-2 ml-2">
            <img className="w-4 h-4" src="star.png" />
            <CardTitle>Article Quiz Generator</CardTitle>
          </div>

          <CardDescription className="text-gray-400 text-[14px] flex gap-2 mt-3">
            <img className="w-4 h-4 mt-1" src="book.png" />
            Summarized content
          </CardDescription>
        </CardHeader>

        <form>
          <div className="ml-5 mr-5">
            <Textarea
              placeholder="Enter a title for your article..."
              className="-mt-1 border-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="ml-5 mr-5">
            <Textarea
              placeholder="Paste your article content here..."
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="mt-6 border-0 h-content"
            />
          </div>
        </form>

        <div className="flex justify-end mr-5 mb-3">
          <Button onClick={onSummarize} className="w-[150px]">
            Generate summary
          </Button>
        </div>
      </Card>
    </div>
  );
}
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       onSummarize();
//     }
//   };
