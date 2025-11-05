import { ArticleQuiz } from "../_components/home/ArticleQuiz";
import { QuickTest } from "../_components/home/QuictTest";
import { SummarizeHistory } from "../_components/home/SummarizeHistory";

export function Home() {
  return (
    <div className=" max-w-[1900px] w-full h-screen ">
      {/* <ArticleQuiz /> */}
      {/* <QuickTest /> */}
      <SummarizeHistory />
    </div>
  );
}

export default Home;
