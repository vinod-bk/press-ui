import React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PendingTasksWidget from './PendingTasksWidget';

const Dashboard: React.FC = () => {
  return (
    <Box>
      <h1>Dashboard</h1>
      <PendingTasksWidget />
    </Box>
  );
};

export default Dashboard;
