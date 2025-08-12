import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  InputAdornment,
  IconButton,
  Divider,
  Tabs,
  Tab
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Chat as ChatIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import { useAppContext } from '../../context/AppContext';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  type: 'chat' | 'contact' | 'message';
  title: string;
  subtitle: string;
  avatar?: string;
  time?: string;
  unread?: boolean;
}

// Mock search data - moved outside component to prevent recreation
const mockSearchData: SearchResult[] = [
  // Chats
  { id: '1', type: 'chat', title: 'Customer Support', subtitle: 'Last message: How can I help you today?', time: '2 min ago', unread: true },
  { id: '2', type: 'chat', title: 'Sales Team', subtitle: 'Last message: Thank you for your inquiry', time: '1 hour ago', unread: false },
  { id: '3', type: 'chat', title: 'Technical Support', subtitle: 'Last message: Issue has been resolved', time: '3 hours ago', unread: true },
  
  // Contacts
  { id: '4', type: 'contact', title: 'John Smith', subtitle: 'Customer - Premium Plan', avatar: 'JS' },
  { id: '5', type: 'contact', title: 'Sarah Johnson', subtitle: 'Customer - Basic Plan', avatar: 'SJ' },
  { id: '6', type: 'contact', title: 'Mike Wilson', subtitle: 'Customer - Enterprise Plan', avatar: 'MW' },
  
  // Messages
  { id: '7', type: 'message', title: 'Payment issue resolved', subtitle: 'Message from John Smith about payment processing', time: '1 day ago' },
  { id: '8', type: 'message', title: 'Product inquiry', subtitle: 'Message from Sarah Johnson about product features', time: '2 days ago' },
];

export const SearchDialog: React.FC<SearchDialogProps> = ({ open, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      // Filter results based on search query
      const filtered = mockSearchData.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleResultClick = (result: SearchResult) => {
    // TODO: Navigate to the selected result
    console.log('Search result clicked:', result);
    onClose();
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'chat':
        return <ChatIcon />;
      case 'contact':
        return <PersonIcon />;
      case 'message':
        return <ChatIcon />;
      default:
        return <SearchIcon />;
    }
  };

  const getResultColor = (type: string) => {
    switch (type) {
      case 'chat':
        return '#25d366';
      case 'contact':
        return '#1976d2';
      case 'message':
        return '#9e9e9e';
      default:
        return '#9e9e9e';
    }
  };

  const filteredResults = activeTab === 0 
    ? searchResults.filter(r => r.type === 'chat')
    : activeTab === 1
    ? searchResults.filter(r => r.type === 'contact')
    : searchResults.filter(r => r.type === 'message');

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
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
          <SearchIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Search
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        {/* Search Input */}
        <TextField
          fullWidth
          placeholder="Search chats, contacts, messages..."
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClearSearch}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          autoFocus
        />

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="search tabs">
            <Tab label={`Chats (${searchResults.filter(r => r.type === 'chat').length})`} />
            <Tab label={`Contacts (${searchResults.filter(r => r.type === 'contact').length})`} />
            <Tab label={`Messages (${searchResults.filter(r => r.type === 'message').length})`} />
          </Tabs>
        </Box>

        {/* Search Results */}
        <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
          {searchQuery ? (
            filteredResults.length > 0 ? (
              <List sx={{ p: 0 }}>
                {filteredResults.map((result, index) => (
                  <React.Fragment key={result.id}>
                    <ListItem 
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: '#f5f5f5' },
                        py: 1.5
                      }}
                      onClick={() => handleResultClick(result)}
                    >
                      <ListItemAvatar>
                        <Avatar 
                          sx={{ 
                            bgcolor: getResultColor(result.type),
                            fontSize: '0.875rem'
                          }}
                        >
                          {result.avatar || getResultIcon(result.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {result.title}
                            </Typography>
                            {result.unread && (
                              <Chip label="New" size="small" color="primary" />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.primary">
                              {result.subtitle}
                            </Typography>
                            {result.time && (
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <TimeIcon sx={{ fontSize: 14, mr: 0.5 }} />
                                <Typography variant="caption" color="text.secondary">
                                  {result.time}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < filteredResults.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <SearchIcon sx={{ fontSize: 48, color: '#bdbdbd', mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  No results found for "{searchQuery}"
                </Typography>
              </Box>
            )
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <SearchIcon sx={{ fontSize: 48, color: '#bdbdbd', mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Start typing to search...
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
