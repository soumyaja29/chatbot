import type { Message } from '@/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Bot } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const Icon = isUser ? User : Bot;

  return (
    <div
      className={cn(
        'flex items-start gap-3',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 border border-primary/20">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      <Card
        className={cn(
          'max-w-[70%] rounded-xl p-0 shadow-md',
          isUser ? 'bg-accent text-accent-foreground rounded-br-none' : 'bg-card text-card-foreground rounded-bl-none'
        )}
      >
        <CardContent className="p-3">
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          <p
            className={cn(
              'mt-1 text-xs',
              isUser ? 'text-accent-foreground/70' : 'text-muted-foreground'
            )}
          >
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </CardContent>
      </Card>
      {isUser && (
         <Avatar className="h-8 w-8 border border-accent/20">
           <AvatarFallback className="bg-accent text-accent-foreground">
             <User className="h-4 w-4" />
           </AvatarFallback>
         </Avatar>
      )}
    </div>
  );
}
