import React from 'react';
import DynamicForm from './DynamicForm';
import orderData from '../data/orderData.json';

const OrderDetails: React.FC = () => (
  <div>
    <h2>Order Details</h2>
    <DynamicForm formData={orderData} />
  </div>
);

export default OrderDetails;