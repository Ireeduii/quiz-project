"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheck, CircleX } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface QuizItem {
  question: string;
  options: string[];
  answer: number;
  userAnswer?: number;
}

export default function Quiz() {
  const params = useParams();
  const { articleId } = params;
  const router = useRouter();

  console.log({ articleId });

  const [originalQuizData, setOriginalQuizData] = useState<QuizItem[]>([]);
  const [quizData, setQuizData] = useState<QuizItem[]>([]);
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

        const cleaned = parseData.quizArray.map((q: QuizItem) => ({
          ...q,
          userAnswer: undefined,
        }));
        setOriginalQuizData(parseData.quizArray || []);
      } catch (e) {
        console.log("Failed to parse quizResult:", e);
      }
    }
    // const idFromPath = path.id;
  }, [articleId]);

  const handleRestart = () => {
    if (!originalQuizData.length) return;

    const resetQuiz = originalQuizData.map((q) => ({
      ...q,
      userAnswer: undefined,
    }));
    setQuizData(resetQuiz);
    setCurrentIndex(0);
    setShowResult(false);
  };

  const handleBefore = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setShowResult(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };
  const handleAnswer = (index: number) => {
    const newQuizData = [...quizData];
    newQuizData[currentIndex].userAnswer = index;
    setQuizData(newQuizData);
  };

  const handleSave = async () => {
    console.log({ params });

    const score = quizData.filter((q) => q.userAnswer === q.answer).length;
    if (!articleId) return alert("Missing article Id");

    const res = await fetch("/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        articleId: articleId,
        score,
        total: quizData.length,
        userId: 1,
      }),
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
            <div className="flex  gap-2">
              <img className="w-5 h-5" src="/star2.png" />
              <CardTitle className="">Quick test</CardTitle>
            </div>
            <Button className="border bg-white text-black">X</Button>
          </div>

          <CardDescription className="mb-5 text-[#71717A]">
            Take a quick test about your knowledge from your content.
          </CardDescription>

          {quizData.length > 0 && quizData[currentIndex] && !showResult && (
            <Card className="w-[450px] mt-5 p-4">
              <p className="font-medium mb-3 ">
                {currentIndex + 1}. {quizData[currentIndex].question}
              </p>

              {quizData[currentIndex].options.map((opt, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className={`w-full justify-start text-left whitespace-normal wrap-break-word  ${
                    quizData[currentIndex].userAnswer === i ? "bg-gray-100" : ""
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
          {showResult && (
            <div className="-mt-15">
              <div className="flex gap-3 ">
                <img src={"/star2.png"} className="w-6 h-6 mt-1" />
                <CardTitle className="font-semibold text-xl">
                  Quiz Completed!
                </CardTitle>
              </div>

              <div className="flex gap-3">
                <div className="mt-6">
                  <CardTitle className="mb-3 text-lg text-[#71717A] text-[14px] -mt-2.5 fonr-">
                    Let's see what you did
                  </CardTitle>
                  <Card className="w-[550px] mt-5 p-4 text-center">
                    <p className="mt-3 text-2xl font-semibold mr-85">
                      Your score:
                      {
                        quizData.filter((q) => q.userAnswer === q.answer).length
                      }{" "}
                      <span className="text-gray-400 text-[14px]">
                        / {quizData.length}
                      </span>
                    </p>

                    {quizData.map((q, idx) => {
                      const isCorrect = q.userAnswer === q.answer;
                      return (
                        <div key={idx} className="mb-4 text-left">
                          <div className="flex items-start gap-2">
                            <div>
                              {isCorrect ? (
                                <CircleCheck className="text-green-500" />
                              ) : (
                                <CircleX className="text-red-500" />
                              )}
                            </div>

                            <div>
                              <div>
                                <p className="font-medium text-[15px] ">
                                  {idx + 1}. {q.question}
                                </p>

                                <p
                                  className={`text-sm mt-1 font-semibold flex justify-start ${
                                    isCorrect ? "text-green-600" : "text-black"
                                  }`}
                                >
                                  Your answer:{" "}
                                  <span className="font-medium ">
                                    {q.userAnswer !== undefined
                                      ? q.options[q.userAnswer]
                                      : "Not answered"}
                                  </span>
                                </p>
                              </div>

                              {!isCorrect && (
                                <p className="text-green-600 text-sm mt-1 flex justify-start">
                                  Correct:{" "}
                                  <span className="font-medium">
                                    {q.options[q.answer]}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex justify-between mt-4">
                      <Button
                        className="text-black bg-white border hover:bg-gray-100"
                        onClick={handleRestart}
                      >
                        Restart quiz
                      </Button>
                      <Button className="flex" onClick={handleSave}>
                        Save and Leave
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {quizData.length === 0 && (
            <Button onClick={handleRestart}>Generate Quiz</Button>
          )}
        </div>
      )}
    </div>
  );
}
