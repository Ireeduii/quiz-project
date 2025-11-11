"use client";

import { useRouter } from "next/router";

export const AppHeader = () => {
  // const router = useRouter();

  return (
    <header className="flex justify-between fixed z-50 w-full border bg-white ">
      <h3
        // onClick={() => router.push("/SummarizeHistory")}
        className="font-semibold ml-10 mt-2"
      >
        Quiz app
      </h3>
      <img className="mr-3" src="header.png" />
    </header>
  );
};

// fixed scroll hisen c gsen dagaj yvdg
