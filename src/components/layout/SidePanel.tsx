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

export const SidePanel: React.FC = () => {
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
            JA
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              John Agent
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
          <ListItemButton sx={{ 
            backgroundColor: '#e3f2fd',
            '&:hover': { backgroundColor: '#e3f2fd' }
          }}>
            <ListItemIcon>
              <RobotIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="AI Virtual Assistant" 
              primaryTypographyProps={{ fontWeight: 'bold' }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="WhatsApp Chat Request" />
            <Badge badgeContent={5} color="error" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary="Phone Call Request" />
            <Badge badgeContent={3} color="error" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CallIcon />
            </ListItemIcon>
            <ListItemText primary="Incoming Calls" />
            <Badge badgeContent={3} color="error" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ActiveIcon />
            </ListItemIcon>
            <ListItemText primary="Active Call" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}; 