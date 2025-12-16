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
import Image from "next/image";

export function SummarizeHistory() {
  const [title, setTitle] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSummarize = async () => {
    setLoading(true);
    if (!input.trim()) return;

    try {
      const res = await fetch("/api/generated", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, title }),
      });

      const data = await res.json();
      console.log("DATA", data);

      if (data.text) {
        localStorage.setItem("summaryResult", data.text);
        localStorage.setItem("articleTitle", title);
        localStorage.setItem("originalContent", input);

        router.push(`/summarize/${data.articles.id}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ChevronLeft className="  border rounded-sm " />

      <Card className="w-[700px] ml-40 mt-20">
        <CardHeader>
          <div className="flex gap-2 ml-2">
            {/* <Image className="w-4 h-4" src={"star2.png"} alt="" /> */}

            <Image src="/star2.png" alt="star" width={20} height={20} />

            <CardTitle>Article Quiz Generator</CardTitle>
          </div>

          <CardDescription className="text-gray-400 text-[14px] flex gap-2 mt-3">
            Summarized content
          </CardDescription>
        </CardHeader>

        <form>
          <div className="ml-5 mr-5">
            <Textarea
              placeholder="Enter a title for your article..."
              className="-mt-1 border-0"
              onChange={(e) => setTitle(e.target.value)}
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
          <Button
            onClick={onSummarize}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSummarize();
              }
            }}
            disabled={loading || !input}
            className="w-[150px]"
          >
            {loading ? "Extracting..." : "Generate summary"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
