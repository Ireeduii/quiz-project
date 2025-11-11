import { ArticleQuiz } from "../_components/home/ArticleQuiz";
import { QuickTest } from "../_components/home/QuickTest";
import { SummarizeHistory } from "../_components/home/SummarizeHistory";
import SummarizedContent from "./summarize/[articleId]/page";

export function Home() {
  return (
    <div className=" max-w-[1900px] w-full h-screen  ">
      {/* <ArticleQuiz /> */}
      {/* <QuickTest />  */}
      <SummarizeHistory />
      {/* <SummarizedContent /> */}
    </div>
  );
}

export default Home;
