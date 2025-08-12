// Common types for the chat application

export type UserStatus = 'available' | 'busy' | 'away' | 'offline';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status?: UserStatus;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

export interface Chat {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
} 