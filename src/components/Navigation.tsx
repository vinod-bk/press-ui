import DashboardIcon from '@mui/icons-material/Dashboard';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SellIcon from '@mui/icons-material/Sell';
import { type Navigation } from '@toolpad/core/AppProvider';

const NAVIGATION: Navigation = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'customers',
    title: 'Customers',
    icon: <AddBusinessIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <AddShoppingCartIcon />,
  },
  {
    segment: 'invoices',
    title: 'Invoices',
    icon: <ReceiptIcon />,
  },
  {
    segment: 'deliveries',
    title: 'Deliveries',
    icon: <LocalShippingIcon />,
  },  
  {
    segment: 'sales',
    title: 'Sales',
    icon: <SellIcon />,
  }
];

export default NAVIGATION;
