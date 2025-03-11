'use client';

import { useState } from "react";
import Header from "./header";
import { Input } from "@/components/ui/input";
import { Search, NotebookText } from "lucide-react";

const EntriesInterface: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="relative flex min-h-svh flex-1 flex-col bg-background peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col bg-background">
                <Header />

                {/* Centered Explore Your Entries Section */}
                <div className="flex flex-1 items-center justify-center px-4 mt-5">
                    <div className="w-full max-w-lg text-center">

                        {/* Lucide Icon + Heading */}
                        <div className="flex flex-col items-center">
                            <NotebookText className="w-12 h-12 text-blue-500 dark:text-blue-400 mb-2" />
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                                Explore Your Entries
                            </h2>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
                            Manage your past chats, notes, and insights in one place.
                        </p>

                        {/* Search Bar */}
                        <div className="relative mt-6">
                            {/* Centered Search Icon */}
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

                            {/* Search Input */}
                            <Input
                                type="text"
                                placeholder="Search your entries..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EntriesInterface;
