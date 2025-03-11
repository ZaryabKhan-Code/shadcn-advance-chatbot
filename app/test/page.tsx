"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatLayout() {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Auto-scroll to bottom
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, []);

    return (
        <main className="h-screen w-full bg-gray-100 p-6 flex flex-col items-center">
            <div className="w-full max-w-2xl flex flex-col h-full bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Fixed Header */}
                <header className="p-4 bg-white shadow-md z-10">
                    <h1 className="text-lg font-semibold">Chat Interface</h1>
                </header>

                {/* Scrollable Chat Messages */}
                <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                    <div className="space-y-4">
                        {[...Array(20)].map((_, i) => (
                            <Card key={i}>
                                <CardContent className="p-4">Message {i + 1}</CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>

                {/* Fixed Input Bar */}
                <footer className="p-4 bg-white shadow-md z-10 border-t flex items-center gap-2">
                    <Input placeholder="Type a message..." className="flex-1" />
                    <Button>Send</Button>
                </footer>
            </div>
        </main>
    );
}
