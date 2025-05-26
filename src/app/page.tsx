'use client';

import { useState, useEffect } from 'react';
import type { Message, ChatSettings } from '@/types';
import { generateChatbotResponse } from '@/ai/flows/generate-chatbot-response';
import { improveResponse } from '@/ai/flows/improve-response'; // For future use if settings directly alter responses
import { useToast } from '@/hooks/use-toast';
import { AppHeader } from '@/components/layout/AppHeader';
import { SettingsPanel } from '@/components/layout/SettingsPanel';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { Sidebar, SidebarInset } from '@/components/ui/sidebar';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [chatSettings, setChatSettings] = useState<ChatSettings>({
    tone: 'default',
    style: 'default',
  });
  const { toast } = useToast();

  // Initial welcome message from bot
  useEffect(() => {
    setMessages([
      {
        id: crypto.randomUUID(),
        role: 'bot',
        content: "Hello! I'm NodeMind, your intelligent AI assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleSettingsChange = (newSettings: Partial<ChatSettings>) => {
    setChatSettings((prev) => ({ ...prev, ...newSettings }));
    // Potentially show a toast or confirmation
    toast({
      title: "Settings Updated",
      description: "Chatbot preferences have been saved.",
    });
  };

  const handleSendMessage = async (data: { message: string }) => {
    const userInput = data.message.trim();
    if (!userInput) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userInput,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsBotTyping(true);
    setIsLoading(true);

    try {
      const conversationHistory = [...messages, userMessage]
        .slice(-10) // Keep last 10 messages for context
        .map((msg) => ({ role: msg.role, content: msg.content }));

      let botResponseContent: string;
      
      // Prepare input for generateChatbotResponse, potentially including settings if the AI model supports it directly.
      // For now, settings (tone/style) from the UI are illustrative.
      // The `improveResponse` flow could be used here if we want to apply settings to each response.
      // Example:
      // const basicResponse = await generateChatbotResponse({ userInput, conversationHistory });
      // if (chatSettings.tone !== 'default' || chatSettings.style !== 'default') {
      //   const improved = await improveResponse({ 
      //     originalResponse: basicResponse.chatbotResponse, 
      //     tone: chatSettings.tone === 'default' ? undefined : chatSettings.tone, 
      //     style: chatSettings.style === 'default' ? undefined : chatSettings.style 
      //   });
      //   botResponseContent = improved.improvedResponse;
      // } else {
      //   botResponseContent = basicResponse.chatbotResponse;
      // }

      // Simplified: directly use generateChatbotResponse. Settings are for UI demonstration.
      // If the Genkit flow itself could take tone/style, that would be cleaner.
      // For this iteration, the settings do not actively modify the AI call, but are stored.
      const response = await generateChatbotResponse({
        userInput,
        conversationHistory,
      });
      botResponseContent = response.chatbotResponse;

      const botMessage: Message = {
        id: crypto.randomUUID(),
        role: 'bot',
        content: botResponseContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating bot response:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get a response from the chatbot. Please try again.',
      });
      // Add a fallback error message to chat
       const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'bot',
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsBotTyping(false);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar side="right" variant="sidebar" collapsible="offcanvas">
          <SettingsPanel settings={chatSettings} onSettingsChange={handleSettingsChange} />
        </Sidebar>
        <SidebarInset className="flex-1">
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            isBotTyping={isBotTyping}
          />
        </SidebarInset>
      </div>
    </div>
  );
}
