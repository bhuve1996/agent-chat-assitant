import React from 'react';
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Circle as CircleIcon,
  DoNotDisturb as BusyIcon,
  AccessTime as AwayIcon,
  OfflineBolt as OfflineIcon
} from '@mui/icons-material';
import { useAppContext } from '../../context/AppContext';
import { UserStatus } from '../../types';

interface UserStatusMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export const UserStatusMenu: React.FC<UserStatusMenuProps> = ({ anchorEl, onClose }) => {
  const { state, dispatch } = useAppContext();
  const open = Boolean(anchorEl);

  const statusOptions: Array<{
    value: UserStatus;
    label: string;
    color: string;
    icon: React.ReactNode;
    description: string;
  }> = [
    {
      value: 'available',
      label: 'Available',
      color: '#4caf50',
      icon: <CircleIcon sx={{ color: '#4caf50' }} />,
      description: 'Ready to take calls and chats'
    },
    {
      value: 'busy',
      label: 'Busy',
      color: '#f44336',
      icon: <BusyIcon sx={{ color: '#f44336' }} />,
      description: 'Currently on a call or busy'
    },
    {
      value: 'away',
      label: 'Away',
      color: '#ff9800',
      icon: <AwayIcon sx={{ color: '#ff9800' }} />,
      description: 'Away from desk but checking messages'
    },
    {
      value: 'offline',
      label: 'Offline',
      color: '#9e9e9e',
      icon: <OfflineIcon sx={{ color: '#9e9e9e' }} />,
      description: 'Not available for calls or chats'
    }
  ];

  const handleStatusChange = (status: UserStatus) => {
    dispatch({ type: 'SET_USER_STATUS', payload: status });
    onClose();
  };

  const currentStatus = statusOptions.find(option => option.value === state.currentUser?.status);

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
      disableRestoreFocus
      keepMounted={false}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" fontWeight="bold">
          Set Status
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Current: {currentStatus?.label}
        </Typography>
      </Box>

      {/* Status Options */}
      {statusOptions.map((option, index) => [
        <MenuItem 
          key={option.value}
          onClick={() => handleStatusChange(option.value)}
          sx={{ 
            py: 1.5,
            px: 2,
            '&:hover': { backgroundColor: '#f5f5f5' },
            backgroundColor: state.currentUser?.status === option.value ? '#e3f2fd' : 'transparent'
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            {option.icon}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="subtitle2" fontWeight="bold" component="span">
                {option.label}
                {state.currentUser?.status === option.value && (
                  <Typography variant="caption" color="primary" fontWeight="bold" component="span" sx={{ ml: 1 }}>
                    Current
                  </Typography>
                )}
              </Typography>
            }
            secondary={
              <Typography variant="body2" color="text.secondary" component="span">
                {option.description}
              </Typography>
            }
          />
        </MenuItem>,
        index < statusOptions.length - 1 && <Divider key={`divider-${option.value}`} />
      ])}
    </Menu>
  );
};
