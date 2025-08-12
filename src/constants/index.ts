// Application constants

export const APP_NAME = 'Chat Assistant';

export const API_ENDPOINTS = {
  CHATS: '/api/chats',
  MESSAGES: '/api/messages',
  USERS: '/api/users',
  AUTH: '/api/auth',
} as const;

export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file',
} as const;

export const THEME = {
  PRIMARY_COLOR: '#1976d2',
  SECONDARY_COLOR: '#dc004e',
  BACKGROUND_COLOR: '#f5f5f5',
} as const;

export const LOCAL_STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  THEME_MODE: 'theme_mode',
} as const; 