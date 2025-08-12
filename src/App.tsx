import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Typography, Box } from '@mui/material';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Chat Assistant
          </Typography>
          <Typography variant="body1">
            Welcome to your chat assistant application.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
