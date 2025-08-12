import React from 'react';
import { Box, AppBar, Toolbar, Typography, Avatar, IconButton, Badge } from '@mui/material';
import { 
  Search as SearchIcon, 
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { SidePanel } from './SidePanel';
import { ChatListPanel } from './ChatListPanel';
import { ChatPanel } from './ChatPanel';
import { useAppContext } from '../../context/AppContext';

export const MainLayout: React.FC = () => {
  const { state } = useAppContext();

  const getTotalNotifications = () => {
    return state.chats.reduce((total, chat) => total + chat.unreadCount, 0);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Panel - Header */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Avatar sx={{ bgcolor: 'white', color: '#1976d2', mr: 2, fontWeight: 'bold' }}>
              EY
            </Avatar>
            <Box>
              <Typography variant="h6" component="div">
                EY-CX Agent Communication
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Customer Experience Platform
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={getTotalNotifications()} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'white', color: '#1976d2' }}>
                {state.currentUser?.name?.charAt(0) || 'U'}
              </Avatar>
              <Typography variant="body2" sx={{ color: 'white' }}>
                {state.currentUser?.name || 'User'}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex' }}>
        {/* Left Side Panel */}
        <SidePanel />
        
        {/* Center Panel - Chat List */}
        <ChatListPanel />
        
        {/* Right Panel - Chat Interface */}
        <ChatPanel />
      </Box>
    </Box>
  );
}; 