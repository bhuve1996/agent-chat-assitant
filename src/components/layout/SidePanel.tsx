import React from 'react';
import { 
  Box, 
  Typography, 
  Badge
} from '@mui/material';
import { 
  SmartToy as RobotIcon,
  Chat as ChatIcon,
  Phone as PhoneIcon,
  Call as CallIcon,
  RadioButtonChecked as ActiveIcon
} from '@mui/icons-material';
import { useAppContext } from '../../context/AppContext';

interface SidePanelProps {
  onClose?: () => void;
}

export const SidePanel: React.FC<SidePanelProps> = ({ onClose }) => {
  const { state, dispatch } = useAppContext();



  const handleNavigationClick = (navigationType: string) => {
    dispatch({ type: 'SET_ACTIVE_NAVIGATION', payload: navigationType });
    // Close mobile drawer if onClose function is provided
    if (onClose) {
      onClose();
    }
  };

  const isActiveNavigation = (navigationType: string) => {
    return state.activeNavigation === navigationType;
  };

  return (
    <Box sx={{ 
      width: 160, 
      height: '100vh',
      backgroundColor: '#f5f5f5', 
      borderRight: '1px solid #e0e0e0',
      display: 'flex',
      flexDirection: 'column'
    }}>
      

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, pt: 2, px: 1 }}>
        {/* AI Virtual Assistant */}
        <Box 
          onClick={() => handleNavigationClick('ai-assistant')}
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 2,
            px: 1,
            mb: 1,
            borderRadius: 2,
            cursor: 'pointer',
            backgroundColor: isActiveNavigation('ai-assistant') ? '#e3f2fd' : 'transparent',
            '&:hover': { backgroundColor: isActiveNavigation('ai-assistant') ? '#e3f2fd' : '#f0f0f0' }
          }}
        >
          <RobotIcon 
            sx={{ 
              fontSize: 32, 
              color: isActiveNavigation('ai-assistant') ? '#1976d2' : '#666',
              mb: 1
            }} 
          />
          <Typography 
            variant="caption" 
            sx={{ 
              textAlign: 'center',
              fontWeight: isActiveNavigation('ai-assistant') ? 'bold' : 'normal',
              color: isActiveNavigation('ai-assistant') ? '#1976d2' : '#666'
            }}
          >
            AI Assistant
          </Typography>
        </Box>

        {/* WhatsApp Chat Request */}
        <Box 
          onClick={() => handleNavigationClick('whatsapp')}
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 2,
            px: 1,
            mb: 1,
            borderRadius: 2,
            cursor: 'pointer',
            backgroundColor: isActiveNavigation('whatsapp') ? '#e3f2fd' : 'transparent',
            '&:hover': { backgroundColor: isActiveNavigation('whatsapp') ? '#e3f2fd' : '#f0f0f0' },
            position: 'relative'
          }}
        >
          <Badge badgeContent={5} color="error" sx={{ mb: 1 }}>
            <ChatIcon 
              sx={{ 
                fontSize: 32, 
                color: isActiveNavigation('whatsapp') ? '#1976d2' : '#666'
              }} 
            />
          </Badge>
          <Typography 
            variant="caption" 
            sx={{ 
              textAlign: 'center',
              fontWeight: isActiveNavigation('whatsapp') ? 'bold' : 'normal',
              color: isActiveNavigation('whatsapp') ? '#1976d2' : '#666'
            }}
          >
            WhatsApp
          </Typography>
        </Box>

        {/* Phone Call Request */}
        <Box 
          onClick={() => handleNavigationClick('phone')}
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 2,
            px: 1,
            mb: 1,
            borderRadius: 2,
            cursor: 'pointer',
            backgroundColor: isActiveNavigation('phone') ? '#e3f2fd' : 'transparent',
            '&:hover': { backgroundColor: isActiveNavigation('phone') ? '#e3f2fd' : '#f0f0f0' },
            position: 'relative'
          }}
        >
          <Badge badgeContent={3} color="error" sx={{ mb: 1 }}>
            <PhoneIcon 
              sx={{ 
                fontSize: 32, 
                color: isActiveNavigation('phone') ? '#1976d2' : '#666'
              }} 
            />
          </Badge>
          <Typography 
            variant="caption" 
            sx={{ 
              textAlign: 'center',
              fontWeight: isActiveNavigation('phone') ? 'bold' : 'normal',
              color: isActiveNavigation('phone') ? '#1976d2' : '#666'
            }}
          >
            Phone Calls
          </Typography>
        </Box>

        {/* Incoming Calls */}
        <Box 
          onClick={() => handleNavigationClick('incoming')}
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 2,
            px: 1,
            mb: 1,
            borderRadius: 2,
            cursor: 'pointer',
            backgroundColor: isActiveNavigation('incoming') ? '#e3f2fd' : 'transparent',
            '&:hover': { backgroundColor: isActiveNavigation('incoming') ? '#e3f2fd' : '#f0f0f0' },
            position: 'relative'
          }}
        >
          <Badge badgeContent={3} color="error" sx={{ mb: 1 }}>
            <CallIcon 
              sx={{ 
                fontSize: 32, 
                color: isActiveNavigation('incoming') ? '#1976d2' : '#666'
              }} 
            />
          </Badge>
          <Typography 
            variant="caption" 
            sx={{ 
              textAlign: 'center',
              fontWeight: isActiveNavigation('incoming') ? 'bold' : 'normal',
              color: isActiveNavigation('incoming') ? '#1976d2' : '#666'
            }}
          >
            Incoming
          </Typography>
        </Box>

        {/* Active Call */}
        <Box 
          onClick={() => handleNavigationClick('active-call')}
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 2,
            px: 1,
            mb: 1,
            borderRadius: 2,
            cursor: 'pointer',
            backgroundColor: isActiveNavigation('active-call') ? '#e3f2fd' : 'transparent',
            '&:hover': { backgroundColor: isActiveNavigation('active-call') ? '#e3f2fd' : '#f0f0f0' }
          }}
        >
          <ActiveIcon 
            sx={{ 
              fontSize: 32, 
              color: isActiveNavigation('active-call') ? '#1976d2' : '#666',
              mb: 1
            }} 
          />
          <Typography 
            variant="caption" 
            sx={{ 
              textAlign: 'center',
              fontWeight: isActiveNavigation('active-call') ? 'bold' : 'normal',
              color: isActiveNavigation('active-call') ? '#1976d2' : '#666'
            }}
          >
            Active Call
          </Typography>
        </Box>
      </Box>

    </Box>
  );
}; 