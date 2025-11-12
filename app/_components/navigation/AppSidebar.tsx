// "use client";

// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";

// const items = [
//   {
//     title: "Genghis Khan",
//     url: "#",
//     icon: Home,
//   },
//   {
//     title: "Figma ашиглах заавар",
//     url: "#",
//     icon: Inbox,
//   },
//   {
//     title: "Санхүүгийн шийдвэрүүд",
//     url: "#",
//     icon: Calendar,
//   },

//   {
//     title: "Санхүүгийн технологи 2023",
//     url: "#",
//     icon: Settings,
//   },
// ];

// export function AppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarContent className="pt-14 absolute">
//         <SidebarGroup>
//           <SidebarGroupLabel className="font-semibold text-black text-[15px] -mt-4">
//             History
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem
//                   key={item.title}
//                   className="flex wrap-anywhere text-black "
//                 >
//                   <SidebarMenuButton className="" asChild>
//                     <a href={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }

// // "use client";

// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import {
// //   Sheet,
// //   SheetContent,
// //   SheetHeader,
// //   SheetTitle,
// //   SheetTrigger,
// // } from "@/components/ui/sheet";
// // import { Button } from "@/components/ui/button";
// // import { History } from "lucide-react";

// // export function AppSidebar() {
// //   const [articles, setArticles] = useState<any[]>([]);
// //   const router = useRouter();

// //   useEffect(() => {
// //     fetch("/api/history")
// //       .then((res) => res.json())
// //       .then((data) => setArticles(data))
// //       .catch((err) => console.error("Failed to load history:", err));
// //   }, []);

// //   return (
// //     <Sheet>
// //       <SheetTrigger asChild>
// //         <Button variant="outline" className="flex items-center gap-2 mt-30">
// //           <History className="w-4 h-4" />
// //           History
// //         </Button>
// //       </SheetTrigger>
// //       <SheetContent
// //         side="right"
// //         className="w-[350px] sm:w-[400px] overflow-y-auto"
// //       >
// //         <SheetHeader>
// //           <SheetTitle className="text-lg font-semibold">History</SheetTitle>
// //         </SheetHeader>

// //         <div className="mt-4 space-y-2">
// //           {articles.length > 0 ? (
// //             articles.map((item) => (
// //               <div
// //                 key={item.id}
// //                 onClick={() => router.push(`/summarize/${item.id}`)}
// //                 className="p-3 border rounded-md cursor-pointer hover:bg-gray-100 transition"
// //               >
// //                 <h3 className="font-medium">{item.title}</h3>
// //               </div>
// //             ))
// //           ) : (
// //             <p className="text-gray-500 text-sm">No history yet.</p>
// //           )}
// //         </div>
// //       </SheetContent>
// //     </Sheet>
// //   );
// // }

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
  onSelect: (article: Article) => void;
}

export function AppSidebar({ onSelect }: AppSidebarProps) {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("history");
    if (saved) {
      setArticles(JSON.parse(saved));
    }
  }, []);

  return (
    <Sidebar className="w-[280px] border-r">
      <SidebarContent className="pt-14">
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold text-black text-[15px] -mt-4">
            History
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {articles.length > 0 ? (
                articles.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onSelect(item)}
                      className="flex items-center text-black hover:bg-gray-200"
                    >
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <p className="text-gray-500 text-sm mt-2">No history yet.</p>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
export default AppSidebar;
