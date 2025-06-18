import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  ArrowBack as BackIcon
} from '@mui/icons-material';

const Billing = () => {
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState(
    localStorage.getItem('whatsappNumber') || ''
  );

  // Load bills from localStorage
  useEffect(() => {
    const savedBills = JSON.parse(localStorage.getItem('bills') || '[]');
    setBills(savedBills);
  }, []);

  const handleCreate = () => {
    navigate('/dashboard/billing/create');
  };

  const handleEdit = (billId) => {
    navigate(`/dashboard/billing/edit/${billId}`);
  };

  const handleView = (billId) => {
    navigate(`/dashboard/billing/view/${billId}`);
  };

  const handleDelete = (billId) => {
    const updatedBills = bills.filter(bill => bill.id !== billId);
    localStorage.setItem('bills', JSON.stringify(updatedBills));
    setBills(updatedBills);
    setDeleteAlert(true);
    
    setTimeout(() => {
      setDeleteAlert(false);
    }, 3000);
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<BackIcon />}
            onClick={() => navigate('/dashboard')}
            variant="outlined"
          >
            Back to Dashboard
          </Button>
          <Typography variant="h4">Billing Management</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<SettingsIcon />}
            onClick={handleSettingsOpen}
          >
            Settings
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreate}
          >
            Create New Bill
          </Button>
        </Box>
      </Box>

      {deleteAlert && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Bill deleted successfully!
        </Alert>
      )}

      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Order Number</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bills.length > 0 ? (
                bills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell>{new Date(bill.date).toLocaleDateString()}</TableCell>
                    <TableCell>{bill.orderNumber}</TableCell>
                    <TableCell>{bill.customer}</TableCell>
                    <TableCell>{bill.product}</TableCell>
                    <TableCell>{bill.quantity}</TableCell>
                    <TableCell>{bill.rate}</TableCell>
                    <TableCell align="right">
                      <IconButton 
                        aria-label="view" 
                        color="primary"
                        onClick={() => handleView(bill.id)}
                      >
                        <ViewIcon />
                      </IconButton>
                      <IconButton 
                        aria-label="edit" 
                        color="primary"
                        onClick={() => handleEdit(bill.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        aria-label="delete" 
                        color="error"
                        onClick={() => handleDelete(bill.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="body1" sx={{ py: 3 }}>
                      No bills found. Create a new bill to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

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
    </Container>
  );
};

export default Billing; 