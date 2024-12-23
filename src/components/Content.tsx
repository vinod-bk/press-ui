import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomerDetails from './CustomerDetails';
import OrderDetails from './OrderDetails';
import InvoiceDetails from './InvoiceDetails';
import DeliveryDetails from './DeliveryDetails';
import SalesDetails from './SalesDetails';
import Dashboard from './Dashboard';

const Content: React.FC = () => (
  <div className="content">
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/customers" element={<CustomerDetails />} />
      <Route path="/orders" element={<OrderDetails />} />
      <Route path="/invoices" element={<InvoiceDetails />} />
      <Route path="/deliveries" element={<DeliveryDetails />} />
      <Route path="/sales" element={<SalesDetails />} />
    </Routes>
  </div>
);

export default Content;