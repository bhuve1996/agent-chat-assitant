import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Message } from '../../types';
import { formatTime } from '../../utils';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  isOwnMessage 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
        mb: 1,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          maxWidth: '70%',
          p: 1.5,
          backgroundColor: isOwnMessage ? 'primary.main' : 'grey.100',
          color: isOwnMessage ? 'white' : 'text.primary',
          borderRadius: 2,
        }}
      >
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          {message.content}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            opacity: 0.7,
            fontSize: '0.75rem',
          }}
        >
          {formatTime(message.timestamp)}
        </Typography>
      </Paper>
    </Box>
  );
}; 