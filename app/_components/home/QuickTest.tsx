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

export function QuickTest() {
  return (
    <div className="ml-60 mt-30">
      <div className="">
        <div className="flex mb-5 gap-2">
          <img className="w-4 h-4" src="star.png" />
          <CardTitle>Quict test</CardTitle>

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
            {/* <CardDescription>
              <div className="flex">
                <p className="text-black text-[13px]">
                  1<span className="bg-secondary">/5</span>
                </p>
              </div>
            </CardDescription> */}
          </CardDescription>
          <div>
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
                {" "}
                Toghrul
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
