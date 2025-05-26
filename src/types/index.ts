export type Message = {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
};

export type ChatSettings = {
  tone: 'default' | 'formal' | 'friendly' | 'humorous';
  style: 'default' | 'concise' | 'detailed';
};
