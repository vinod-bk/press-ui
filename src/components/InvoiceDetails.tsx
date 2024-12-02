import React from 'react';
import DynamicForm from './DynamicForm';
import invoiceData from '../data/invoiceData.json';

const InvoiceDetails: React.FC = () => (
  <div>
    <h2>Invoice Details</h2>
    <DynamicForm formData={invoiceData} />
  </div>
);

export default InvoiceDetails;