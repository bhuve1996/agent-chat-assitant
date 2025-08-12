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
import { Message } from '../../types';
import { generateId } from '../../utils';
import { useAppContext } from '../../context/AppContext';

export const ChatPanel: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const { state, dispatch } = useAppContext();

  // Memoize assistant user to fix useEffect dependency warning
  const assistantUser = useMemo(() => ({
    id: 'assistant',
    name: 'AI Virtual Assistant',
    email: 'ai@ey.com',
  }), []);

  // Get current chat and messages
  const selectedChat = state.chats.find(chat => chat.id === state.selectedChatId);
  const currentMessages = state.messages[state.selectedChatId || ''] || [];

  useEffect(() => {
    // Add welcome message if no messages exist for selected chat
    if (state.selectedChatId && currentMessages.length === 0) {
      const welcomeMessage: Message = {
        id: generateId(),
        content: "Hello! I am your AI Virtual Assistant. How can I help you optimize customer interactions today?",
        sender: assistantUser,
        timestamp: new Date(),
        type: 'text',
      };
      
      dispatch({ 
        type: 'ADD_MESSAGE', 
        payload: { chatId: state.selectedChatId, message: welcomeMessage } 
      });
    }
  }, [state.selectedChatId, currentMessages.length, assistantUser, dispatch]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !state.selectedChatId || !state.currentUser) return;

    const userMessage: Message = {
      id: generateId(),
      content: newMessage,
      sender: state.currentUser,
      timestamp: new Date(),
      type: 'text',
    };

    dispatch({ 
      type: 'ADD_MESSAGE', 
      payload: { chatId: state.selectedChatId, message: userMessage } 
    });
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
      
      dispatch({ 
        type: 'ADD_MESSAGE', 
        payload: { chatId: state.selectedChatId!, message: aiResponse } 
      });
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Show placeholder if no chat is selected
  if (!state.selectedChatId || !selectedChat) {
    return (
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: '#fafafa',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="h6" color="text.secondary">
          Select a chat to start messaging
        </Typography>
      </Box>
    );
  }

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
              {selectedChat.participants[0]?.name || 'AI Virtual Assistant'}
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
        {currentMessages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwnMessage={message.sender.id === state.currentUser?.id}
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