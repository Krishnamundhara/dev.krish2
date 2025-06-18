// This file handles input operations performed by user while creating new purchase order



import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  TextareaAutosize,
  Divider,
  Alert
} from '@mui/material';
import { ArrowBack as BackIcon, Save as SaveIcon } from '@mui/icons-material';

const BillingForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    orderNumber: '',
    customer: '',
    broker: '',
    mill: '',
    product: '',
    // quantity: '',
    rate: '',
    weight: '',
    bags: '',
    termsAndConditions: ''
  });

  useEffect(() => {
    // If we're in edit mode, load the bill data
    if (isEditMode) {
      const savedBills = JSON.parse(localStorage.getItem('bills') || '[]');
      const billToEdit = savedBills.find(bill => bill.id === id);
      
      if (billToEdit) {
        // Remove quality field from loaded data
        const { quality, customQuality, ...restData } = billToEdit;
        setFormData(restData);
      } else {
        navigate('/dashboard/billing');
      }
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const savedBills = JSON.parse(localStorage.getItem('bills') || '[]');
    
    if (isEditMode) {
      // Update existing bill
      const updatedBills = savedBills.map(bill => 
        bill.id === id ? { ...formData, id } : bill
      );
      localStorage.setItem('bills', JSON.stringify(updatedBills));
    } else {
      // Create new bill
      const newBill = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('bills', JSON.stringify([...savedBills, newBill]));
    }
    
    setSaved(true);
    setTimeout(() => {
      navigate('/dashboard/billing');
    }, 1500);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button 
            startIcon={<BackIcon />} 
            onClick={() => navigate('/dashboard/billing')}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
          <Typography variant="h5">
            {isEditMode ? 'Edit Bill' : 'Create New Bill'}
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        {saved && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Bill {isEditMode ? 'updated' : 'created'} successfully! Redirecting...
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Order Number"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="PARTY NAME"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="BROKER"
                name="broker"
                value={formData.broker}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="MILL"
                name="mill"
                value={formData.mill}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="WEIGHT"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="BAGS"
                name="bags"
                type="number"
                value={formData.bags}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
              />
            </Grid>
            
            {/* <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </Grid> */}
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Rate"
                name="rate"
                type="number"
                value={formData.rate}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Terms and Conditions
              </Typography>
              <TextareaAutosize
                name="termsAndConditions"
                value={formData.termsAndConditions}
                onChange={handleChange}
                minRows={4}
                placeholder="Enter terms and conditions here..."
                style={{ 
                  width: '100%', 
                  padding: '8px',
                  borderRadius: '4px',
                  borderColor: '#ccc' 
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  size="large"
                >
                  {isEditMode ? 'Update' : 'Save'} Bill
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default BillingForm; 