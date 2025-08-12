import React from 'react';
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Chip
} from '@mui/material';
import {
  Chat as ChatIcon,
  Phone as PhoneIcon,
  Call as CallIcon,
  Notifications as NotificationsIcon,
  AccessTime as TimeIcon,
  Circle as CircleIcon
} from '@mui/icons-material';


interface NotificationsMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export const NotificationsMenu: React.FC<NotificationsMenuProps> = ({ anchorEl, onClose }) => {
  const open = Boolean(anchorEl);

  // Mock notifications data
  const notifications = [
    {
      id: '1',
      type: 'chat',
      title: 'New WhatsApp message',
      message: 'John Smith sent you a message',
      time: '2 min ago',
      unread: true,
      priority: 'high'
    },
    {
      id: '2',
      type: 'phone',
      title: 'Phone call request',
      message: 'Emma Davis requested a call',
      time: '5 min ago',
      unread: true,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'call',
      title: 'Incoming call',
      message: 'Alex Turner is calling',
      time: '8 min ago',
      unread: false,
      priority: 'high'
    },
    {
      id: '4',
      type: 'chat',
      title: 'Chat message',
      message: 'Sarah Johnson replied to your message',
      time: '12 min ago',
      unread: false,
      priority: 'low'
    },
    {
      id: '5',
      type: 'phone',
      title: 'Call ended',
      message: 'Call with Mike Wilson ended',
      time: '15 min ago',
      unread: false,
      priority: 'low'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'chat':
        return <ChatIcon fontSize="small" />;
      case 'phone':
        return <PhoneIcon fontSize="small" />;
      case 'call':
        return <CallIcon fontSize="small" />;
      default:
        return <NotificationsIcon fontSize="small" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'chat':
        return '#25d366';
      case 'phone':
        return '#1976d2';
      case 'call':
        return '#f57c00';
      default:
        return '#9e9e9e';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleNotificationClick = (notification: any) => {
    // TODO: Handle notification click - navigate to relevant section
    console.log('Notification clicked:', notification);
    onClose();
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 400,
          maxHeight: 500,
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="bold">
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Chip 
              label={`${unreadCount} new`} 
              size="small" 
              color="primary"
              variant="outlined"
            />
          )}
        </Box>
      </Box>

      {/* Notifications List */}
      <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <MenuItem 
                onClick={() => handleNotificationClick(notification)}
                sx={{ 
                  py: 1.5,
                  px: 2,
                  '&:hover': { backgroundColor: '#f5f5f5' },
                  backgroundColor: notification.unread ? '#f8f9fa' : 'transparent'
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      bgcolor: getNotificationColor(notification.type),
                      fontSize: '0.875rem'
                    }}
                  >
                    {getNotificationIcon(notification.type)}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight="bold" component="span">
                      {notification.title}
                      {notification.unread && (
                        <CircleIcon sx={{ fontSize: 8, color: '#1976d2', ml: 0.5 }} />
                      )}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.primary" component="span">
                      {notification.message}
                    </Typography>
                  }
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                  <Chip 
                    label={notification.priority} 
                    size="small" 
                    color={getPriorityColor(notification.priority)}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TimeIcon sx={{ fontSize: 14, mr: 0.5 }} />
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
              {index < notifications.length - 1 && <Divider />}
            </React.Fragment>
          ))
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <NotificationsIcon sx={{ fontSize: 48, color: '#bdbdbd', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              No notifications
            </Typography>
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
        <Typography 
          variant="body2" 
          color="primary" 
          sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
        >
          View all notifications
        </Typography>
      </Box>
    </Menu>
  );
};
