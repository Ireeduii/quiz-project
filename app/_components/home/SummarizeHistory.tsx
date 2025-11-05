// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { ChevronLeft } from "lucide-react";
// import { useState } from "react";

// export function SummarizeHistory() {
//   const [input, setInput] = useState("");
//   const [response, setResponse] = useState("");

//   const onSummarize = async () => {
//     if (!input.trim()) return;

//     const res = await fetch("/api/summarize", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text: input }),
//     });

//     const data = await res.json();
//     if (data.output) setResponse(data.output);
//     setInput("");

//     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//       if (e.key === "Enter" && !e.shiftKey) {
//         e.preventDefault();
//         onSummarize();
//       }
//     };
//     return (
//       <div>
//         <ChevronLeft className="bg-black" />
//         <Card className="w-[600px]  ml-40 mt-20">
//           <CardHeader>
//             <div className="flex gap-2 ml-2">
//               <img className="w-4 h-4" src="star.png" />
//               <CardTitle>Article Quiz Generator</CardTitle>
//             </div>

//             <CardDescription className="text-gray-400 text-[14px] flex gap-2">
//               <img className="w-4 h-4 mt-1" src="book.png" />
//               Summarized content
//             </CardDescription>
//           </CardHeader>
//           <form>
//             <div className="ml-5 mr-5">
//               <Input type="text " className="mt-1 border-0 h-content"></Input>
//             </div>

//             <div className="flex gap-2 mt-6 ml-8">
//               <img className="h-4 w-4 mt-1 " src="articl.png" />
//               <CardDescription>Article content</CardDescription>
//             </div>

//             <div className="ml-5 mr-5">
//               <Input
//                 type="text "
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 className="mt-6  border-0 h-content"
//               ></Input>
//             </div>
//           </form>
//           <div className="flex justify-end mr-5">
//             <Button onClick={onSummarize} className="w-[150px] ">
//               Generate summary
//             </Button>
//           </div>
//         </Card>
//       </div>
//     );
//   };
// }
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

export function SummarizeHistory() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const onSummarize = async () => {
    if (!input.trim()) return;

    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, response }),
    });

    const data = await res.json();
    if (data.text) {
      setResponse(data.text);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSummarize();
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
            <Input type="text" className="-mt-1 border-0 h-" />
          </div>

          <div className="flex gap-2 mt-6 ml-8">
            <img className="h-4 w-4 mt-1" src="articl.png" />
            <CardDescription>Article content</CardDescription>
          </div>

          <div className="ml-5 mr-5">
            <Input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="mt-6 border-0 h-content"
            />
          </div>
        </form>

        <div className="flex justify-end mr-5 mb-3">
          <Button onClick={onSummarize} className="w-[150px]">
            Generate summary
          </Button>
        </div>

        {response && (
          <CardFooter className="mt-3 text-gray-700">
            <p>{response}</p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
