// Application-specific helper functions

import { User, Message, Chat } from '../types';

export const isUserOnline = (user: User): boolean => {
  // Mock function - replace with actual online status logic
  return Math.random() > 0.5;
};

export const getUnreadMessageCount = (chat: Chat): number => {
  return chat.unreadCount || 0;
};

export const getLastMessagePreview = (chat: Chat): string => {
  if (!chat.lastMessage) return 'No messages yet';
  return chat.lastMessage.content.length > 50 
    ? chat.lastMessage.content.substring(0, 50) + '...'
    : chat.lastMessage.content;
};

export const sortChatsByLastMessage = (chats: Chat[]): Chat[] => {
  return [...chats].sort((a, b) => {
    if (!a.lastMessage && !b.lastMessage) return 0;
    if (!a.lastMessage) return 1;
    if (!b.lastMessage) return -1;
    return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime();
  });
};

export const filterMessagesByUser = (messages: Message[], userId: string): Message[] => {
  return messages.filter(message => message.sender.id === userId);
}; 