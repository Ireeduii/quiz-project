"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../_components/navigation/AppSidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/login");
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div>Loading</div>
      </div>
    );
  }
  return (
    <SidebarProvider>
      <AppSidebar />

      <main>
        <div className="pt-14 relative">
          <div className=" h-screen bg-white absolute">
            <SidebarTrigger />
          </div>

          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
