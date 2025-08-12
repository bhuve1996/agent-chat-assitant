import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useAppContext } from '../../context/AppContext';

interface UserMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ anchorEl, onClose }) => {
  const { state } = useAppContext();
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('user');
    // Redirect to login page
    window.location.href = '/';
    onClose();
  };

  const handleProfile = () => {
    // TODO: Navigate to profile page
    console.log('Navigate to profile');
    onClose();
  };

  const handleSettings = () => {
    // TODO: Navigate to settings page
    console.log('Navigate to settings');
    onClose();
  };



  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          mt: 1,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          borderRadius: 2
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {/* User Info Section */}
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar 
            sx={{ 
              width: 48, 
              height: 48, 
              bgcolor: '#1976d2', 
              mr: 2,
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}
          >
            {state.currentUser?.name?.charAt(0) || 'M'}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {state.currentUser?.name || 'Manish'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {state.currentUser?.email || 'manish@ey.com'}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ 
            width: 8, 
            height: 8, 
            borderRadius: '50%', 
            backgroundColor: state.currentUser?.status === 'available' ? '#4caf50' : 
                           state.currentUser?.status === 'busy' ? '#f44336' :
                           state.currentUser?.status === 'away' ? '#ff9800' : '#9e9e9e', 
            mr: 1 
          }} />
          <Typography variant="caption" color="text.secondary">
            {state.currentUser?.status === 'available' ? 'Available for EY-CX' :
             state.currentUser?.status === 'busy' ? 'Busy' :
             state.currentUser?.status === 'away' ? 'Away' : 'Offline'}
          </Typography>
        </Box>
      </Box>

      {/* Menu Items */}
      <MenuItem onClick={handleProfile}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </MenuItem>

      <MenuItem onClick={handleSettings}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f' }}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" sx={{ color: '#d32f2f' }} />
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </MenuItem>
    </Menu>
  );
};
