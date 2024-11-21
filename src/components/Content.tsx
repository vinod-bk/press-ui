import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomerDetails from './CustomerDetails';
import OrderDetails from './OrderDetails';
import InvoiceDetails from './InvoiceDetails';
import DeliveryDetails from './DeliveryDetails';

const Content: React.FC = () => (
  <div className="content">
    <Routes>
      <Route path="/customers" element={<CustomerDetails />} />
      <Route path="/orders" element={<OrderDetails />} />
      <Route path="/invoices" element={<InvoiceDetails />} />
      <Route path="/deliveries" element={<DeliveryDetails />} />
    </Routes>
  </div>
);

export default Content;