import React from 'react';
import DynamicForm from './DynamicForm';
import salesData from '../data/salesData.json';

const SalesDetails: React.FC = () => (
  <div>
    <h2>Sales Details</h2>
    <div className="card">
      <div className="card-body">
        <DynamicForm formData={salesData} />
      </div>
    </div>
  </div>
);

export default SalesDetails;