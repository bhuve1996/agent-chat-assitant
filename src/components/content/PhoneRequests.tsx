import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  Chip,
  Button,
  IconButton
} from '@mui/material';
import { 
  Phone as PhoneIcon, 
  Person as PersonIcon,
  Call as CallIcon,
  CallEnd as CallEndIcon
} from '@mui/icons-material';

interface PhoneRequest {
  id: string;
  customerName: string;
  phoneNumber: string;
  reason: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
  estimatedDuration: string;
}

const mockRequests: PhoneRequest[] = [
  {
    id: '1',
    customerName: 'Robert Smith',
    phoneNumber: '+1-555-0201',
    reason: 'Billing inquiry - Account #789012',
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    priority: 'high',
    estimatedDuration: '5-10 min'
  },
  {
    id: '2',
    customerName: 'Jennifer Lee',
    phoneNumber: '+1-555-0202',
    reason: 'Technical support - Login issues',
    timestamp: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
    priority: 'medium',
    estimatedDuration: '10-15 min'
  },
  {
    id: '3',
    customerName: 'Michael Rodriguez',
    phoneNumber: '+1-555-0203',
    reason: 'Product information request',
    timestamp: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
    priority: 'low',
    estimatedDuration: '3-5 min'
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'error';
    case 'medium': return 'warning';
    case 'low': return 'success';
    default: return 'default';
  }
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
};

export const PhoneRequests: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <PhoneIcon sx={{ mr: 2, color: '#1976d2' }} />
        <Typography variant="h5" fontWeight="bold">
          Phone Call Requests
        </Typography>
        <Chip 
          label={`${mockRequests.length} pending`} 
          color="error" 
          size="small" 
          sx={{ ml: 2 }}
        />
      </Box>

      <List>
        {mockRequests.map((request) => (
          <ListItem
            key={request.id}
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              mb: 2,
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                cursor: 'pointer'
              }
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#1976d2' }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {request.customerName}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip 
                      label={request.priority} 
                      color={getPriorityColor(request.priority) as any}
                      size="small"
                    />
                    <Typography variant="caption" color="text.secondary">
                      {formatTimeAgo(request.timestamp)}
                    </Typography>
                  </Box>
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {request.phoneNumber}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {request.reason}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                    Estimated duration: {request.estimatedDuration}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button 
                      variant="contained" 
                      size="small" 
                      color="success"
                      startIcon={<CallIcon />}
                    >
                      Accept Call
                    </Button>
                    <Button variant="outlined" size="small">
                      Transfer
                    </Button>
                    <IconButton size="small" color="error">
                      <CallEndIcon />
                    </IconButton>
                  </Box>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}; 