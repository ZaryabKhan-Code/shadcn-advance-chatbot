"use client";

import * as React from "react";
import { SidebarTrigger, useSidebar, } from "./ui/sidebar";
import { ChevronDownIcon, Share2Icon, SunIcon, MoonIcon, Edit, StarIcon } from "lucide-react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useTheme } from "next-themes"; // For theme toggling
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button"
import { ShareDialog } from "./sharedialog";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const Header = () => {
    const { open } = useSidebar(); // Get sidebar open state
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
    const [showPanel, setShowPanel] = React.useState<Checked>(false);
    const { theme, setTheme } = useTheme(); // Theme toggle functionality

    return (
        <>
            <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2 justify-between">
                {/* Left Side: Share Button and Theme Toggle */}

                {/* Center: Sidebar Toggle & Plus Icon */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-sm">
                        <SidebarTrigger className="ml-[1.1]" />
                    </div>

                    {!open && (
                        <div className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-sm">
                            <Edit className="w-5 h-5" />
                        </div>
                    )}
                    <div className="font-[family-name:var(--font-geist-sans)]">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-[140px] flex items-center justify-between px-3 font-[family-name:var(--font-geist-sans)]">
                                    Appearance
                                    <ChevronDownIcon className="w-4 h-4 ml-1" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="start"
                                className="font-[family-name:var(--font-geist-sans)]"
                            >
                                <DropdownMenuCheckboxItem
                                    checked={showStatusBar}
                                    onCheckedChange={setShowStatusBar}
                                >
                                    Status Bar
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={showActivityBar}
                                    onCheckedChange={setShowActivityBar}
                                    disabled
                                >
                                    Activity Bar
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={showPanel}
                                    onCheckedChange={setShowPanel}
                                >
                                    Panel
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                </div>
                <div className="flex items-center gap-2">
                    <ShareDialog />
                    <button
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                        <StarIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                        {theme === "dark" ? (
                            <SunIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        ) : (
                            <MoonIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        )}
                    </button>
                </div>

            </header>
        </>
    );
};

export default Header;
