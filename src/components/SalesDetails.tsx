import React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DynamicForm from './DynamicForm';
import salesData from '../data/salesData.json';

const SalesDetails: React.FC = () => {
  return (
    <Box>
      <h1>Sales Details</h1>
      <Paper sx={{ padding: 2 }}>
        <DynamicForm formData={salesData} />
      </Paper>
    </Box>
  );
};

export default SalesDetails;