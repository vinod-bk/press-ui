import React from 'react';
import PendingTasksWidget from './PendingTasksWidget';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <PendingTasksWidget />
    </div>
  );
};

export default Dashboard;
