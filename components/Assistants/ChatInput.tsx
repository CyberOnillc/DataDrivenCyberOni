import { Message } from "ai";
import { BrainCircuit } from "lucide-react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface inputProps {
    onSendMessage: (message: Message) => Promise<void>
    disabled: boolean
}


const ChatInput: React.FC<inputProps> = ({ onSendMessage, disabled }) => {
    const [message, setMessage] = useState("");

    const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (message.trim() !== "") {
            onSendMessage({ content: message.trim(), role: 'user', id:  uuidv4()});
            setMessage("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <div className="bg-gray-100 dark:bg-gray-700 flex border-2 justify-between rounded-md w-full">
                <input
                    type="text"
                    placeholder="How can I help You today...?"
                    value={message}
                    onChange={handleMessageChange}
                    className="flex-1 p-2 dark:bg-gray-700 border-0 outline-0 ring-0 focus:border-0 focus:outline-0 focus:ring-0 "
                />
                <button
                disabled={disabled}
                    type="submit"
                    className="px-2 py-2 dark:text-white hover:text-white hover:bg-blue-500 dark:hover:bg-gray-100 dark:hover:text-gray-950  rounded-md focus:outline-none hober disabled:bg-gray-300 disabled:text-gray-400"
                >
                    <BrainCircuit />
                </button>
            </div>
        </form>
    );
};

export default ChatInput;
