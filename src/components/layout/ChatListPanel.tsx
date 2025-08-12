import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tabs,
  Tab
} from '@mui/material';
import { ChatList } from '../organisms/ChatList';

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
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock chat data
  const mockChats = [
    {
      id: '1',
      participants: [{ id: 'user1', name: 'Customer Support', email: 'support@example.com' }],
      messages: [],
      lastMessage: { id: '1', content: 'How can I help you today?', sender: { id: 'user1', name: 'Support', email: '' }, timestamp: new Date(), type: 'text' as const },
      unreadCount: 2
    },
    {
      id: '2',
      participants: [{ id: 'user2', name: 'Sales Team', email: 'sales@example.com' }],
      messages: [],
      lastMessage: { id: '2', content: 'Thank you for your inquiry', sender: { id: 'user2', name: 'Sales', email: '' }, timestamp: new Date(), type: 'text' as const },
      unreadCount: 0
    },
    {
      id: '3',
      participants: [{ id: 'user3', name: 'Technical Support', email: 'tech@example.com' }],
      messages: [],
      lastMessage: { id: '3', content: 'Issue has been resolved', sender: { id: 'user3', name: 'Tech', email: '' }, timestamp: new Date(), type: 'text' as const },
      unreadCount: 1
    }
  ];

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
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="chat tabs">
          <Tab label="Unread" />
          <Tab label="Chats" />
          <Tab label="Meeting chats" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
            No unread messages
          </Typography>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <ChatList 
            chats={mockChats} 
            onChatSelect={(chat) => console.log('Selected chat:', chat.id)}
            selectedChatId="1"
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
            No meeting chats
          </Typography>
        </TabPanel>
      </Box>
    </Box>
  );
}; 