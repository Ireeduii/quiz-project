"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/AppSidebar";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SidebarProvider>
      <AppSidebar />
      {
        <div className={`sidebar ${isOpen ? `open` : `closed`}`}>
          {isOpen && <div></div>}
          {!isOpen && <div></div>}
        </div>
      }
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
// const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };
