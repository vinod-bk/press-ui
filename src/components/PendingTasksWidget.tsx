import React from 'react';
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
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Pending Actions</h3>
        <DynamicForm formData={formData} initialFormState={initialFormState} displayOnly={true} />
      </div>
    </div>
  );
};

export default PendingTasksWidget;
