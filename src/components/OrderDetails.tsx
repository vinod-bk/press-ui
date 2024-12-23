import React from 'react';
import DynamicForm from './DynamicForm';
import orderData from '../data/orderData.json';

const OrderDetails: React.FC = () => (
  <div>
    <h2>Order Details</h2>
    <div className="card">
      <div className="card-body">
        <DynamicForm formData={orderData} />
      </div>
    </div>
  </div>
);

export default OrderDetails;