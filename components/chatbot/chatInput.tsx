import { ArrowUpIcon, MicIcon, AudioLinesIcon, FileText, EarthIcon, RefreshCcw } from "lucide-react";

interface ChatInputProps {
    showResume: boolean;
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
    message: string;
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    sendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ showResume, textareaRef, message, handleInputChange, sendMessage }) => {
    return (

        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
            <div className={`relative w-full flex flex-col gap-4`}>
                {showResume ?
                    <div className="flex justify-center py-4">
                        <button className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm md:text-base">
                            <RefreshCcw className="w-4 h-4 md:w-5 md:h-5" />
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
    );
};

export default ChatInput;


