import React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DynamicForm from './DynamicForm';
import orderData from '../data/orderData.json';

const OrderDetails: React.FC = () => {
  return (
    <Box>
      <h1>Order Details</h1>
      <Paper sx={{ padding: 2 }}>
        <DynamicForm formData={orderData} />
      </Paper>
    </Box>
  );
};

export default OrderDetails;