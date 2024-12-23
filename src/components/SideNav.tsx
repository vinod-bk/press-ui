import React from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css'; // Import the CSS file

interface SideNavProps {
  isOpen: boolean;
  toggleNav: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ isOpen, toggleNav }) => (
  <nav className={`sidenav ${isOpen ? 'open' : ''}`}>
    <ul>
      <li><Link to="/dashboard" onClick={toggleNav}>Dashboard</Link></li>
      <li><Link to="/customers" onClick={toggleNav}>Customer Details</Link></li>
      <li><Link to="/orders" onClick={toggleNav}>Order Details</Link></li>
      <li><Link to="/invoices" onClick={toggleNav}>Invoice Details</Link></li>
      <li><Link to="/deliveries" onClick={toggleNav}>Delivery Details</Link></li>
      <li><Link to="/sales" onClick={toggleNav}>Sales Details</Link></li>
    </ul>
  </nav>
);

export default SideNav;