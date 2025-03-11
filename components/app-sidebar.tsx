import * as React from "react";
import { Search, Edit, History, PlusCircle, HelpCircle } from "lucide-react";
import { NavMain } from "../components/nav-main";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import Image from "next/image";
import { NavFavorites } from "./nav-favorites";

// Sample data for a chatbot application
const data = {
    user: {
        name: "Zaryab",
        email: "zk126128@gmail.com",
        avatar: "https://img.icons8.com/color/48/gender-neutral-user.png",
    },

    navMain: [
        {
            title: "New Chat",
            url: "#",
            icon: <PlusCircle className="w-5 h-5" />,
        },
        {
            title: "Entries",
            url: "#",
            icon: <History className="w-5 h-5" />,
        },
        {
            title: "Help",
            url: "#",
            icon: <HelpCircle className="w-5 h-5" />, // Help icon added
        },

    ],
    favorites: [
        {
            name: "Project Management & Task Tracking",
            url: "#",
            emoji: "📊",
        },
        {
            name: "Family Recipe Collection & Meal Planning",
            url: "#",
            emoji: "🍳",
        },
        {
            name: "Fitness Tracker & Workout Routines",
            url: "#",
            emoji: "💪",
        },
        {
            name: "Book Notes & Reading List",
            url: "#",
            emoji: "📚",
        },
        {
            name: "Sustainable Gardening Tips & Plant Care",
            url: "#",
            emoji: "🌱",
        },
        {
            name: "Language Learning Progress & Resources",
            url: "#",
            emoji: "🗣️",
        },
        {
            name: "Home Renovation Ideas & Budget Tracker",
            url: "#",
            emoji: "🏠",
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex justify-between">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                                <Image src={"/s.png"} alt="logo" width={40} height={40} className="size-7" />
                            </div>
                            <div className="flex justify-center flex-row leading-none gap-3 mt-[0.5]">
                                {/* Search Button */}
                                <div className="flex items-center justify-center cursor-pointer hover:text-gray-800 dark:hover:text-white">
                                    <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                </div>
                                {/* Edit Button */}
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <Edit className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {/* Updated Navigation Menu */}
                <SidebarMenu>
                    {data.navMain.map((item, index) => (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton asChild>
                                <a href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                                    {item.icon}
                                    <span className="text-sm font-medium">{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                <NavFavorites favorites={data.favorites} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
