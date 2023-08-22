"use client";

import { FC } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MessagesProvider } from "../context/messages";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MessagesProvider>{children}</MessagesProvider>
    </QueryClientProvider>
  );
};

export default Providers;
