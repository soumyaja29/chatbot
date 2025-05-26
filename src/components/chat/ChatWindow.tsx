'use client';

import type { Message } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble } from './MessageBubble';
import { MessageInputForm } from './MessageInputForm';
import { useEffect, useRef } from 'react';
import { Bot } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (data: { message: string }) => Promise<void>;
  isLoading: boolean;
  isBotTyping: boolean;
}

export function ChatWindow({ messages, onSendMessage, isLoading, isBotTyping }: ChatWindowProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isBotTyping]);

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1" viewportRef={scrollAreaRef}>
        <div className="space-y-6 p-4 md:p-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isBotTyping && (
            <div className="flex items-start gap-3 justify-start">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="max-w-[70%] rounded-xl rounded-bl-none bg-card p-3 shadow-md">
                <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-4 rounded-full animate-bounce delay-100" />
                    <Skeleton className="h-4 w-4 rounded-full animate-bounce delay-200" />
                    <Skeleton className="h-4 w-4 rounded-full animate-bounce delay-300" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <MessageInputForm onSubmit={onSendMessage} isLoading={isLoading || isBotTyping} />
    </div>
  );
}
