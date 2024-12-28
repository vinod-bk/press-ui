import React from "react";
import Box from "@mui/material/Box";
import DynamicForm from "./DynamicForm";
import Paper from "@mui/material/Paper";
import deliveryData from '../data/deliveryData.json';

const DeliveryDetails: React.FC = () => {
  return (
    <Box>
      <Paper sx={{ padding: 2 }}>
        <DynamicForm formData={deliveryData} />
      </Paper>
    </Box>
  );
};

export default DeliveryDetails;