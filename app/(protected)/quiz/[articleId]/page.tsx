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
  console.log("artttt", articleId);

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

  const handleAnswer = (index: number) => {
    const newQuizData = [...quizData];
    newQuizData[currentIndex].userAnswer = index;
    setQuizData(newQuizData);
  };

  const saveAndLeave = async () => {
    const score = quizData.filter((q) => q.userAnswer === q.answer).length;
    if (!articleId) return alert("Missing articleId");

    const res = await fetch("/api/quiz/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ articleId, score, total: quizData.length }),
    });
    const data = await res.json();
    if (data.error) return alert(data.error);
    alert(`Score saved: ${score} / ${quizData.length}`);
  };

  return (
    <div className="ml-60 mt-30">
      {!showResult ? (
        <div>
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
                  className={`w-full justify-start text-left mb-2 ${
                    quizData[currentIndex].userAnswer === i ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleAnswer(i)}
                >
                  {opt}
                </Button>
              ))}

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
        </div>
      ) : (
        <div>
          <Card className="w-[450px] mt-5 p-4 text-center">
            {showResult && (
              <div>
                <div className="flex gap-3">
                  <img src={"/star2.png"} className="w-6 h-6 mt-1" />
                  <CardTitle className="font-semibold text-xl">
                    {" "}
                    Quiz Completed!
                  </CardTitle>
                </div>
                <CardDescription>Let’s see what you did</CardDescription>

                <p className="mt-3">
                  Your score:{" "}
                  {quizData.filter((q) => q.userAnswer === q.answer).length} /{" "}
                  {quizData.length}
                </p>
                <div className="flex justify-between mt-4">
                  <Button
                    className="text-black bg-white border"
                    onClick={generateQuiz}
                  >
                    Restart quiz
                  </Button>
                  <Button className="flex" onClick={saveAndLeave}>
                    Save and Leave
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {quizData.length === 0 && (
            <Button onClick={generateQuiz}>Generate Quiz (Re-fetch)</Button>
          )}
        </div>
      )}
    </div>
  );
}
