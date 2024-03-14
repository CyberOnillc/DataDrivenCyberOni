import { ChatCompletion, ChatCompletionChunk } from "openai/resources";
import React, { useEffect, useState } from 'react';

interface MessageProps {
  content: string;
  role: "function" | "data" | "user" | "system" | "assistant" | "tool";
}

interface MessageDisplayProps {
  history?: MessageProps[],
  typing: boolean,
  current?: MessageProps,
}

const Message: React.FC<MessageProps> = ({ content: text, role: sender }) => {
  // Determine the alignment and avatar icon based on the sender
  const isUser = sender === 'user';
  const alignmentClass = isUser ? 'justify-end self-end' : 'justify-start self-start';
  const avatarIcon = isUser ? '👤' : '🤖';

  return (
    <div className={`flex ${alignmentClass} max-w-full items-center p-4 my-2 `}>
      {isUser && <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">{avatarIcon}</div>}
      <div className="flex-1 p-4 rounded-lg bg-gray-200">
        <p className="text-sm my-0">{text}</p>
      </div>
      {!isUser && <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ml-2">{avatarIcon}</div>}
    </div>
  );
};

const MessageDisplay: React.FC<MessageDisplayProps> = ({ history, typing, current }) => {

  useEffect(() => {
    console.log(history);
  }, [history]);

  return (
    <div className="flex flex-col items-start max-h-full overflow-y-auto ">
      {history?.map((message, index) => (
        <Message key={index} content={message.content} role={message.role} />
      ))}
      {typing && current && <Message content={current?.content} role={current?.role} />}
    </div>
  );
};

export default MessageDisplay;

