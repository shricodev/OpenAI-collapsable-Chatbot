"use client";

import { FC, HTMLAttributes, useState } from "react";

import TextareaAutoSize from "react-textarea-autosize";

import { cn } from "@/lib/utils";

interface OpenAIChatBotChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const OpenAIChatBotChatInput: FC<OpenAIChatBotChatInputProps> = ({
  className,
  ...props
}) => {
  const [input, setInput] = useState<string>("");

  return (
    <div {...props} className={cn("border-t border-zinc-300", className)}>
      <div className="mt-4 relative flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutoSize
          rows={2}
          maxRows={4}
          autoFocus
          placeholder="Write a message..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="peer disabled:opacity-50 bg-zinc-100 pr-14 resize-none block w-full border-0 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default OpenAIChatBotChatInput;
