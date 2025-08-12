import React from 'react';
import { 
  Box, 
  Typography, 
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  Button
} from '@mui/material';
import { 
  Chat as ChatIcon,
  Phone as PhoneIcon,
  Call as CallIcon,
  RadioButtonChecked as ActiveIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import { ChatList } from '../organisms/ChatList';
import { useAppContext } from '../../context/AppContext';

export const ChatListPanel: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const handleChatSelect = (chat: any) => {
    dispatch({ type: 'SELECT_CHAT', payload: chat.id });
  };

  // Mock data for different navigation types
  const mockWhatsAppRequests = [
    { id: '1', customer: 'John Smith', message: 'Need help with my order', time: '2 min ago', priority: 'high' },
    { id: '2', customer: 'Sarah Johnson', message: 'Product inquiry', time: '5 min ago', priority: 'medium' },
    { id: '3', customer: 'Mike Wilson', message: 'Payment issue', time: '8 min ago', priority: 'high' },
    { id: '4', customer: 'Lisa Brown', message: 'Delivery question', time: '12 min ago', priority: 'low' },
    { id: '5', customer: 'David Lee', message: 'Return request', time: '15 min ago', priority: 'medium' },
  ];

  const mockPhoneRequests = [
    { id: '1', customer: 'Emma Davis', reason: 'Technical Support', time: '1 min ago', priority: 'high' },
    { id: '2', customer: 'Tom Anderson', reason: 'Sales Inquiry', time: '3 min ago', priority: 'medium' },
    { id: '3', customer: 'Rachel Green', reason: 'Billing Question', time: '7 min ago', priority: 'low' },
  ];

  const mockIncomingCalls = [
    { id: '1', customer: 'Alex Turner', number: '+1-555-0123', time: '30 sec ago', status: 'ringing' },
    { id: '2', customer: 'Maria Garcia', number: '+1-555-0456', time: '1 min ago', status: 'ringing' },
    { id: '3', customer: 'James Wilson', number: '+1-555-0789', time: '2 min ago', status: 'ringing' },
  ];

  const renderWhatsAppRequests = () => (
    <Box>
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" fontWeight="bold">
          WhatsApp Requests
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {mockWhatsAppRequests.length} pending requests
        </Typography>
      </Box>
      <List sx={{ p: 0 }}>
        {mockWhatsAppRequests.map((request, index) => (
          <React.Fragment key={request.id}>
            <ListItem sx={{ 
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#f5f5f5' }
            }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#25d366' }}>
                  <ChatIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {request.customer}
                    </Typography>
                    <Chip 
                      label={request.priority} 
                      size="small" 
                      color={request.priority === 'high' ? 'error' : request.priority === 'medium' ? 'warning' : 'default'}
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.primary">
                      {request.message}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <TimeIcon sx={{ fontSize: 14, mr: 0.5 }} />
                      <Typography variant="caption" color="text.secondary">
                        {request.time}
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
            {index < mockWhatsAppRequests.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  const renderPhoneRequests = () => (
    <Box>
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" fontWeight="bold">
          Phone Call Requests
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {mockPhoneRequests.length} pending requests
        </Typography>
      </Box>
      <List sx={{ p: 0 }}>
        {mockPhoneRequests.map((request, index) => (
          <React.Fragment key={request.id}>
            <ListItem sx={{ 
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#f5f5f5' }
            }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#1976d2' }}>
                  <PhoneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {request.customer}
                    </Typography>
                    <Chip 
                      label={request.priority} 
                      size="small" 
                      color={request.priority === 'high' ? 'error' : request.priority === 'medium' ? 'warning' : 'default'}
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.primary">
                      {request.reason}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <TimeIcon sx={{ fontSize: 14, mr: 0.5 }} />
                      <Typography variant="caption" color="text.secondary">
                        {request.time}
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
            {index < mockPhoneRequests.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  const renderIncomingCalls = () => (
    <Box>
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" fontWeight="bold">
          Incoming Calls
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {mockIncomingCalls.length} active calls
        </Typography>
      </Box>
      <List sx={{ p: 0 }}>
        {mockIncomingCalls.map((call, index) => (
          <React.Fragment key={call.id}>
            <ListItem sx={{ 
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#f5f5f5' }
            }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#f57c00' }}>
                  <CallIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {call.customer}
                    </Typography>
                    <Chip 
                      label={call.status} 
                      size="small" 
                      color="error"
                      icon={<ActiveIcon />}
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.primary">
                      {call.number}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <TimeIcon sx={{ fontSize: 14, mr: 0.5 }} />
                      <Typography variant="caption" color="text.secondary">
                        {call.time}
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
            {index < mockIncomingCalls.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  const renderActiveCall = () => (
    <Box>
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" fontWeight="bold">
          Active Call
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Currently on call
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: '#4caf50', mx: 'auto', mb: 2 }}>
            <CallIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h6" fontWeight="bold">
            Manish
          </Typography>
          <Typography variant="body2" color="text.secondary">
            +1-555-0123
          </Typography>
          <Typography variant="h4" fontWeight="bold" color="primary" sx={{ mt: 2 }}>
            12:34
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Call duration
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Button variant="outlined" color="error" size="small">
            End Call
          </Button>
          <Button variant="outlined" size="small">
            Hold
          </Button>
          <Button variant="outlined" size="small">
            Transfer
          </Button>
        </Box>
      </Box>
    </Box>
  );

  const renderChatList = () => (
    <Box>
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" fontWeight="bold">
          Chat
        </Typography>
      </Box>
      <ChatList 
        chats={state.chats} 
        onChatSelect={handleChatSelect}
        selectedChatId={state.selectedChatId}
      />
    </Box>
  );

  // Render different content based on active navigation
  const renderContent = () => {
    switch (state.activeNavigation) {
      case 'whatsapp':
        return renderWhatsAppRequests();
      case 'phone':
        return renderPhoneRequests();
      case 'incoming':
        return renderIncomingCalls();
      case 'active-call':
        return renderActiveCall();
      case 'ai-assistant':
      default:
        return renderChatList();
    }
  };

  return (
    <Box sx={{ 
      width: 320, 
      backgroundColor: 'white', 
      borderRight: '1px solid #e0e0e0',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {renderContent()}
    </Box>
  );
}; 