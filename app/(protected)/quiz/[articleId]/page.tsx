"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface QuizItem {
  question: string;
  options: string[];
  answer: number;
  // correct answer
  userAnswer?: number;
}

export default function Quiz() {
  const path = useParams();

  const [quizData, setQuizData] = useState<QuizItem[]>([]);
  const [articleId, setArticleId] = useState<number>();
  const [quizRawText, setQuizRawText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const result = localStorage.getItem("quizResult");
    if (result) {
      setQuizRawText(result);
      try {
        const parseData = JSON.parse(result);
        setQuizData(parseData.quizArray || []);
      } catch (e) {
        console.error("Failed to parse quizResult:", e);
      }
    }

    const idFromPath = path.id;
    if (idFromPath) setArticleId(Number(idFromPath));
  }, [path]);

  const generateQuiz = async () => {
    if (!quizRawText)
      return alert(
        "No quiz content found to regenerate! Go back and generate the quiz first."
      );

    const res = await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: quizRawText,
        title: "Generated Quiz",
        articleId,
      }),
    });

    const data = await res.json();
    if (data.error) return alert(data.error);

    setQuizData(data.quizArray || []);
    setCurrentIndex(0);
    setShowResult(false);
    localStorage.setItem("quizResult", JSON.stringify(data));
  };

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBefore = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setShowResult(false);
    }
  };

  return (
    <div className="ml-60 mt-30">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img className="w-4 h-4" src="/star2.png" />
          <CardTitle>Quick test</CardTitle>
        </div>
        <Button className="border bg-white text-black">X</Button>
      </div>

      <CardDescription className="mb-5 text-[#71717A]">
        Take a quick test about your knowledge from your content.
      </CardDescription>

      {quizData.length > 0 && quizData[currentIndex] && !showResult && (
        <Card className="w-[450px] mt-5 p-4">
          <p className="font-medium mb-3">
            {currentIndex + 1}. {quizData[currentIndex].question}
          </p>

          {quizData[currentIndex].options.map((opt, i) => (
            <Button
              key={i}
              variant="outline"
              className="w-full justify-start text-left mb-2"
            >
              {opt}
            </Button>
          ))}
          {/* <div className="flex justify-start mt-4">
            <Button onClick={handleBefore}>
              {currentIndex  > quizData.length + 1 ? "Before" }
            </Button>
          </div> */}
          <div className="flex justify-between mt-4">
            <Button
              onClick={handleBefore}
              disabled={currentIndex === 0}
              className="mt-4 ml-1"
            >
              ← Before
            </Button>
            <Button className="flex justify-end mt-4" onClick={handleNext}>
              {currentIndex < quizData.length - 1 ? "Next →" : "Finish"}
            </Button>
          </div>
        </Card>
      )}

      {showResult && (
        <Card className="w-[450px] mt-5 p-4 text-center">
          <CardTitle>🎉 Quiz Completed!</CardTitle>
          <CardDescription>You’ve reached the end of the quiz.</CardDescription>
          <Button className="mt-4" onClick={generateQuiz}>
            Regenerate Quiz
          </Button>
        </Card>
      )}
      {/* {showResult && (
        <Card className="w-[450px] mt-5 p-4 text-center">
          <CardTitle>🎉 Quiz Completed!</CardTitle>
          <CardDescription>You’ve reached the end of the quiz.</CardDescription>

          <p className="mt-3">
            Your score: {""}
            {quizData.filter((q) => q.userAnswer === q.answer).length} /{" "}
            {quizData.length}
          </p>

          <Button className="mt-4" onClick={async() => {
            await fetch
          }}></Button>
        </Card>
      )} */}

      {quizData.length === 0 && (
        <Button onClick={generateQuiz}>Generate Quiz (Re-fetch)</Button>
      )}
    </div>
  );
}
