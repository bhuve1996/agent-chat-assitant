import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Chat, Message } from '../types';

// State interface
interface AppState {
  currentUser: User | null;
  selectedChatId: string | null;
  chats: Chat[];
  messages: Record<string, Message[]>;
  activeTab: number;
}

// Action types
type AppAction =
  | { type: 'SET_CURRENT_USER'; payload: User }
  | { type: 'SELECT_CHAT'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: { chatId: string; message: Message } }
  | { type: 'SET_ACTIVE_TAB'; payload: number }
  | { type: 'ADD_CHAT'; payload: Chat }
  | { type: 'UPDATE_CHAT'; payload: Chat };

// Initial state
const initialState: AppState = {
  currentUser: {
    id: 'current',
    name: 'John Agent',
    email: 'john@ey.com',
  },
  selectedChatId: null,
  chats: [
    {
      id: '1',
      participants: [{ id: 'user1', name: 'Customer Support', email: 'support@example.com' }],
      messages: [],
      lastMessage: { 
        id: '1', 
        content: 'How can I help you today?', 
        sender: { id: 'user1', name: 'Support', email: '' }, 
        timestamp: new Date(), 
        type: 'text' as const 
      },
      unreadCount: 2
    },
    {
      id: '2',
      participants: [{ id: 'user2', name: 'Sales Team', email: 'sales@example.com' }],
      messages: [],
      lastMessage: { 
        id: '2', 
        content: 'Thank you for your inquiry', 
        sender: { id: 'user2', name: 'Sales', email: '' }, 
        timestamp: new Date(), 
        type: 'text' as const 
      },
      unreadCount: 0
    },
    {
      id: '3',
      participants: [{ id: 'user3', name: 'Technical Support', email: 'tech@example.com' }],
      messages: [],
      lastMessage: { 
        id: '3', 
        content: 'Issue has been resolved', 
        sender: { id: 'user3', name: 'Tech', email: '' }, 
        timestamp: new Date(), 
        type: 'text' as const 
      },
      unreadCount: 1
    }
  ],
  messages: {},
  activeTab: 1
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    
    case 'SELECT_CHAT':
      return { ...state, selectedChatId: action.payload };
    
    case 'ADD_MESSAGE':
      const { chatId, message } = action.payload;
      const currentMessages = state.messages[chatId] || [];
      const updatedMessages = { ...state.messages, [chatId]: [...currentMessages, message] };
      
      // Update chat's last message and unread count
      const updatedChats = state.chats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            lastMessage: message,
            unreadCount: message.sender.id !== state.currentUser?.id 
              ? (chat.unreadCount || 0) + 1 
              : 0
          };
        }
        return chat;
      });
      
      return { 
        ...state, 
        messages: updatedMessages,
        chats: updatedChats
      };
    
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    
    case 'ADD_CHAT':
      return { ...state, chats: [...state.chats, action.payload] };
    
    case 'UPDATE_CHAT':
      return {
        ...state,
        chats: state.chats.map(chat => 
          chat.id === action.payload.id ? action.payload : chat
        )
      };
    
    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 