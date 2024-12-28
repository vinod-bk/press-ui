import React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DynamicForm from './DynamicForm';
import salesData from '../data/salesData.json';

const SalesDetails: React.FC = () => {
  return (
    <Box>
      <Paper sx={{ padding: 2 }}>
        <DynamicForm formData={salesData} />
      </Paper>
    </Box>
  );
};

export default SalesDetails;