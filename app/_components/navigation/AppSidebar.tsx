"use client";

import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface Article {
  id: number;
  title: string;
  content: string;
}

interface AppSidebarProps {
  onSelect?: (article: Article) => void;
}

export default function AppSidebar({ onSelect }: AppSidebarProps) {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("history");
    if (saved) {
      setArticles(JSON.parse(saved));
    }
  }, []);

  return (
    <Sidebar className="w-[260px] border-r">
      <SidebarContent className="pt-14">
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold text-black text-[15px] mt-3">
            History
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {articles.length > 0 ? (
                articles.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onSelect?.(item)}
                      className="flex items-center text-black hover:bg-gray-200"
                    >
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <p className="text-gray-500 text-sm mt-4">No history yet.</p>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
