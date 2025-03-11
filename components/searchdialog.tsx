"use client";

import * as React from "react";
import { Search, History, PlusCircle, HelpCircle } from "lucide-react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";

export function SearchDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
    // Handle keyboard shortcut Ctrl + J to open the search dialog
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(!open);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [setOpen]);

    return (
        <CommandDialog open={open} onOpenChange={setOpen} >
            {/* Search Input */}
            <CommandInput placeholder="Search chats, commands, or settings..." className="font-[family-name:var(--font-geist-sans)]" />

            <CommandList className="font-[family-name:var(--font-geist-sans)]">
                <CommandEmpty>No results found.</CommandEmpty>

                {/* Suggestions Group */}
                <CommandGroup heading="Suggestions">
                    <CommandItem>
                        <PlusCircle className="w-4 h-4 mr-2" />
                        <span>Start a New Chat</span>
                    </CommandItem>
                    <CommandItem>
                        <History className="w-4 h-4 mr-2" />
                        <span>Recent Chats</span>
                    </CommandItem>
                    <CommandItem>
                        <HelpCircle className="w-4 h-4 mr-2" />
                        <span>Help & Support</span>
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                {/* Settings Group */}
                <CommandGroup heading="Settings">
                    <CommandItem>
                        <Search className="w-4 h-4 mr-2" />
                        <span>Advanced Search</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
