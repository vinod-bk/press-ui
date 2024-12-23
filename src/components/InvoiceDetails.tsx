import React from 'react';
import DynamicForm from './DynamicForm';
import invoiceData from '../data/invoiceData.json';

const InvoiceDetails: React.FC = () => (
  <div>
    <h2>Invoice Details</h2>
    <div className="card">
      <div className="card-body">
        <DynamicForm formData={invoiceData} />
      </div>
    </div>
  </div>
);

export default InvoiceDetails;