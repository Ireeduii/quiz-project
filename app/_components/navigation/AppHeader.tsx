"use client";

import Link from "next/link";

export const AppHeader = () => {
  return (
    <header className="flex justify-between fixed z-50 w-full border bg-white ">
      <div className="font-semibold ml-10 mt-2 cursor-pointer">
        <Link href="/"> Quiz app</Link>
      </div>
    </header>
  );
};
