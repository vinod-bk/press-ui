import React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DynamicForm from './DynamicForm';

const PendingTasksWidget: React.FC = () => {
  const formData = {
    formFields: [
      {
        type: 'list',
        name: 'pendingTasks',
        fields: [
          { type: 'text', label: 'Pending Task', name: 'task', readOnly: true },
          { type: 'date', label: 'Due Date', name: 'dueDate', readOnly: true },
        ],
      },
    ],
  };

  const initialFormState = {
    pendingTasks: [
      { task: 'Review documents', dueDate: '2023-10-15' },
      { task: 'Approve budget', dueDate: '2023-10-20' },
      { task: 'Schedule meeting', dueDate: '2023-10-25' },
      { task: 'Update project plan', dueDate: '2023-10-30' },
    ],
  };

  return (
    <Box>
      <h2>Pending Actions</h2>
      <Paper sx={{ padding: 2 }}>
      <DynamicForm formData={formData} initialFormState={initialFormState} displayOnly={true} />
      </Paper>
    </Box>
  );
};

export default PendingTasksWidget;
