import { ChatCompletion, ChatCompletionChunk } from "openai/resources";
import React, { useEffect, useState } from 'react';

interface MessageProps {
  content: string;
  role: "function" | "data" | "user" | "system" | "assistant" | "tool";
}

interface MessageDisplayProps {
  history?: MessageProps[],
  typing: boolean
}

const Message: React.FC<MessageProps> = ({ content: text, role: sender }) => {
  // Determine the alignment and avatar icon based on the sender
  const isUser = sender === 'user';
  const alignmentClass = isUser ? 'justify-end' : 'justify-start';
  const avatarIcon = isUser ? '👤' : '🤖';

  return (
    <div className={`flex ${alignmentClass} max-w-full items-center p-4 my-2 `}>
      {isUser && <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">{avatarIcon}</div>}
      <div className="flex-1 p-4 rounded-lg bg-gray-200">
        <p className="text-sm">{text}</p>
      </div>
      {!isUser && <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ml-2">{avatarIcon}</div>}
    </div>
  );
};

const MessageDisplay: React.FC<MessageDisplayProps> = ({ history, typing }) => {
  const [messages, setMessages] = useState<MessageProps[]>([
    { content: "Hello, how can I help you?", role: 'system' },
    { content: "I'd like to know more about your products.", role: 'user' },
    { content: "Sure! Our products are designed to...", role: 'system' },
    // Add more messages as needed
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);



  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] max-h-[80vh]">
      {history?.map((message, index) => (
        <Message key={index} content={message.content} role={message.role} />
      ))}
    </div>
  );
};

export default MessageDisplay;

