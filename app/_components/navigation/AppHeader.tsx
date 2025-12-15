"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const AppHeader = () => {
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/" className="text-xl font-semibold text-gray-800">
            Quiz App
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </header>
  );
};
