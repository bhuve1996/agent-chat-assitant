import React from 'react';
import { Box, AppBar, Toolbar, Typography, Avatar, IconButton, Badge } from '@mui/material';
import { 
  Search as SearchIcon, 
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import { SidePanel } from './SidePanel';
import { ChatListPanel } from './ChatListPanel';
import { ChatPanel } from './ChatPanel';

export const MainLayout: React.FC = () => {
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
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
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