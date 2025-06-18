import React from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  Avatar
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

const Welcome = ({ user, onLogout }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
            Welcome!
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {user.email}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onLogout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Welcome; 