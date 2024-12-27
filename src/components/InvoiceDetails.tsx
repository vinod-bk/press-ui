import React from "react";
import Box from "@mui/material/Box";
import DynamicForm from "./DynamicForm";
import Paper from "@mui/material/Paper";
import invoiceData from '../data/invoiceData.json';

const InvoiceDetails: React.FC = () => {
  return (
    <Box>
      <h1>Invoice Details</h1>
      <Paper sx={{ padding: 2 }}>
        <DynamicForm formData={invoiceData} />
      </Paper>
    </Box>
  );
};

export default InvoiceDetails;