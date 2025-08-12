# Project Structure

This project follows Atomic Design principles and modern React best practices.

## Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── atoms/           # Basic building blocks (Button, Input, etc.)
│   ├── molecules/       # Simple combinations of atoms (MessageBubble, etc.)
│   └── organisms/       # Complex UI sections (ChatList, etc.)
├── hooks/               # Custom React hooks
├── services/            # API and external service integrations
├── utils/               # Pure utility functions
├── helpers/             # Application-specific helper functions
├── types/               # TypeScript type definitions
├── constants/           # Application constants and configuration
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

## Key Features

- **TypeScript**: Full type safety throughout the application
- **Material UI**: Consistent design system
- **Atomic Design**: Scalable component architecture
- **Custom Hooks**: Reusable logic (useLocalStorage)
- **API Service**: Centralized HTTP client
- **Utility Functions**: Common helper functions
- **Constants**: Centralized configuration

## Usage

```typescript
// Import components
import { Button, Input, MessageBubble, ChatList } from './components';

// Import utilities
import { formatDate, truncateText } from './utils';

// Import types
import { User, Message, Chat } from './types';

// Import constants
import { APP_NAME, API_ENDPOINTS } from './constants';
``` 