'use client';

import { ChevronDownIcon, ArrowUpIcon, MicIcon, AudioWaveform, ThumbsUp, ThumbsDown, Copy, AudioLinesIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatInterface: React.FC = () => {
    const [message, setMessage] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot"; isLast?: boolean; isLoading?: boolean }[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setIsFocused(message.length > 0);
    }, [message]);

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
                <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
                    <h1 className="text-lg md:text-xl font-semibold">ChatGPT 4.0</h1>
                </header>

                <div className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4">
                    {messages.map((msg, index) => (
                        <div key={index} className="w-full mx-auto max-w-3xl px-4 group/message">
                            <div className={`break-words w-fit max-w-[80%] md:max-w-[70%] lg:max-w-[65%] p-2 md:p-3 text-sm md:text-[16px] ${msg.sender === "user" ? "bg-blue-500 text-white self-end rounded-lg ml-auto" : "text-gray-800 self-start bg-gray-100 rounded-lg mt-2 md:mt-3"}`}>
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
                            {msg.sender === "bot" && !msg.isLoading && (
                                <div className={`flex mt-2 pl-[6px] pt-[2px] space-x-2 text-gray-500 transition-opacity duration-300 ${msg.isLast ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                                    <Copy className="w-4 h-4 cursor-pointer hover:text-gray-700" />
                                    <ThumbsUp className="w-4 h-4 cursor-pointer hover:text-gray-700" />
                                    <ThumbsDown className="w-4 h-4 cursor-pointer hover:text-gray-700" />
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <footer className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
                    <div className={`flex relative flex-col max-w-4xl w-full mx-auto p-1 md:p-2 rounded-lg transition-all duration-200 ease-out ${isFocused ? "border-2 border-gray-400 shadow-md" : "border border-gray-200 shadow-none"} dark:bg-gray-800 dark:border-gray-600 dark:text-white`}>
                        <textarea
                            ref={textareaRef}
                            placeholder="Send a message..."
                            className="flex w-full border border-input px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base bg-muted pb-10 dark:border-zinc-700"
                            rows={1}
                            value={message}
                            onChange={handleInputChange}
                            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                        />
                        <div className="flex justify-between p-2 pt-3">
                            <div className="flex items-center justify-center mt-2">
                                <MicIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600 cursor-pointer hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
                            </div>
                            <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all" onClick={sendMessage}>
                                {message.trim() === "" ? <AudioLinesIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" /> : <ArrowUpIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />}
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default ChatInterface;
