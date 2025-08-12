import React from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Avatar, 
  Typography, 
  Badge
} from '@mui/material';
import { 
  SmartToy as RobotIcon,
  Chat as ChatIcon,
  Phone as PhoneIcon,
  Call as CallIcon,
  RadioButtonChecked as ActiveIcon
} from '@mui/icons-material';
import { useAppContext } from '../../context/AppContext';

export const SidePanel: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const getTotalUnreadCount = () => {
    return state.chats.reduce((total, chat) => total + chat.unreadCount, 0);
  };

  const handleNavigationClick = (navigationType: string) => {
    dispatch({ type: 'SET_ACTIVE_NAVIGATION', payload: navigationType });
  };

  const isActiveNavigation = (navigationType: string) => {
    return state.activeNavigation === navigationType;
  };

  return (
    <Box sx={{ 
      width: 280, 
      backgroundColor: '#f5f5f5', 
      borderRight: '1px solid #e0e0e0',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Agent Profile Section */}
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>
            {state.currentUser?.name?.charAt(0) || 'M'}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {state.currentUser?.name || 'Manish'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                backgroundColor: '#4caf50', 
                mr: 1 
              }} />
              <Typography variant="caption" color="text.secondary">
                Available for EY-CX
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <List sx={{ flex: 1, pt: 1 }}>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => handleNavigationClick('ai-assistant')}
            sx={{ 
              backgroundColor: isActiveNavigation('ai-assistant') ? '#e3f2fd' : 'transparent',
              '&:hover': { backgroundColor: isActiveNavigation('ai-assistant') ? '#e3f2fd' : '#f0f0f0' }
            }}
          >
            <ListItemIcon>
              <RobotIcon color={isActiveNavigation('ai-assistant') ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText 
              primary="AI Virtual Assistant" 
              primaryTypographyProps={{ 
                fontWeight: isActiveNavigation('ai-assistant') ? 'bold' : 'normal'
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => handleNavigationClick('whatsapp')}
            sx={{ 
              backgroundColor: isActiveNavigation('whatsapp') ? '#e3f2fd' : 'transparent',
              '&:hover': { backgroundColor: isActiveNavigation('whatsapp') ? '#e3f2fd' : '#f0f0f0' }
            }}
          >
            <ListItemIcon>
              <ChatIcon color={isActiveNavigation('whatsapp') ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText 
              primary="WhatsApp Chat Request" 
              primaryTypographyProps={{ 
                fontWeight: isActiveNavigation('whatsapp') ? 'bold' : 'normal'
              }}
            />
            <Badge badgeContent={5} color="error" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => handleNavigationClick('phone')}
            sx={{ 
              backgroundColor: isActiveNavigation('phone') ? '#e3f2fd' : 'transparent',
              '&:hover': { backgroundColor: isActiveNavigation('phone') ? '#e3f2fd' : '#f0f0f0' }
            }}
          >
            <ListItemIcon>
              <PhoneIcon color={isActiveNavigation('phone') ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText 
              primary="Phone Call Request" 
              primaryTypographyProps={{ 
                fontWeight: isActiveNavigation('phone') ? 'bold' : 'normal'
              }}
            />
            <Badge badgeContent={3} color="error" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => handleNavigationClick('incoming')}
            sx={{ 
              backgroundColor: isActiveNavigation('incoming') ? '#e3f2fd' : 'transparent',
              '&:hover': { backgroundColor: isActiveNavigation('incoming') ? '#e3f2fd' : '#f0f0f0' }
            }}
          >
            <ListItemIcon>
              <CallIcon color={isActiveNavigation('incoming') ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText 
              primary="Incoming Calls" 
              primaryTypographyProps={{ 
                fontWeight: isActiveNavigation('incoming') ? 'bold' : 'normal'
              }}
            />
            <Badge badgeContent={3} color="error" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => handleNavigationClick('active-call')}
            sx={{ 
              backgroundColor: isActiveNavigation('active-call') ? '#e3f2fd' : 'transparent',
              '&:hover': { backgroundColor: isActiveNavigation('active-call') ? '#e3f2fd' : '#f0f0f0' }
            }}
          >
            <ListItemIcon>
              <ActiveIcon color={isActiveNavigation('active-call') ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText 
              primary="Active Call" 
              primaryTypographyProps={{ 
                fontWeight: isActiveNavigation('active-call') ? 'bold' : 'normal'
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      {/* Footer with total unread count */}
      <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', backgroundColor: '#e8eaf6' }}>
        <Typography variant="body2" color="text.secondary" align="center">
          Total unread messages: {getTotalUnreadCount()}
        </Typography>
      </Box>
    </Box>
  );
}; 