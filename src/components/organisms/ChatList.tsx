import React from 'react';
import { List, ListItemButton, ListItemText, ListItemAvatar, Avatar, Typography, Box } from '@mui/material';
import { Chat } from '../../types';
import { getLastMessagePreview, getUnreadMessageCount } from '../../helpers';

interface ChatListProps {
  chats: Chat[];
  onChatSelect: (chat: Chat) => void;
  selectedChatId?: string;
}

export const ChatList: React.FC<ChatListProps> = ({ 
  chats, 
  onChatSelect, 
  selectedChatId 
}) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {chats.map((chat) => {
        const otherParticipant = chat.participants[0]; // Assuming first participant is the other user
        const isSelected = selectedChatId === chat.id;
        
        return (
          <ListItemButton
            key={chat.id}
            selected={isSelected}
            onClick={() => onChatSelect(chat)}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemAvatar>
              <Avatar src={otherParticipant.avatar}>
                {otherParticipant.name.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" component="span">
                    {otherParticipant.name}
                  </Typography>
                  {getUnreadMessageCount(chat) > 0 && (
                    <Typography
                      variant="caption"
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        borderRadius: '50%',
                        px: 1,
                        py: 0.5,
                        minWidth: 20,
                        textAlign: 'center',
                      }}
                    >
                      {getUnreadMessageCount(chat)}
                    </Typography>
                  )}
                </Box>
              }
              secondary={getLastMessagePreview(chat)}
              secondaryTypographyProps={{
                noWrap: true,
                variant: 'body2',
                color: 'text.secondary',
              }}
            />
          </ListItemButton>
        );
      })}
    </List>
  );
}; 