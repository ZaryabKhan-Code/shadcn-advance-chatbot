'use client'
import { ChevronDownIcon, ArrowUpIcon, MicIcon, AudioWaveform, ThumbsUp, ThumbsDown, Copy } from "lucide-react";
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
        <div className="font-[family-name:var(--font-geist-sans)] flex flex-col items-center min-h-screen w-full max-w-4xl mx-auto sm:w-[90%] md:w-[800px] relative pl-3 pr-3">
            <header className="flex items-center justify-between w-full max-w-4xl p-4 pl-0 pr-0">
                <h1 className="text-xl font-semibold">ChatGPT 4.0</h1>
                <ChevronDownIcon className="w-5 h-5 text-muted-foreground" />
            </header>

            <div className="flex-1 w-full max-w-4xl min-h-[450px] max-h-[60vh] p-4 pl-0 pr-2 rounded-lg overflow-y-auto relative z-0 space-y-3">
                {messages.length === 0 && <div className="text-center text-gray-500">Start the conversation...</div>}
                {messages.map((msg, index) => (
                    <div key={index} className="flex flex-col group">
                        {/* Message or Loading Indicator */}
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
                                className={`flex pl-[5px] pt-[5px] space-x-3  text-gray-500 transition-opacity duration-300 ${msg.isLast ? "opacity-100 mt-2" : "opacity-0 group-hover:opacity-100 mt-2"
                                    }`}
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

            {/* Input Section */}
            <footer className="w-full flex  justify-center p-5 pl-0 pr-0 relative bg-white">
                <div
                    className={`flex flex-col max-w-4xl w-full bg-gray-100 p-2 rounded-lg transition-all duration-200 ease-out ${isFocused ? "border-2 border-gray-400 shadow-md" : "border border-gray-200 shadow-none"
                        }`}
                >
                    <textarea
                        ref={textareaRef}
                        placeholder="Send a message..."
                        className="max-w-2xl w-full bg-transparent border-none focus:ring-0 outline-none resize-none p-1 pr-1 text-gray-700 min-h-[50px] max-h-[40vh] overflow-y-auto"
                        rows={1}
                        value={message}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                    />
                    <div className="flex justify-between p-2 pt-5">
                        <div className="flex items-center justify-center">
                            <MicIcon className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
                        </div>
                        <div
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300 transition-all"
                            onClick={sendMessage}
                        >
                            {message.trim() === "" ? (
                                <AudioWaveform className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                            ) : (
                                <ArrowUpIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ChatInterface;
