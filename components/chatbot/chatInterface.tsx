import { ThumbsUp, ThumbsDown, Copy, NotebookPen, MessageCircleDashed } from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useState, useEffect } from "react";

interface ChatInterfaceProps {
    showResume: boolean;
    journalEntries: string[];
    messages: { sender: string; text: string; isLoading: boolean; isLast: boolean }[];
    messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ showResume, journalEntries, messages, messagesEndRef }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Tabs defaultValue={!showResume ? "chat" : "journal"} className="flex flex-col min-w-0 gap-5 flex-1 overflow-y-scroll">
            {showResume && (
                <div
                    className={`sticky top-0 z-20 transition-shadow duration-300 bg-background p-4 `}
                >
                    <div className="flex items-center justify-center">
                        <TabsList className="flex items-center justify-center md:w-[450px]">
                            <TabsTrigger value="journal" className="flex items-center gap-2">
                                <NotebookPen className="w-5 h-5" />
                                Journal Entry
                            </TabsTrigger>
                            <TabsTrigger value="chat" className="flex items-center gap-2">
                                <MessageCircleDashed className="w-5 h-5" />
                                Conversation
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </div>

            )}
            <TabsContent value="journal" className="p-4 pt-0">
                <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg  border shadow-md">
                    <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <NotebookPen className="w-5 h-5 md:w-6 md:h-6" />
                        Journal Entries
                    </h2>
                    <div className="mt-4 space-y-4">
                        {journalEntries.length > 0 ? (
                            journalEntries.map((entry, index) => (
                                <div key={index} className="p-3 md:p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                                    <p className="text-sm md:text-base text-gray-800 dark:text-gray-300">
                                        {entry}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                                No journal entries available.
                            </p>
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
    );
};

export default ChatInterface;


