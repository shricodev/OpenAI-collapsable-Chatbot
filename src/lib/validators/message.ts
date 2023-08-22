import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  text: z.string(),
  isUserMessage: z.boolean(),
}); 

// all the message validators. We will parse array with all the messages
export const MessageArraySchema = z.array(MessageSchema);

// actual type of the Message
export type Message = z.infer<typeof MessageSchema>;
