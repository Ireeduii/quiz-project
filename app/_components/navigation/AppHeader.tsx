"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const AppHeader = () => {
  return (
    <header className="flex justify-between fixed z-50 w-full border bg-white ">
      <div className="font-semibold ml-10 cursor-pointer ">
        <Link className="mt-2" href="/">
          Quiz app
        </Link>
        <span className=" ml-180 ">
          <UserButton />
        </span>
      </div>
    </header>
  );
};
