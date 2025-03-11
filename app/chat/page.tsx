'use client'
import { ChevronDownIcon, ArrowUpIcon, MicIcon, AudioWaveform, ThumbsUp, ThumbsDown, Copy, AudioLines, AudioLinesIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

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
        // Show an introduction message from the bot when the chat loads
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
            const newHeight = Math.min(textareaRef.current.scrollHeight, window.innerHeight * 0.4);
            textareaRef.current.style.height = `${newHeight}px`;
        }
    };

    const resetTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "50px"; // Reset to default height
        }
    };

    const sendMessage = () => {
        if (message.trim() === "") return;

        const newMessages = [...messages.map(msg => ({ ...msg, isLast: false })), { text: message, sender: "user" as "user" | "bot" }];
        setMessages(newMessages);
        setMessage("");

        resetTextarea(); // Reset textarea height after message is sent

        // Simulate bot response delay with loading indicator
        setTimeout(() => {
            setMessages(prevMessages => [
                ...prevMessages,
                { text: "", sender: "bot", isLast: true, isLoading: true },
            ]);
        }, 500);

        // Replace loading indicator with actual bot response
        setTimeout(() => {
            setMessages(prevMessages =>
                prevMessages.map(msg =>
                    msg.isLoading ? { text: "This is an automated bot response.", sender: "bot", isLast: true, isLoading: false } : msg
                )
            );
        }, 2000);

        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 2200);
    };

    return (
        <div className="font-[family-name:var(--font-geist-sans)] flex flex-col h-screen w-full max-w-4xl mx-auto sm:w-[90%] md:w-[700px]">
            <header className="flex items-center justify-between w-full max-w-4xl p-4">
                <h1 className="text-xl font-semibold">ChatGPT 4.0</h1>
            </header>

            {/* Chat Area */}
            <div className="flex-1 w-full max-w-4xl p-4 overflow-y-auto space-y-3">
                {messages.map((msg, index) => (
                    <div key={index} className="flex flex-col group">
                        {/* Message Container */}
                        <div
                            className={`break-words w-fit max-w-[75%] lg:max-w-[65%] p-3 text-[16px] ${msg.sender === "user"
                                ? "bg-blue-500 text-white self-end rounded-lg ml-auto"
                                : "text-gray-800 self-start bg-gray-100 rounded-lg mt-3"
                                }`}
                        >
                            {msg.isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></div>
                                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-400"></div>
                                </div>
                            ) : (
                                msg.text
                            )}
                        </div>

                        {/* Bot Actions (Copy, Like, Dislike) */}
                        {msg.sender === "bot" && !msg.isLoading && (
                            <div
                                className={`flex pl-[5px] pt-[5px] mt-2 space-x-3 text-gray-500 transition-opacity duration-300 
                                ${msg.isLast ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                            >
                                <Copy className="w-4 h-4 cursor-pointer hover:text-gray-700" />
                                <ThumbsUp className="w-4 h-4 cursor-pointer hover:text-gray-700" />
                                <ThumbsDown className="w-4 h-4 cursor-pointer hover:text-gray-700" />
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Section - Footer at Bottom */}
            <footer className="w-full bg-white dark:bg-gray-800 p-3 flex-shrink-0">
                <div
                    className={`flex flex-col max-w-4xl w-full mx-auto p-2 rounded-lg transition-all duration-200 ease-out 
            ${isFocused ? "border-2 border-gray-400 shadow-md" : "border border-gray-200 shadow-none"} 
            dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
                >
                    <textarea
                        ref={textareaRef}
                        placeholder="Send a message..."
                        className="w-full bg-transparent border-none focus:ring-0 outline-none resize-none p-1 pr-1 
                text-gray-700 min-h-[50px] max-h-[40vh] overflow-y-auto 
                dark:text-white"
                        rows={1}
                        value={message}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                    />
                    <div className="flex justify-between p-2 pt-5">
                        <div className="flex items-center justify-center">
                            <MicIcon className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
                        </div>
                        <div
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300 
                    dark:bg-gray-700 dark:hover:bg-gray-600 transition-all"
                            onClick={sendMessage}
                        >
                            {message.trim() === "" ? (
                                <AudioLinesIcon className="w-6 h-6 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
                            ) : (
                                <ArrowUpIcon className="w-6 h-6 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ChatInterface;
