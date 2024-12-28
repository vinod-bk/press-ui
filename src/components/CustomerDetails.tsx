import React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DynamicForm from './DynamicForm';
import customerData from "../data/customerData.json";

const CustomerDetails: React.FC = () => {
  return (
    <Box>
      <Paper sx={{ padding: 2 }}>
        <DynamicForm formData={customerData} />
      </Paper>
    </Box>
  );
};

export default CustomerDetails;