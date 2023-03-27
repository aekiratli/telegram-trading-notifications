import React from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';
import { API_URL } from '../api/urls';
import apiFetch from '../api/fetcher';
import { api } from '../api/fetcher';
import { useAppContext } from '../AppContext';
import { drawerWidth } from '../components/navbar/styles';

const MyButton = styled(Button)({
  marginTop: '1rem',
});

const Login = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {setIsAuthenticated, setSnackbar} = useAppContext();

  const handleLogin = () => {
    apiFetch(API_URL.login(), { username: username, password: password })
      .then(response => {
        if (response.token){
          setIsAuthenticated(true)
          localStorage.setItem('token', response.token);
          window.location.href="/jobs";
        }
        if (response.message) {
          setSnackbar({open:true, message:response.message, type:'error'})
        }
      })
      .catch(error => {
        setSnackbar({open:true, message:error.message, type:'error'})    
      });
  };

  return (
    <div style={{paddingRight:drawerWidth}}>
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <LockOutlinedIcon sx={{ mb: 1 }} />
        <Typography component="h1" variant="h5">
          Trading Notifications
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <MyButton onClick={handleLogin} fullWidth variant="contained" disabled={username.length === 0 || password.length === 0}>
            Login
          </MyButton>
        </Box>
      </Box>
    </Container>
    </div>
  );
};

export default Login;
