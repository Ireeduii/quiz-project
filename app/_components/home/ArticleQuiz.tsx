import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ArticleQuiz() {
  return (
    <div>
      <Card className="w-[500px] h-[456px] ml-50 mt-20 ">
        <CardHeader>
          <div className="flex gap-2">
            <Star className="w-4 h-4" />
            <CardTitle>Article Quiz Generator</CardTitle>
          </div>

          <CardDescription>
            Paste your article below to generate a summary and quiz question.
            Your articles will be saved in the sidebar for future reference.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <div className="flex gap-2">
                  <img src="article.png" />
                  <Label>Article Title</Label>
                </div>

                <Input
                  type="text"
                  placeholder="Enter a title for your article..."
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex gap-2">
                  <img src="article.png" />
                  <Label>Article Content</Label>
                </div>

                <Input
                  type="text"
                  required
                  placeholder="Paste your article content here..."
                  className="h-30"
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-evenly">
          <Link href="/summary">
            <Button
              variant="outline"
              className="w-40 flex px-2 py-4 bg-gray-300 text-white ml-70 mt-8"
            >
              Generate summary
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
