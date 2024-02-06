import AiAssitant from "@/components/Assitants";
import { OpenAiStreamResponse } from "@/components/Assitants/adapter";

function ChatPage() {
    return (

        <div className="container mx-auto">
            <AiAssitant  adapter={{streamText: OpenAiStreamResponse}} />
        </div>);
}

export default ChatPage;