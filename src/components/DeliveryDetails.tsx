import React from 'react';
import DynamicForm from './DynamicForm';
import deliveryData from '../data/deliveryData.json';

const DeliveryDetails: React.FC = () => {
  return (
    <div>
      <h2>Delivery Details</h2>
      <div className="card">
        <div className="card-body">
          <DynamicForm formData={deliveryData} />
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;