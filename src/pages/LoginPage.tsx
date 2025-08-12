import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Alert,
  Switch,
  FormControlLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { User } from '../types';
import { generateId } from '../utils';

export const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const [, setUser] = useLocalStorage<User | null>('user', null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isLogin) {
        // Check for specific dummy credentials
        if (email === 'Manish@ey.com' && password === 'Manish@123') {
          const mockUser: User = {
            id: generateId(),
            name: 'Manish',
            email: email,
          };
          
          setUser(mockUser);
          navigate('/chat');
        } else {
          throw new Error('Invalid credentials. Use: Manish@ey.com / Manish@123');
        }
      } else {
        // Signup validation
        if (!email || !password || !name) {
          throw new Error('Please fill in all fields');
        }
        
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }

        // For signup, allow any credentials but show a message
        const newUser: User = {
          id: generateId(),
          name: name,
          email: email,
        };
        
        setUser(newUser);
        navigate('/chat');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Chat Assistant
          </Typography>
          
          <Typography variant="h6" component="h2" gutterBottom align="center" color="text.secondary">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Typography>

          {isLogin && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Use these credentials: <strong>Manish@ey.com</strong> / <strong>Manish@123</strong>
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {!isLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            )}
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus={isLogin}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </Button>

            <FormControlLabel
              control={
                <Switch
                  checked={!isLogin}
                  onChange={(e) => setIsLogin(!e.target.checked)}
                />
              }
              label={isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
              sx={{ justifyContent: 'center' }}
            />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}; 