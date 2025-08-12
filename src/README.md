# Project Structure

This project follows Atomic Design principles and modern React best practices.

## Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── atoms/           # Basic building blocks (Button, Input, etc.)
│   ├── molecules/       # Simple combinations of atoms (MessageBubble, etc.)
│   ├── organisms/       # Complex UI sections (ChatList, etc.)
│   ├── layout/          # Layout components (MainLayout, SidePanel, etc.)
│   └── content/         # Content components for different navigation tabs
├── hooks/               # Custom React hooks
├── utils/               # Pure utility functions
├── helpers/             # Application-specific helper functions
├── types/               # TypeScript type definitions
├── constants/           # Application constants and configuration
├── context/             # React context for state management
└── assets/              # Static assets (images, icons, styles)
```

## Component Architecture

### Atoms
- **Button**: Reusable button component with variants
- **Input**: Text input component with Material UI integration

### Molecules
- **MessageBubble**: Chat message display component

### Organisms
- **ChatList**: Complete chat list with selection and unread indicators

### Layout
- **MainLayout**: Main application layout with header and panels
- **SidePanel**: Left navigation panel with tabbed interface
- **ChatListPanel**: Center panel with chat list and tabs
- **ChatPanel**: Right panel with dynamic content based on navigation

### Content
- **WhatsAppRequests**: WhatsApp chat request interface
- **PhoneRequests**: Phone call request interface
- **IncomingCalls**: Incoming calls interface
- **ActiveCall**: Active call interface with controls

## Key Features

- **TypeScript**: Full type safety throughout the application
- **Material UI**: Consistent design system
- **Atomic Design**: Scalable component architecture
- **Custom Hooks**: Reusable logic (useLocalStorage)
- **Context API**: Global state management
- **Tabbed Navigation**: Dynamic content switching
- **Real-time Updates**: Live call duration and status updates

## Usage

```typescript
// Import components
import { Button, Input, MessageBubble, ChatList } from './components';

// Import utilities
import { formatTime, generateId } from './utils';

// Import types
import { User, Message, Chat } from './types';

// Import constants
import { APP_NAME, THEME } from './constants';
``` 