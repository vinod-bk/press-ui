import React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PendingTasksWidget from './PendingTasksWidget';

const Dashboard: React.FC = () => {
  return (
    <Box>
      <PendingTasksWidget />
    </Box>
  );
};

export default Dashboard;
