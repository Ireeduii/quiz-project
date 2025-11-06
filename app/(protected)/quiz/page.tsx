"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Quiz() {
  const [quiz, setQuiz] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const result = localStorage.getItem("quizResult");
    if (result) setSummary(result);
  }, []);
  const quickTest = async () => {
    if (!quiz) return;

    //   const res = await fetch("/api/")
  };
  return (
    <div className="ml-60 mt-30">
      <div className="">
        <div className="flex mb-5 gap-2">
          <img className="w-4 h-4" src="star.png" />
          <CardTitle>Quick test</CardTitle>

          <Button className="border bg-white text-black w-4 h-5 ml-80 ">
            X
          </Button>
        </div>
        <CardDescription className="-mt-4 mb-5 text-[#71717A]">
          Take a quick test about your knowledge from your content.
        </CardDescription>
      </div>
      <Card className="w-[450px]">
        <CardFooter className="flex-col gap-2 ">
          <CardDescription className="text-black font-semibold -ml-30">
            What was Genghis Khan’s birth name?
          </CardDescription>

          <div className="  ">
            <Button variant="outline" className="w-[200px] ">
              Yesugei
            </Button>
            <Button variant="outline" className=" w-[200px]">
              Temüjin{" "}
            </Button>
          </div>

          <div className=" ">
            <Button variant="outline" className="w-[200px]">
              Jamukha
            </Button>

            <Button variant="outline" className=" w-[200px]">
              Toghrul
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
