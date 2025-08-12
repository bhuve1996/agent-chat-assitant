import React, { useState, useEffect, useCallback } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  IconButton,
  AppBar,
  Toolbar,
  Grid
} from '@mui/material';
import { Send as SendIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { User, Message } from '../types';
import { MessageBubble } from '../components/molecules/MessageBubble';
import { generateId } from '../utils';

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [user] = useLocalStorage<User | null>('user', null);
  const navigate = useNavigate();

  // Mock assistant user
  const assistantUser: User = {
    id: 'assistant',
    name: 'AI Assistant',
    email: 'assistant@chat.com',
  };

  const addWelcomeMessage = useCallback(() => {
    const welcomeMessage: Message = {
      id: generateId(),
      content: `Hello ${user?.name || 'User'}! How can I help you today?`,
      sender: assistantUser,
      timestamp: new Date(),
      type: 'text',
    };
    setMessages([welcomeMessage]);
  }, [user?.name, assistantUser]);

  useEffect(() => {
    // Redirect to login if no user
    if (!user) {
      navigate('/');
      return;
    }

    // Add welcome message
    addWelcomeMessage();
  }, [user, navigate, addWelcomeMessage]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const userMessage: Message = {
      id: generateId(),
      content: newMessage,
      sender: user,
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: generateId(),
        content: `Thanks for your message: "${newMessage}". This is a mock response from the AI assistant.`,
        sender: assistantUser,
        timestamp: new Date(),
        type: 'text',
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chat Assistant
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Welcome, {user.name}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ flex: 1, display: 'flex', flexDirection: 'column', py: 2 }}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Messages Area */}
          <Paper 
            elevation={1} 
            sx={{ 
              flex: 1, 
              p: 2, 
              mb: 2, 
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwnMessage={message.sender.id === user.id}
              />
            ))}
          </Paper>

          {/* Message Input */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              multiline
              maxRows={3}
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
      </Container>
    </Box>
  );
}; 