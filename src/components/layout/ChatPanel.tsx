import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  IconButton,
  Avatar
} from '@mui/material';
import { 
  Send as SendIcon, 
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  VideoCall as VideoCallIcon,
  Call as CallIcon
} from '@mui/icons-material';
import { MessageBubble } from '../molecules/MessageBubble';
import { User, Message } from '../../types';
import { generateId } from '../../utils';

export const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // Mock users
  const currentUser: User = {
    id: 'current',
    name: 'John Agent',
    email: 'john@ey.com',
  };

  // Memoize assistant user to fix useEffect dependency warning
  const assistantUser = useMemo(() => ({
    id: 'assistant',
    name: 'AI Virtual Assistant',
    email: 'ai@ey.com',
  }), []);

  useEffect(() => {
    // Add welcome message
    const welcomeMessage: Message = {
      id: generateId(),
      content: "Hello! I am your AI Virtual Assistant. How can I help you optimize customer interactions today?",
      sender: assistantUser,
      timestamp: new Date(),
      type: 'text',
    };
    setMessages([welcomeMessage]);
  }, [assistantUser]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      content: newMessage,
      sender: currentUser,
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: generateId(),
        content: `I can analyze sentiment patterns for you. Based on recent WhatsApp interactions, customer satisfaction is trending at 89% with positive sentiment increasing by 12% this week. Would you like detailed analytics?`,
        sender: assistantUser,
        timestamp: new Date(),
        type: 'text',
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#fafafa'
    }}>
      {/* Chat Header */}
      <Box sx={{ 
        p: 2, 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>
            <Box component="span" sx={{ fontSize: '0.8rem' }}>AI</Box>
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              AI Virtual Assistant
            </Typography>
            <Typography variant="caption" color="text.secondary">
              EY-CX Intelligence Online
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="small">
            <SearchIcon />
          </IconButton>
          <IconButton size="small">
            <VideoCallIcon />
          </IconButton>
          <IconButton size="small">
            <CallIcon />
          </IconButton>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Messages Area */}
      <Box sx={{ 
        flex: 1, 
        p: 2, 
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwnMessage={message.sender.id === currentUser.id}
          />
        ))}
      </Box>

      {/* Message Input */}
      <Box sx={{ 
        p: 2, 
        backgroundColor: 'white', 
        borderTop: '1px solid #e0e0e0'
      }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={3}
            size="small"
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            sx={{ alignSelf: 'flex-end' }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}; 