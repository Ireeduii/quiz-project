"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Genghis Khan",
    url: "#",
    icon: Home,
  },
  {
    title: "Figma ашиглах заавар",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Санхүүгийн шийдвэрүүд",
    url: "#",
    icon: Calendar,
  },

  {
    title: "Санхүүгийн технологи 2023",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="pt-14 absolute">
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold text-black text-[15px] -mt-4">
            History
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="flex wrap-anywhere text-black "
                >
                  <SidebarMenuButton className="" asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

// {/* <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
//   {/* Sidebar-ийн доторх агуулга */}
//   {isOpen && (
//     <div className="full-content">
//       {/* Нээлттэй үед харагдах дэлгэрэнгүй агуулга */}
//       <p>Home</p>
//       <p>Settings</p>
//       {/* ... */}
//     </div>
//   )}
//   {!isOpen && (
//     <div className="collapsed-content">
//       {/* Хаалттай үед харагдах товч агуулга (зөвхөн Icon г.м.) */}
//       {/* ... Icon-ууд ... */}
//     </div>
//   )}
// </div>

// {/* Sidebar-ийг нээх/хаах товч */}
// <button onClick={toggleSidebar}>
//   {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
// </button> */}

// import React, { useState } from 'react';

// function AppSidebar() {
//   // Sidebar нээлттэй эсэхийг хадгалах state
//   const [isOpen, setIsOpen] = useState(true); // Анхны утгыг 'true' эсвэл 'false' тохируулж болно

//   // Sidebar-ийн төлөвийг сэлгэх функц
//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   // ... бусад код
// }
