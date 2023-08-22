import { FC } from "react";

const OpenAIChatBotHeader: FC = () => {
  const chatBotName = process.env.CHAT_BOT_NAME || "OpenAI Chat Bot";

  return (
    <div className="w-full flex justify-start gap-3 items-center text-zinc-900">
      <div className="flex flex-col items-start text-sm">
        <p className="text-xs">Chat with</p>
        <div className="flex gap-1.5 items-center mt-1">
          <p className="w-2 h-2 rounded-full bg-green-500" />
          <p className="font-medium">{chatBotName}</p>
        </div>
      </div>
    </div>
  );
};

export default OpenAIChatBotHeader;
