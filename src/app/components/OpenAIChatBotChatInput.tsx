"use client";

import { FC, HTMLAttributes, useContext, useRef, useState } from "react";

import TextareaAutoSize from "react-textarea-autosize";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";

import { cn } from "@/lib/utils";
import { Message } from "@/lib/validators/message";
import { MessagesContext } from "../context/messages";
import { CornerDownLeft, Loader2 } from "lucide-react";

interface OpenAIChatBotChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const OpenAIChatBotChatInput: FC<OpenAIChatBotChatInputProps> = ({
  className,
  ...props
}) => {
  const [input, setInput] = useState<string>("");
  const {
    messages,
    addMessage,
    updateMessage,
    removeMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { mutate: sendMessage, isLoading } = useMutation({
    mutationFn: async (message: Message) => {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) throw new Error("Something went wrong");

      return response.body;
    },
    onMutate: (message: Message) => {
      addMessage(message);
      setInput("");
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error("No stream in response");

      const id = nanoid();
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: "",
      };

      addMessage(responseMessage);

      setIsMessageUpdating(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();

      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prev) => prev + chunkValue);
      }

      setIsMessageUpdating(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    },
    onError: (_, message) => {
      toast.error("Something went wrong, Please try again.");
      removeMessage(message.id);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    },
  });

  return (
    <div {...props} className={cn("border-t border-zinc-300", className)}>
      <div className="mt-4 relative flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutoSize
          ref={textareaRef}
          rows={2}
          maxRows={4}
          autoFocus
          placeholder="Write a message..."
          value={input}
          disabled={isLoading}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              const message: Message = {
                id: nanoid(),
                isUserMessage: true,
                text: input,
              };
              sendMessage(message);
            }
          }}
          onChange={(event) => setInput(event.target.value)}
          className="peer disabled:opacity-50 bg-zinc-100 pr-8 resize-none block w-full border-0 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6"
        />

        <div className="absolute inset-y-0 flex right-0 py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border bg-white border-gray-200 px-1 font-sans text-xs text-gray-400">
            {isLoading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <CornerDownLeft className="w-4 h-4" />
            )}
          </kbd>
        </div>

        {/* This is just to add some design to the input textbox */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 border-t border-gray-200 peer-focus:border-t-2 peer-focus:border-indigo-500"
        ></div>
      </div>
    </div>
  );
};

export default OpenAIChatBotChatInput;
