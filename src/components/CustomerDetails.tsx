import React from 'react';
import DynamicForm from './DynamicForm';
import customerData from '../data/customerData.json';

const CustomerDetails: React.FC = () => (
  <div>
    <h2>Customer Details</h2>
    <DynamicForm formData={customerData} />
  </div>
);

export default CustomerDetails;