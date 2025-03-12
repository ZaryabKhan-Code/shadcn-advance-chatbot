'use client';

import { useState } from "react";
import Header from "./header";
import { Input } from "@/components/ui/input";
import { Search, NotebookText, Trash2, Eye, Copy, Star, Share2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const mockEntries = [
    { id: 1, title: "Meeting Notes", date: "March 10, 2025", favorite: true },
    { id: 2, title: "Project Roadmap", date: "March 8, 2025", favorite: false },
    { id: 3, title: "Ideas & Brainstorming", date: "March 5, 2025", favorite: true },
    { id: 4, title: "To-Do List", date: "March 2, 2025", favorite: false },
];

const EntriesInterface: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [entries, setEntries] = useState(mockEntries);

    // Toggle favorite (star) functionality
    const toggleFavorite = (id: number) => {
        setEntries(entries.map(entry => entry.id === id ? { ...entry, favorite: !entry.favorite } : entry));
    };

    return (
        <div className="relative flex min-h-svh flex-1 flex-col bg-background peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col bg-background">
                <Header />
                <div className="flex flex-1 flex-col items-center justify-center px-4 mt-5">
                    <div className="w-full max-w-lg text-center">
                        <div className="flex flex-col items-center">
                            <NotebookText className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 dark:text-gray-400 mb-2" />
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                                Explore Your Entries
                            </h2>
                        </div>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mt-2">
                            Manage your past chats, notes, and insights in one place.
                        </p>
                        <div className="relative mt-6">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search your entries..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-2 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 text-sm sm:text-base md:text-lg"
                            />
                        </div>
                    </div>
                </div>
                <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-7 max-w-5xl mx-auto w-full">
                    {entries.map((entry) => (
                        <Card key={entry.id} className="relative border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition">
                            <CardHeader>
                                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                                    <CardTitle className="text-md font-semibold truncate max-w-[180px] sm:max-w-[220px]">
                                        {entry.title}
                                    </CardTitle>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => toggleFavorite(entry.id)}
                                            className="text-gray-400 hover:text-yellow-500 transition"
                                        >
                                            <Star className={`w-5 h-5 ${entry.favorite ? 'text-yellow-500' : 'text-gray-400'}`} />
                                        </button>
                                        <button className="text-gray-400 transition">
                                            <Share2Icon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500">{entry.date}</p>
                            </CardHeader>
                            <CardFooter className="flex justify-between gap-1">
                                {/* Action Buttons with Text + Icons */}
                                <Button variant="ghost" size="sm" className="border flex items-center gap-1 text-red-500 hover:text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </Button>
                                <Button variant="ghost" size="sm" className="border flex items-center gap-1 text-gray-600 dark:text-gray-300">
                                    <Eye className="w-4 h-4" />
                                    View
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EntriesInterface;
