'use client';

import { ArrowUpIcon, MicIcon, ThumbsUp, ThumbsDown, Copy, AudioLinesIcon, FileText, NotebookPen, EarthIcon, RefreshCcw } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Header from "./header";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const ChatInterface: React.FC = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot"; isLast?: boolean; isLoading?: boolean }[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [showResume, setShowResume] = useState(false);
    const [journalEntries, setJournalEntries] = useState<string[]>(["Today was a productive day. I completed my tasks efficiently.", "Reflected on my goals and made a plan for the upcoming week."]);

    useEffect(() => {
        console.log("hello world", window.location.hash)
        if (window.location.hash === "#view") {
            setShowResume(true);
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setMessages([
                {
                    text: "Hello! I'm your AI assistant. How can I help you today?",
                    sender: "bot",
                    isLast: true,
                },
            ]);
        }, 500);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            const newHeight = Math.min(textareaRef.current.scrollHeight, window.innerHeight * 0.3);
            textareaRef.current.style.height = `${newHeight}px`;
        }
    };

    const resetTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "50px";
        }
    };

    const sendMessage = () => {
        if (message.trim() === "") return;
        const newMessages = [...messages.map(msg => ({ ...msg, isLast: false })), { text: message, sender: "user" as "user" | "bot" }];
        setMessages(newMessages);
        setMessage("");

        resetTextarea();

        setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, { text: "", sender: "bot", isLast: true, isLoading: true }]);
        }, 500);

        setTimeout(() => {
            setMessages(prevMessages => prevMessages.map(msg => msg.isLoading ? { text: "This is an automated bot response.", sender: "bot", isLast: true, isLoading: false } : msg));
        }, 2000);

        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 2200);
    };

    return (
        <div className="relative flex min-h-svh flex-1 flex-col bg-background peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col min-w-0 h-dvh bg-background">
                <Header />
                <Tabs defaultValue={!showResume ? "chat" : "journal"} className="flex  flex-col min-w-0 gap-5 flex-1 overflow-y-scroll">
                    {showResume && (
                        <div className="flex items-center justify-center mt-3 p-4">
                            <TabsList className="flex items-center justify-center w-[450px]">
                                <TabsTrigger value="journal">Journal Entry</TabsTrigger>
                                <TabsTrigger value="chat">Conversation</TabsTrigger>
                            </TabsList>
                        </div>
                    )}
                    <TabsContent value="journal" className="p-4 pt-0">
                        <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <NotebookPen className="w-5 h-5" /> Journal Entries
                            </h2>
                            <div className="mt-4 space-y-4">
                                {journalEntries.length > 0 ? (
                                    journalEntries.map((entry, index) => (
                                        <div key={index} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                                            <p className="text-gray-800 dark:text-gray-300">{entry}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400">No journal entries available.</p>
                                )}
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="chat">
                        {messages.map((msg, index) => (
                            <div key={index} className="w-full mx-auto max-w-3xl px-5 group/message">
                                <div className={`break-words w-fit max-w-[80%] md:max-w-[70%] lg:max-w-[65%] p-2  md:p-3 text-sm md:text-[16px] 
                            ${msg.sender === "user"
                                        ? "bg-blue-500 text-white self-end rounded-lg ml-auto"
                                        : "text-gray-800  self-start bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg mt-2 md:mt-3"
                                    }`}
                                >
                                    {msg.isLoading ? (
                                        <div className="flex items-center space-x-1 md:space-x-2">
                                            <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></div>
                                            <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                                            <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-400"></div>
                                        </div>
                                    ) : (
                                        msg.text
                                    )}
                                </div>

                                {/* Interaction buttons always visible for last bot message, otherwise only on hover */}
                                {msg.sender === "bot" && !msg.isLoading && (
                                    <div className={`flex mt-2 pl-[6px] pt-[2px] space-x-2 text-gray-500 transition-opacity duration-300 
                                ${msg.isLast ? "opacity-100" : "opacity-0 group-hover/message:opacity-100"}`}
                                    >
                                        <Copy className="w-4 h-4 cursor-pointer hover:text-gray-700" />
                                        <ThumbsUp className="w-4 h-4 cursor-pointer hover:text-gray-700" />
                                        <ThumbsDown className="w-4 h-4 cursor-pointer hover:text-gray-700" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </TabsContent>
                    <div ref={messagesEndRef} />
                </Tabs>

                <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
                    <div className={`relative w-full flex flex-col gap-4`}>
                        {showResume ?
                            <div className="flex justify-center py-4">
                                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                    <RefreshCcw className="w-5 h-5" />
                                    Resume Conversation
                                </button>

                            </div>
                            : <>
                                <textarea
                                    ref={textareaRef}
                                    placeholder="Send a message..."
                                    className="flex w-full border border-input px-3 py-2  ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[100px] max-h-[calc(80dvh)] overflow-hidden resize-none rounded-2xl !text-base bg-muted pb-10 dark:border-zinc-700"
                                    rows={1}
                                    value={message}
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                                />
                                <>
                                    <div className="absolute bottom-0 p-3 pt-5 w-fit flex flex-row items-center gap-3">
                                        <MicIcon className="w-5 h-5 md:w-5 md:h-5 text-gray-600 cursor-pointer hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
                                        <button className="flex items-center gap-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                                            <EarthIcon className="w-5 h-5" />
                                            <span className="text-sm font-small">Search</span>
                                        </button>
                                        <button className="flex items-center gap-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                                            <FileText className="w-5 h-5" />
                                            <span className="text-sm font-small">Generate Report</span>
                                        </button>
                                    </div>

                                    <div
                                        className="absolute bottom-0 right-0 p-3 w-fit flex flex-row justify-end"
                                        onClick={sendMessage}
                                    >
                                        <div className="w-7 h-7 md:w-7 md:h-7 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                                            {message.trim() === "" ? (
                                                <AudioLinesIcon className="w-5 h-5 md:w-5 md:h-5 text-gray-600 dark:text-gray-300" />
                                            ) : (
                                                <ArrowUpIcon className="w-5 h-5 md:w-5 md:h-5 text-gray-600 dark:text-gray-300" />
                                            )}
                                        </div>
                                    </div>
                                </>
                            </>}
                    </div>
                </form>
            </div>
        </div >
    );
};

export default ChatInterface;


