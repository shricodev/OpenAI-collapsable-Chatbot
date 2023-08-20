import { FC } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

import OpenAIChatBotHeader from "./OpenAIChatBotHeader";
import OpenAIChatBotChatInput from "./OpenAIChatBotChatInput";

const OpenAIChatBot: FC = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="relative bg-white z-40 shadow"
    >
      <AccordionItem value="item-1">
        <div className="fixed right-8 w-80 bottom-8 border bg-white border-gray-300 rounded-2xl overflow-hidden">
          <div className="flex flex-col w-full h-full">
            <AccordionTrigger className="px-6 border-b border-zinc-300">
              <OpenAIChatBotHeader />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col h-80">
                messages
                <OpenAIChatBotChatInput className="px-4" />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default OpenAIChatBot;
