import React from 'react';
import { 
  Box, 
  Typography, 
  Tabs,
  Tab
} from '@mui/material';
import { ChatList } from '../organisms/ChatList';
import { useAppContext } from '../../context/AppContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`chat-tabpanel-${index}`}
      aria-labelledby={`chat-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 1 }}>{children}</Box>}
    </div>
  );
}

export const ChatListPanel: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: newValue });
  };

  const handleChatSelect = (chat: any) => {
    dispatch({ type: 'SELECT_CHAT', payload: chat.id });
  };

  // Filter chats based on active tab
  const getFilteredChats = () => {
    switch (state.activeTab) {
      case 0: // Unread
        return state.chats.filter(chat => chat.unreadCount > 0);
      case 1: // All chats
        return state.chats;
      case 2: // Meeting chats
        return state.chats.filter(chat => chat.participants.length > 2);
      default:
        return state.chats;
    }
  };

  const filteredChats = getFilteredChats();

  return (
    <Box sx={{ 
      width: 320, 
      backgroundColor: 'white', 
      borderRight: '1px solid #e0e0e0',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" fontWeight="bold">
          Chat
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={state.activeTab} onChange={handleTabChange} aria-label="chat tabs">
          <Tab label="Unread" />
          <Tab label="Chats" />
          <Tab label="Meeting chats" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <TabPanel value={state.activeTab} index={0}>
          {filteredChats.length > 0 ? (
            <ChatList 
              chats={filteredChats} 
              onChatSelect={handleChatSelect}
              selectedChatId={state.selectedChatId}
            />
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
              No unread messages
            </Typography>
          )}
        </TabPanel>
        
        <TabPanel value={state.activeTab} index={1}>
          <ChatList 
            chats={filteredChats} 
            onChatSelect={handleChatSelect}
            selectedChatId={state.selectedChatId}
          />
        </TabPanel>
        
        <TabPanel value={state.activeTab} index={2}>
          {filteredChats.length > 0 ? (
            <ChatList 
              chats={filteredChats} 
              onChatSelect={handleChatSelect}
              selectedChatId={state.selectedChatId}
            />
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
              No meeting chats
            </Typography>
          )}
        </TabPanel>
      </Box>
    </Box>
  );
}; 