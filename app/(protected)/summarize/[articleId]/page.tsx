"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SummarizedContent() {
  const router = useRouter();
  const path = useParams();

  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [articleId, setArticleId] = useState<number>(0);
  const [originalContent, setOriginalContent] = useState<string>("");

  useEffect(() => {
    const result = localStorage.getItem("summaryResult");
    const storedTitle = localStorage.getItem("articleTitle");
    const id = path.id || path.articleId || localStorage.getItem("articleId");
    const original = localStorage.getItem("originalContent");

    if (id) setArticleId(Number(id));
    if (result) setSummary(result);
    if (storedTitle) setTitle(storedTitle);
    if (originalContent) setOriginalContent(originalContent);
  }, [path]);

  const generateQuiz = async () => {
    setLoading(true);
    if (!summary) return;

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: summary,
          title,
          articleId,
        }),
      });

      const data = await res.json();
      console.log("DATAAAA", data);

      if (data.quizArray && data.quizArray.length > 0) {
        localStorage.setItem("quizResult", JSON.stringify(data));
        router.push(`/quiz/${path.id}`);
      } else if (data.text) {
        localStorage.setItem("quizResult", data.text);
        router.push(`/quiz/${path.id}`);
      } else {
        alert(
          "Quiz generation successful, but no quiz questions were returned."
        );
      }

      if (data.data?.id) {
        setArticleId(data.data.id);
        localStorage.setItem("articleId", data.data.id);
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to connect to the quiz generation service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card className="w-[600px] ml-40 mt-20">
        <CardHeader>
          <div className="flex gap-2 ml-2">
            <img className="w-4 h-4" src="/star.png" alt="star" />
            <CardTitle>Article Quiz Generator</CardTitle>
          </div>

          <CardDescription className="text-gray-400 text-[14px] flex gap-2 mt-3">
            <img className="w-4 h-4 mt-1" src="/book.png" />
            Summarized content
          </CardDescription>
          <CardTitle className="ml-5 mt-3 -mb-5 ">{title}</CardTitle>
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

        <div className="flex justify-end mr-5 mb-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-[140px] bg-white text-black border mr-64 hover:bg-gray-100">
                See content
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogDescription className="whitespace-pre-wrap text-gray-700">
                  {originalContent || "No content found."}
                  <AlertDialogCancel className=" w-[20px] flex ml-130">
                    X
                  </AlertDialogCancel>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter></AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            className="w-[140px]"
            disabled={loading || !summary}
            onClick={generateQuiz}
          >
            {loading ? "Extracting..." : "Take quiz"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
