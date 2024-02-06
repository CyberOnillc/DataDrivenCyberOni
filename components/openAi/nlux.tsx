'use client'
import React from "react";
import { AiChat } from "@nlux/react";
import { useAdapter } from "@nlux/openai-react";
import "@nlux/themes/nova.css";
import { openAiStreamingAdapter } from "./adapter";

interface OpenAIAdapterProps {
  show: boolean;
  temperature?: number;
  // Include other props as needed
}

export const OpenAIChat: React.FC = () => {

  const chatGptAdapter = openAiStreamingAdapter;

  // Corrected conditional rendering
  return (
    <AiChat
      adapter={chatGptAdapter}
      promptBoxOptions={{ placeholder: "How can I help you today?" }}
      conversationOptions={{
        scrollWhenGenerating: true,

      }}
      layoutOptions={{

      }}
      
    />
  );
};

export default OpenAIChat;
