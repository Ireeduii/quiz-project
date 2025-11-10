"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChevronLeft } from "lucide-react";
import { use, useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { title } from "process";
import { text } from "stream/consumers";

export default function SummarizedContent() {
  const router = useRouter();
  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const result = localStorage.getItem("summaryResult");
    if (result) setSummary(result);
  }, []);

  const generateQuiz = async () => {
    setLoading(true);
    if (!summary) return;

    try {
      const res = await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: summary, title }),
      });

      const data = await res.json();

      if (data.text) {
        localStorage.setItem("quizResult", data.text);
        //   setQuiz(data.quiz);
        router.push("/quiz");
      }
    } finally {
      setLoading(false);
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
            {summary && (
              <CardFooter className="mt-3 text-gray-700">
                <p>{summary}</p>
              </CardFooter>
            )}
          </div>
        </form>

        <div className="flex justify-end mr-5 mb-3 ">
          <Button className="w-[140px] bg-white text-black border mr-64 hover:bg-gray-100">
            See content
          </Button>
          <Button
            className="w-[140px]"
            disabled={loading || !summary}
            onClick={generateQuiz}
          >
            {loading ? "Extracting..." : "Generate summary"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
