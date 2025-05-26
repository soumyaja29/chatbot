'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizonal } from 'lucide-react';

const FormSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty.'),
});

type FormValues = z.infer<typeof FormSchema>;

interface MessageInputFormProps {
  onSubmit: (data: FormValues) => Promise<void>;
  isLoading: boolean;
}

export function MessageInputForm({ onSubmit, isLoading }: MessageInputFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: '',
    },
  });

  const handleFormSubmit = async (data: FormValues) => {
    await onSubmit(data);
    form.reset();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(handleFormSubmit)();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex items-start gap-2 border-t bg-background p-4"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Textarea
                  placeholder="Type your message..."
                  className="min-h-[80px] resize-none rounded-xl border-input bg-background/50 p-3 shadow-sm focus-visible:ring-primary"
                  onKeyDown={handleKeyDown}
                  {...field}
                  disabled={isLoading}
                  aria-label="Chat message input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="icon" className="h-[80px] w-[80px] shrink-0 rounded-full bg-primary hover:bg-primary/90" disabled={isLoading} aria-label="Send message">
          <SendHorizonal className="h-6 w-6" />
        </Button>
      </form>
    </Form>
  );
}
