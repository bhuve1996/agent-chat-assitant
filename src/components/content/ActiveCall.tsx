import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Chip,
  Button,
  IconButton,
  LinearProgress,
  Paper
} from '@mui/material';
import { 
  Call as CallIcon, 
  CallEnd as CallEndIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  ScreenShare as ScreenShareIcon,
  Chat as ChatIcon
} from '@mui/icons-material';

interface ActiveCallInfo {
  customerName: string;
  phoneNumber: string;
  callType: 'voice' | 'video';
  startTime: Date;
  duration: string;
  status: 'connected' | 'on-hold' | 'transferring';
}

const mockActiveCall: ActiveCallInfo = {
  customerName: 'Manish',
  phoneNumber: '+1-555-0401',
  callType: 'voice',
  startTime: new Date(Date.now() - 5 * 60 * 1000), // Started 5 minutes ago
  duration: '00:05:23',
  status: 'connected'
};

export const ActiveCall: React.FC = () => {
  const [duration, setDuration] = useState('00:05:23');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isVolumeOn, setIsVolumeOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate duration update
      const currentTime = new Date();
      const startTime = mockActiveCall.startTime;
      const diffInSeconds = Math.floor((currentTime.getTime() - startTime.getTime()) / 1000);
      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;
      setDuration(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <CallIcon sx={{ mr: 2, color: '#4caf50' }} />
        <Typography variant="h5" fontWeight="bold">
          Active Call
        </Typography>
        <Chip 
          label="Connected" 
          color="success" 
          size="small" 
          sx={{ ml: 2 }}
        />
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: '#1976d2', mr: 3 }}>
            {mockActiveCall.customerName.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {mockActiveCall.customerName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {mockActiveCall.phoneNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {mockActiveCall.callType === 'voice' ? 'Voice Call' : 'Video Call'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            {duration}
          </Typography>
          <Chip 
            label={mockActiveCall.status} 
            color="success"
            size="small"
          />
        </Box>

        <LinearProgress 
          variant="determinate" 
          value={75} 
          sx={{ mb: 2 }}
        />
        <Typography variant="caption" color="text.secondary">
          Call quality: Excellent
        </Typography>
      </Paper>

      {/* Call Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
        <IconButton 
          size="large" 
          color={isMuted ? 'error' : 'primary'}
          onClick={() => setIsMuted(!isMuted)}
          sx={{ 
            backgroundColor: isMuted ? '#ffebee' : '#e3f2fd',
            '&:hover': { backgroundColor: isMuted ? '#ffcdd2' : '#bbdefb' }
          }}
        >
          {isMuted ? <MicOffIcon /> : <MicIcon />}
        </IconButton>

        <IconButton 
          size="large" 
          color={isVideoOn ? 'primary' : 'default'}
          onClick={() => setIsVideoOn(!isVideoOn)}
          sx={{ 
            backgroundColor: isVideoOn ? '#e3f2fd' : '#f5f5f5',
            '&:hover': { backgroundColor: isVideoOn ? '#bbdefb' : '#eeeeee' }
          }}
        >
          {isVideoOn ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>

        <IconButton 
          size="large" 
          color={isVolumeOn ? 'primary' : 'default'}
          onClick={() => setIsVolumeOn(!isVolumeOn)}
          sx={{ 
            backgroundColor: isVolumeOn ? '#e3f2fd' : '#f5f5f5',
            '&:hover': { backgroundColor: isVolumeOn ? '#bbdefb' : '#eeeeee' }
          }}
        >
          {isVolumeOn ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </IconButton>

        <IconButton 
          size="large" 
          color="primary"
          sx={{ backgroundColor: '#e3f2fd', '&:hover': { backgroundColor: '#bbdefb' } }}
        >
          <ScreenShareIcon />
        </IconButton>

        <IconButton 
          size="large" 
          color="primary"
          sx={{ backgroundColor: '#e3f2fd', '&:hover': { backgroundColor: '#bbdefb' } }}
        >
          <ChatIcon />
        </IconButton>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button 
          variant="outlined" 
          color="primary"
          onClick={() => setIsRecording(!isRecording)}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>

        <Button 
          variant="outlined" 
          color="warning"
        >
          Hold Call
        </Button>

        <Button 
          variant="outlined" 
          color="info"
        >
          Transfer
        </Button>

        <Button 
          variant="contained" 
          color="error"
          startIcon={<CallEndIcon />}
          size="large"
        >
          End Call
        </Button>
      </Box>
    </Box>
  );
}; 