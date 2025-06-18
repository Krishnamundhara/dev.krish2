import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  ExitToApp as LogoutIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState(
    localStorage.getItem('whatsappNumber') || ''
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalBills: 0,
    totalAmount: 0,
    recentBills: []
  });

  useEffect(() => {
    // Check authentication on component mount
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    try {
      // Load bills from localStorage
      const savedBills = JSON.parse(localStorage.getItem('bills') || '[]');
      
      // Calculate statistics
      const totalAmount = savedBills.reduce((sum, bill) => sum + (bill.amount || 0), 0);
      const recentBills = savedBills
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

      setStats({
        totalBills: savedBills.length,
        totalAmount,
        recentBills
      });
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    try {
      // Clear all authentication-related data
      localStorage.removeItem('isAuthenticated');
      
      // Optional: Clear other stored data if needed
      // localStorage.clear(); // Uncomment this if you want to clear all localStorage data
      
      // Force navigation to login page
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Error during logout:', err);
      setError('Error during logout');
    }
  };

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  const handleWhatsappNumberSave = () => {
    localStorage.setItem('whatsappNumber', whatsappNumber);
    setSettingsOpen(false);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button 
            color="inherit" 
            onClick={handleSettingsOpen} 
            startIcon={<SettingsIcon />}
            sx={{ mr: 2 }}
          >
            Settings
          </Button>
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography variant="h4" gutterBottom>
                Welcome to the Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                More features will be added here as requested.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              sx={{ mt: 2 }}
              onClick={() => navigate('/dashboard/billing')}
            >
              Go to Billing
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onClose={handleSettingsClose}>
        <DialogTitle>Application Settings</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="WhatsApp Number for Sharing"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              helperText="Enter number with country code (e.g. 911234567890)"
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSettingsClose}>Cancel</Button>
          <Button variant="contained" onClick={handleWhatsappNumberSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard; 