// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardDescription,
//   CardFooter,
//   CardTitle,
// } from "@/components/ui/card";
// import { useEffect, useState } from "react";

// export default function Quiz() {
//   const [quizData, setQuizData] = useState([]);
//   const [summary, setSummary] = useState("");
//   const []

//   useEffect(() => {
//     const result = localStorage.getItem("quizResult");
//     if (result) setSummary(result);
//   }, []);
//   const generateQuiz = async () => {
//     if (!summary) return alert("No summary found");

//     const res = await fetch("/api/quiz", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ content: summary, title: "Generated quiz" }),
//     });
//     const data = await res.json();
//     setQuizData(data.quizArray || []);
//   };
//   return (
//     <div className="ml-60 mt-30">
//       <div className="">
//         <div className="flex mb-5 gap-2">
//           <img className="w-4 h-4" src="star.png" />
//           <CardTitle>Quick test</CardTitle>

//           <Button className="border bg-white text-black w-4 h-5 ml-80 ">
//             X
//           </Button>
//         </div>
//         <CardDescription className="-mt-4 mb-5 text-[#71717A]">
//           Take a quick test about your knowledge from your content.
//         </CardDescription>
//       </div>

//       {quizData.length > 0 && (
//         <Card className="w-[300px] mt-3">
//          {quizData.map((q, i) => (
//           <p> {q.question}</p>

//           {q.options.map((opt: string, idx: number) => (
//             <Button key={idx}>{opt}</Button>
//           ))}
//          ))}

//         </Card>
//       )}
//     </div>
//   );
// }
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Quiz() {
  // const params = useSearchParams();
  // const articleId = params.get("article");

  const path = useParams();
  console.log("PATH", path);

  // const { id } = useParams();
  // console.log("Article id", id);

  const [quizData, setQuizData] = useState<any[]>([]);
  const [summary, setSummary] = useState("");
  const [articleId, setArticleId] = useState<number>();

  useEffect(() => {
    const result = localStorage.getItem("quizResult");
    if (result) setSummary(result);
  }, []);

  const generateQuiz = async () => {
    if (!summary) return alert("No summary found!");

    const res = await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: summary,
        title: "Generated Quiz",
        articleId,
      }),
    });

    const data = await res.json();
    if (data.error) {
      alert(data.error);
      return;
    }

    setQuizData(data.quizArray || []);
  };

  return (
    <div className="ml-60 mt-30">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img className="w-4 h-4" src="star.png" />
          <CardTitle>Quick test</CardTitle>
        </div>
        <Button className="border bg-white text-black">X</Button>
      </div>

      <CardDescription className="mb-5 text-[#71717A]">
        Take a quick test based on your summarized content.
      </CardDescription>

      <Button onClick={generateQuiz}>Generate Quiz</Button>

      {quizData.length > 0 && (
        <Card className="w-[450px] mt-5">
          {quizData.map((q, articleId) => (
            <CardFooter className="flex-col gap-2">
              <p className="font-medium mb-2">{q.question}</p>
              {q.options.map((opt: string, articleId: number) => (
                <Button key={articleId} variant="outline" className="w-[200px]">
                  {opt}
                </Button>
              ))}
            </CardFooter>
          ))}
        </Card>
      )}
    </div>
  );
}
