import React from 'react';
import DynamicForm from './DynamicForm';
import customerData from '../data/customerData.json';

const CustomerDetails: React.FC = () => {
  return (
    <div>
      <h2>Customer Details</h2>
      <div className="card">
        <div className="card-body">
          <DynamicForm formData={customerData} />
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;