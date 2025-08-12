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
  Call as CallIcon, 
  Person as PersonIcon,
  Phone as PhoneIcon,
  CallEnd as CallEndIcon,
  VolumeUp as VolumeUpIcon
} from '@mui/icons-material';

interface IncomingCall {
  id: string;
  customerName: string;
  phoneNumber: string;
  callType: 'voice' | 'video';
  timestamp: Date;
  duration: string;
  status: 'ringing' | 'missed' | 'answered';
}

const mockCalls: IncomingCall[] = [
  {
    id: '1',
    customerName: 'Alex Thompson',
    phoneNumber: '+1-555-0301',
    callType: 'voice',
    timestamp: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
    duration: '0:00',
    status: 'ringing'
  },
  {
    id: '2',
    customerName: 'Maria Garcia',
    phoneNumber: '+1-555-0302',
    callType: 'video',
    timestamp: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
    duration: '0:00',
    status: 'ringing'
  },
  {
    id: '3',
    customerName: 'James Wilson',
    phoneNumber: '+1-555-0303',
    callType: 'voice',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    duration: '0:00',
    status: 'ringing'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ringing': return 'warning';
    case 'missed': return 'error';
    case 'answered': return 'success';
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

export const IncomingCalls: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <CallIcon sx={{ mr: 2, color: '#f57c00' }} />
        <Typography variant="h5" fontWeight="bold">
          Incoming Calls
        </Typography>
        <Chip 
          label={`${mockCalls.length} incoming`} 
          color="warning" 
          size="small" 
          sx={{ ml: 2 }}
        />
      </Box>

      <List>
        {mockCalls.map((call) => (
          <ListItem
            key={call.id}
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
              <Avatar sx={{ bgcolor: '#f57c00' }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {call.customerName}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip 
                      label={call.callType} 
                      color="primary"
                      size="small"
                    />
                    <Chip 
                      label={call.status} 
                      color={getStatusColor(call.status) as any}
                      size="small"
                    />
                    <Typography variant="caption" color="text.secondary">
                      {formatTimeAgo(call.timestamp)}
                    </Typography>
                  </Box>
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {call.phoneNumber}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                    Duration: {call.duration}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button 
                      variant="contained" 
                      size="small" 
                      color="success"
                      startIcon={<PhoneIcon />}
                    >
                      Answer
                    </Button>
                    <Button 
                      variant="contained" 
                      size="small" 
                      color="primary"
                      startIcon={<VolumeUpIcon />}
                    >
                      Answer & Record
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