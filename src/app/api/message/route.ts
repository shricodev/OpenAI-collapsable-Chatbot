import { MessageArraySchema } from "@/lib/validators/message";
import {
  OpenAIMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from "@/lib/openai-stream";
import { OpenAIChatbotPrompt } from "@/app/helpers/constants/openai-chatbot-prompt";

export async function GET() {
  return new Response("Hello world!");
}

export async function POST(request: Request) {
  const { messages } = await request.json();

  // validate the messages
  const parsedMessages = MessageArraySchema.parse(messages);

  const outboundMessages: OpenAIMessage[] = parsedMessages.map((message) => {
    return {
      role: message.isUserMessage ? "user" : "system",
      content: message.text,
    };
  });

  outboundMessages.unshift({
    role: "system",
    content: OpenAIChatbotPrompt,
  });

  // OpenAI specific. This is the payload that we will send to the OpenAI API
  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: outboundMessages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 150,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);

  return new Response(stream);
}
