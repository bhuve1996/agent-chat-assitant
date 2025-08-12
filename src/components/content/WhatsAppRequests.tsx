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
  Button
} from '@mui/material';
import { Chat as ChatIcon, Person as PersonIcon } from '@mui/icons-material';

interface WhatsAppRequest {
  id: string;
  customerName: string;
  phoneNumber: string;
  message: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
}

const mockRequests: WhatsAppRequest[] = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    phoneNumber: '+1-555-0123',
    message: 'I need help with my recent order #12345',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    priority: 'high'
  },
  {
    id: '2',
    customerName: 'Mike Chen',
    phoneNumber: '+1-555-0124',
    message: 'When will my refund be processed?',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    priority: 'medium'
  },
  {
    id: '3',
    customerName: 'Emily Davis',
    phoneNumber: '+1-555-0125',
    message: 'Can I change my delivery address?',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    priority: 'low'
  },
  {
    id: '4',
    customerName: 'David Wilson',
    phoneNumber: '+1-555-0126',
    message: 'Product arrived damaged, need replacement',
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    priority: 'high'
  },
  {
    id: '5',
    customerName: 'Lisa Brown',
    phoneNumber: '+1-555-0127',
    message: 'How do I track my order?',
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    priority: 'medium'
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

export const WhatsAppRequests: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <ChatIcon sx={{ mr: 2, color: '#25D366' }} />
        <Typography variant="h5" fontWeight="bold">
          WhatsApp Chat Requests
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
              <Avatar sx={{ bgcolor: '#25D366' }}>
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
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {request.message}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" size="small" color="primary">
                      Accept Chat
                    </Button>
                    <Button variant="outlined" size="small">
                      Transfer
                    </Button>
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