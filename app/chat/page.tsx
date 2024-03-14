import AiAssistant from "@/components/Assistants";
import { OpenAiStreamResponse } from "@/components/Assistants/adapter";

function ChatPage() {
    return (

        <div className="container mx-auto  px-10 max-h-screen">
            <AiAssistant adapter={{ streamText: OpenAiStreamResponse }} />
        </div>);
}

export default ChatPage;