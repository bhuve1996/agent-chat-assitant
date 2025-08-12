// Storage utility functions for managing chat data in localStorage

const STORAGE_KEYS = {
  CHATS: 'ey_cx_chats',
  MESSAGES: 'ey_cx_messages',
  USER_STATUS: 'ey_cx_user_status',
  SELECTED_CHAT: 'ey_cx_selected_chat'
} as const;

// Helper function to safely parse JSON from localStorage
const safeParseJSON = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error parsing localStorage key "${key}":`, error);
    return defaultValue;
  }
};

// Helper function to safely stringify and save to localStorage
const safeSetItem = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error saving to localStorage key "${key}":`, error);
  }
};

// Chat storage functions
export const chatStorage = {
  // Get chats from localStorage
  getChats: (): any[] => {
    return safeParseJSON(STORAGE_KEYS.CHATS, []);
  },

  // Save chats to localStorage
  saveChats: (chats: any[]) => {
    safeSetItem(STORAGE_KEYS.CHATS, chats);
  },

  // Add a new chat
  addChat: (chat: any) => {
    const chats = chatStorage.getChats();
    chats.push(chat);
    chatStorage.saveChats(chats);
  },

  // Update an existing chat
  updateChat: (chatId: string, updates: any) => {
    const chats = chatStorage.getChats();
    const chatIndex = chats.findIndex((chat: any) => chat.id === chatId);
    if (chatIndex !== -1) {
      chats[chatIndex] = { ...chats[chatIndex], ...updates };
      chatStorage.saveChats(chats);
    }
  },

  // Update chat's last message and unread count
  updateChatLastMessage: (chatId: string, message: any, isFromCurrentUser: boolean) => {
    const chats = chatStorage.getChats();
    const chatIndex = chats.findIndex((chat: any) => chat.id === chatId);
    if (chatIndex !== -1) {
      const currentChat = chats[chatIndex] as any;
      chats[chatIndex] = {
        ...currentChat,
        lastMessage: message,
        unreadCount: isFromCurrentUser ? 0 : (currentChat.unreadCount || 0) + 1
      };
      chatStorage.saveChats(chats);
    }
  }
};

// Message storage functions
export const messageStorage = {
  // Get messages for a specific chat
  getMessages: (chatId: string): any[] => {
    const allMessages = safeParseJSON(STORAGE_KEYS.MESSAGES, {}) as Record<string, any[]>;
    return allMessages[chatId] || [];
  },

  // Save messages for a specific chat
  saveMessages: (chatId: string, messages: any[]) => {
    const allMessages = safeParseJSON(STORAGE_KEYS.MESSAGES, {}) as Record<string, any[]>;
    // Convert Date objects to ISO strings for storage
    const messagesForStorage = messages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp instanceof Date ? msg.timestamp.toISOString() : msg.timestamp
    }));
    allMessages[chatId] = messagesForStorage;
    safeSetItem(STORAGE_KEYS.MESSAGES, allMessages);
  },

  // Add a message to a chat
  addMessage: (chatId: string, message: any) => {
    const messages = messageStorage.getMessages(chatId);
    messages.push(message);
    messageStorage.saveMessages(chatId, messages);
  }
};

// User status storage
export const userStatusStorage = {
  getStatus: () => {
    return safeParseJSON(STORAGE_KEYS.USER_STATUS, 'available');
  },

  saveStatus: (status: string) => {
    safeSetItem(STORAGE_KEYS.USER_STATUS, status);
  }
};

// Selected chat storage
export const selectedChatStorage = {
  getSelectedChat: () => {
    return safeParseJSON(STORAGE_KEYS.SELECTED_CHAT, null);
  },

  saveSelectedChat: (chatId: string | null) => {
    safeSetItem(STORAGE_KEYS.SELECTED_CHAT, chatId);
  }
};

// Initialize default data if localStorage is empty
export const initializeDefaultData = () => {
  const chats = chatStorage.getChats();
  
  if (chats.length === 0) {
    // Add default chats
    const defaultChats = [
      {
        id: '1',
        participants: [{ id: 'user1', name: 'Customer Support', email: 'support@example.com' }],
        messages: [],
        lastMessage: { 
          id: '1', 
          content: 'How can I help you today?', 
          sender: { id: 'user1', name: 'Support', email: '' }, 
          timestamp: new Date().toISOString(), 
          type: 'text' 
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
          timestamp: new Date().toISOString(), 
          type: 'text' 
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
          timestamp: new Date().toISOString(), 
          type: 'text' 
        },
        unreadCount: 1
      }
    ];
    
    chatStorage.saveChats(defaultChats);
  }
};
