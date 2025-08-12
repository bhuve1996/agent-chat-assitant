import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { MainLayout } from './components/layout';
import { AppProvider } from './context/AppContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
