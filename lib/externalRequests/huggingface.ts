import { listModels, PipelineType } from "@huggingface/hub";
import { HfInference } from '@huggingface/inference';

// Define interfaces for better type safety
interface ModelResponse {
    generated_text?: string;
    error?: string;
}

interface ModelListing {
    models: any[]; // Consider defining a more specific type based on expected structure
}

// Function to call a Hugging Face model for inference
async function textGeneration(task:string , input: {modelId: string,inputs: any, parameters?:any}, accessToken: string): Promise<ModelResponse | undefined> {
    const api = new HfInference(accessToken);

    try {
        const response = await api.textGeneration({
            ...input,
            stream: true
        });

        // Cast the response to the expected type
        return response as ModelResponse;
    } catch (error) {
        console.error('Error calling model:', (error as Error).message);
        return undefined;
    }
}

// Function to list Hugging Face models - not directly supported by @huggingface/inference, so we use fetch here
async function listHuggingfaceModels(accessToken: string, search: {
    owner? :string,
    query?:string,
    task?:PipelineType,
    tags?: string[]
}): Promise<ModelListing | undefined> {
    const url = 'https://huggingface.co/api/models';
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };

    try {

        let data = []
        for await (const model of listModels({search,limit: 20, credentials: {accessToken}})) {
           data.push(model)
        }
        return { models: data };
    } catch (error) {
        console.error('Error listing models:', (error as Error).message);
        return undefined;
    }
}

export { textGeneration , listHuggingfaceModels };
