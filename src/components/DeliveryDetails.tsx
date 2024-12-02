import React from 'react';
import DynamicForm from './DynamicForm';
import deliveryData from '../data/deliveryData.json';

const DeliveryDetails: React.FC = () => (
  <div>
    <h2>Delivery Details</h2>
    <DynamicForm formData={deliveryData} />
  </div>
);

export default DeliveryDetails;