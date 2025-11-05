import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

export function ArticleQuiz() {
  return (
    <div>
      <Card className="w-[500px] h-[456px] ml-50 mt-20 ">
        <CardHeader>
          <div className="flex gap-2">
            {/* <img src="star.png" /> */}
            <Star className="w-4 h-4" />
            <CardTitle>Article Quiz Generator</CardTitle>
          </div>

          <CardDescription>
            Paste your article below to generate a summarize and quiz question.
            Your articles will saved in the sidebar for future reference.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <div className="flex gap-2">
                  <img src="article.png" />
                  <Label htmlFor="email">Article Title</Label>
                </div>

                <Input
                  type="text"
                  placeholder="Enter a title for your article..."
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <div className="flex gap-2">
                    <img src="article.png" />
                    <Label htmlFor="email">Article Content</Label>
                  </div>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="Paste your article content here..."
                  className="h-30"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-evenly">
          <Button
            variant="outline"
            className="w-40 flex px-2 py-4 bg-gray-300 text-white ml-70 mt-8"
          >
            Generate summary
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
