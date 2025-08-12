import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Avatar, IconButton, Badge, useTheme, useMediaQuery, Drawer } from '@mui/material';
import { 
  Search as SearchIcon, 
  Notifications as NotificationsIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { SidePanel } from './SidePanel';
import { ChatListPanel } from './ChatListPanel';
import { ChatPanel } from './ChatPanel';
import { UserMenu } from './UserMenu';
import { NotificationsMenu } from './NotificationsMenu';
import { SearchDialog } from './SearchDialog';
import { UserStatusMenu } from './UserStatusMenu';
import { useAppContext } from '../../context/AppContext';

export const MainLayout: React.FC = () => {
  const { state } = useAppContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  // State for menu anchors
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<HTMLElement | null>(null);
  const [statusMenuAnchor, setStatusMenuAnchor] = useState<HTMLElement | null>(null);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const getTotalNotifications = () => {
    return state.chats.reduce((total, chat) => total + chat.unreadCount, 0);
  };

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleSearchClick = () => {
    setSearchDialogOpen(true);
  };

  const handleSearchClose = () => {
    setSearchDialogOpen(false);
  };

  const handleStatusMenuClose = () => {
    setStatusMenuAnchor(null);
  };



  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleMobileDrawerClose = () => {
    setMobileDrawerOpen(false);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Panel - Header */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleMobileDrawerToggle}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Avatar sx={{ bgcolor: 'white', color: '#1976d2', mr: 2, fontWeight: 'bold' }}>
              EY
            </Avatar>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="h6" component="div">
                EY-CX Agent Communication
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Customer Experience Platform
              </Typography>
            </Box>
            {isMobile && (
              <Typography variant="h6" component="div">
                EY-CX
              </Typography>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" onClick={handleSearchClick}>
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleNotificationsClick}>
              <Badge badgeContent={getTotalNotifications()} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, position: 'relative' }}>
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32, 
                  mr: { xs: 0, sm: 1 }, 
                  bgcolor: 'white', 
                  color: '#1976d2',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.8 }
                }}
                onClick={handleUserMenuClick}
              >
                {state.currentUser?.name?.charAt(0) || 'M'}
              </Avatar>
              
              {/* Status Indicator - positioned on bottom-right of avatar */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 2,
                  right: { xs: 2, sm: 9 },
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: state.currentUser?.status === 'available' ? '#4caf50' : 
                                   state.currentUser?.status === 'busy' ? '#f44336' :
                                   state.currentUser?.status === 'away' ? '#ff9800' : '#9e9e9e',
                  border: '2px solid white',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.8 }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setStatusMenuAnchor(e.currentTarget);
                }}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex' }}>
        {/* Mobile Drawer */}
        {isMobile && (
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileDrawerOpen}
            onClose={handleMobileDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block' },
              '& .MuiDrawer-paper': { 
                width: 160,
                boxSizing: 'border-box',
              },
            }}
          >
            <SidePanel onClose={handleMobileDrawerClose} />
          </Drawer>
        )}

        {/* Desktop Sidebar */}
        {!isMobile && (
          <Box sx={{ display: { xs: 'none', md: 'block' }, height: '100vh' }}>
            <SidePanel />
          </Box>
        )}
        
        {/* Center Panel - Chat List */}
        <Box sx={{ 
          display: { xs: 'none', md: 'block' },
          width: isTablet ? 280 : 320 
        }}>
          <ChatListPanel />
        </Box>
        
        {/* Right Panel - Chat Interface */}
        <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }}>
          <ChatPanel />
        </Box>

        {/* Mobile/Tablet Single Panel View */}
        {isMobile && (
          <Box sx={{ flex: 1, display: { xs: 'block', md: 'none' } }}>
            {state.activeNavigation === 'ai-assistant' && state.selectedChatId ? (
              <ChatPanel />
            ) : (
              <ChatListPanel />
            )}
          </Box>
        )}
      </Box>

      {/* Interactive Menus and Dialogs */}
      <UserMenu 
        anchorEl={userMenuAnchor} 
        onClose={handleUserMenuClose}
      />
      
      <UserStatusMenu 
        anchorEl={statusMenuAnchor} 
        onClose={handleStatusMenuClose}
      />
      
      <NotificationsMenu 
        anchorEl={notificationsAnchor} 
        onClose={handleNotificationsClose} 
      />
      
      <SearchDialog 
        open={searchDialogOpen} 
        onClose={handleSearchClose} 
      />
    </Box>
  );
}; 