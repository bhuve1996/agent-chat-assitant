import React, { useState } from 'react';
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  ListItemButton,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  Chat as ChatIcon,
  Phone as PhoneIcon,
  Call as CallIcon,
  RadioButtonChecked as ActiveIcon,
  AccessTime as TimeIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { ChatList } from '../organisms/ChatList';
import { useAppContext } from '../../context/AppContext';

export const ChatListPanel: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [newChatDialogOpen, setNewChatDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChatSelect = (chat: any) => {
    dispatch({ type: 'SELECT_CHAT', payload: chat.id });
  };

  // Mock contacts data
  const mockContacts = [
    { id: 'contact1', name: 'John Smith', email: 'john.smith@example.com', avatar: 'JS', department: 'Sales' },
    { id: 'contact2', name: 'Sarah Johnson', email: 'sarah.johnson@example.com', avatar: 'SJ', department: 'Marketing' },
    { id: 'contact3', name: 'Mike Wilson', email: 'mike.wilson@example.com', avatar: 'MW', department: 'Engineering' },
    { id: 'contact4', name: 'Lisa Brown', email: 'lisa.brown@example.com', avatar: 'LB', department: 'HR' },
    { id: 'contact5', name: 'David Lee', email: 'david.lee@example.com', avatar: 'DL', department: 'Finance' },
    { id: 'contact6', name: 'Emma Davis', email: 'emma.davis@example.com', avatar: 'ED', department: 'Customer Support' },
    { id: 'contact7', name: 'Tom Anderson', email: 'tom.anderson@example.com', avatar: 'TA', department: 'Product' },
    { id: 'contact8', name: 'Rachel Green', email: 'rachel.green@example.com', avatar: 'RG', department: 'Legal' },
  ];

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewChat = (contact: any) => {
    // Create a new chat with the selected contact
    const newChat = {
      id: `chat_${Date.now()}`,
      participants: [{ id: contact.id, name: contact.name, email: contact.email }],
      messages: [],
      lastMessage: { 
        id: 'welcome', 
        content: `Started a conversation with ${contact.name}`, 
        sender: { id: 'system', name: 'System', email: '' }, 
        timestamp: new Date(), 
        type: 'text' as const 
      },
      unreadCount: 0
    };

    dispatch({ type: 'ADD_CHAT', payload: newChat });
    dispatch({ type: 'SELECT_CHAT', payload: newChat.id });
    setNewChatDialogOpen(false);
    setSearchQuery('');
  };

  const handleOpenNewChatDialog = () => {
    setNewChatDialogOpen(true);
  };

  const handleCloseNewChatDialog = () => {
    setNewChatDialogOpen(false);
    setSearchQuery('');
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
      <Box sx={{ p: { xs: 1, sm: 2 }, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          WhatsApp Requests
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          {mockWhatsAppRequests.length} pending requests
        </Typography>
      </Box>
      <List sx={{ p: 0 }}>
        {mockWhatsAppRequests.map((request, index) => (
          <React.Fragment key={request.id}>
            <ListItem sx={{ 
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#f5f5f5' },
              px: { xs: 1, sm: 2 },
              py: { xs: 1, sm: 1.5 }
            }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#25d366', width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 } }}>
                  <ChatIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {request.customer}
                    </Typography>
                    <Chip 
                      label={request.priority} 
                      size="small" 
                      color={request.priority === 'high' ? 'error' : request.priority === 'medium' ? 'warning' : 'default'}
                      sx={{ fontSize: { xs: '0.625rem', sm: '0.75rem' } }}
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.primary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {request.message}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <TimeIcon sx={{ fontSize: { xs: 12, sm: 14 }, mr: 0.5 }} />
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.625rem', sm: '0.75rem' } }}>
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
      <Box sx={{ p: { xs: 1, sm: 2 }, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Phone Call Requests
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          {mockPhoneRequests.length} pending requests
        </Typography>
      </Box>
      <List sx={{ p: 0 }}>
        {mockPhoneRequests.map((request, index) => (
          <React.Fragment key={request.id}>
            <ListItem sx={{ 
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#f5f5f5' },
              px: { xs: 1, sm: 2 },
              py: { xs: 1, sm: 1.5 }
            }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#1976d2', width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 } }}>
                  <PhoneIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {request.customer}
                    </Typography>
                    <Chip 
                      label={request.priority} 
                      size="small" 
                      color={request.priority === 'high' ? 'error' : request.priority === 'medium' ? 'warning' : 'default'}
                      sx={{ fontSize: { xs: '0.625rem', sm: '0.75rem' } }}
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.primary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {request.reason}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <TimeIcon sx={{ fontSize: { xs: 12, sm: 14 }, mr: 0.5 }} />
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.625rem', sm: '0.75rem' } }}>
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
      <Box sx={{ p: { xs: 1, sm: 2 }, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Incoming Calls
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          {mockIncomingCalls.length} active calls
        </Typography>
      </Box>
      <List sx={{ p: 0 }}>
        {mockIncomingCalls.map((call, index) => (
          <React.Fragment key={call.id}>
            <ListItem sx={{ 
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#f5f5f5' },
              px: { xs: 1, sm: 2 },
              py: { xs: 1, sm: 1.5 }
            }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#f57c00', width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 } }}>
                  <CallIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {call.customer}
                    </Typography>
                    <Chip 
                      label={call.status} 
                      size="small" 
                      color="error"
                      icon={<ActiveIcon />}
                      sx={{ fontSize: { xs: '0.625rem', sm: '0.75rem' } }}
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.primary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {call.number}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <TimeIcon sx={{ fontSize: { xs: 12, sm: 14 }, mr: 0.5 }} />
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.625rem', sm: '0.75rem' } }}>
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
      <Box sx={{ p: { xs: 1, sm: 2 }, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Active Call
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          Currently on call
        </Typography>
      </Box>
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Avatar sx={{ 
            width: { xs: 60, sm: 80 }, 
            height: { xs: 60, sm: 80 }, 
            bgcolor: '#4caf50', 
            mx: 'auto', 
            mb: 2 
          }}>
            <CallIcon sx={{ fontSize: { xs: 30, sm: 40 } }} />
          </Avatar>
          <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Manish
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            +1-555-0123
          </Typography>
          <Typography variant="h4" fontWeight="bold" color="primary" sx={{ mt: 2, fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
            12:34
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.625rem', sm: '0.75rem' } }}>
            Call duration
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="outlined" color="error" size="small" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            End Call
          </Button>
          <Button variant="outlined" size="small" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            Hold
          </Button>
          <Button variant="outlined" size="small" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            Transfer
          </Button>
        </Box>
      </Box>
    </Box>
  );

  const renderChatList = () => (
    <Box>
      <Box sx={{ 
        p: { xs: 1, sm: 2 }, 
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Chat
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={handleOpenNewChatDialog}
          sx={{ 
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            minWidth: { xs: 'auto', sm: '100px' }
          }}
        >
          {window.innerWidth > 600 ? 'New Chat' : 'New'}
        </Button>
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
    <>
      <Box sx={{ 
        width: '100%',
        backgroundColor: 'white', 
        borderRight: { xs: 'none', md: '1px solid #e0e0e0' },
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        {renderContent()}
      </Box>

      {/* New Chat Dialog */}
      <Dialog 
        open={newChatDialogOpen} 
        onClose={handleCloseNewChatDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: '80vh'
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AddIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Start New Chat
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ pt: 0 }}>
          <TextField
            fullWidth
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            autoFocus
          />

          <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
            {filteredContacts.length > 0 ? (
              <List sx={{ p: 0 }}>
                {filteredContacts.map((contact, index) => (
                  <React.Fragment key={contact.id}>
                    <ListItemButton 
                      onClick={() => handleNewChat(contact)}
                      sx={{ 
                        py: 1.5,
                        px: 2,
                        '&:hover': { backgroundColor: '#f5f5f5' }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#1976d2', fontSize: '0.875rem' }}>
                          {contact.avatar}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" fontWeight="bold">
                            {contact.name}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.primary">
                              {contact.email}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {contact.department}
                            </Typography>
                          </Box>
                        }
                      />
                      <IconButton size="small" color="primary">
                        <ChatIcon />
                      </IconButton>
                    </ListItemButton>
                    {index < filteredContacts.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <PersonIcon sx={{ fontSize: 48, color: '#bdbdbd', mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {searchQuery ? 'No contacts found' : 'No contacts available'}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}; 