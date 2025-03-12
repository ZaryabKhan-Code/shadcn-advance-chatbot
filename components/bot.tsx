'use client';
import { useState, useRef, useEffect } from "react";
import Header from "./header";
import ChatInput from "./chatbot/chatInput";
import ChatInterface from "./chatbot/chatInterface";

const Bot: React.FC = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot"; isLast: boolean; isLoading: boolean }[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null!);
    const [showResume, setShowResume] = useState(false);
    const [journalEntries, setJournalEntries] = useState<string[]>(["Today was a productive day. I completed my tasks efficiently.", "Reflected on my goals and made a plan for the upcoming week.", "Today was a productive day. I completed my tasks efficiently.", "Reflected on my goals and made a plan for the upcoming week.", "Today was a productive day. I completed my tasks efficiently.", "Reflected on my goals and made a plan for the upcoming week."]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("view") === "complete") {
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
                    isLoading: false,
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
        const newMessages = [...messages.map(msg => ({ ...msg, isLast: false })), { text: message, sender: "user" as "user" | "bot", isLast: true, isLoading: false }];
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
                <ChatInterface
                    showResume={showResume}
                    journalEntries={journalEntries}
                    messages={messages}
                    messagesEndRef={messagesEndRef}
                />
                <ChatInput showResume={showResume}
                    textareaRef={textareaRef}
                    message={message}
                    handleInputChange={handleInputChange}
                    sendMessage={sendMessage} />

            </div>
        </div >
    );
};

export default Bot;


