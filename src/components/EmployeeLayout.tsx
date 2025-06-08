import React, { useState } from 'react';
import { Drawer } from 'antd';
import { MenuOutlined, BellOutlined } from '@ant-design/icons';
import { useLocation, NavLink } from 'react-router-dom';

const navLinks = [
  { label: 'Profile', path: '/profile' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Table Map', path: '/table-map' },
  { label: 'Kitchen Screen', path: '/kitchen-screen' },
  { label: 'Biller Screen', path: '/biller-screen' },
  { label: 'Order History', path: '/order-history' },
  { label: 'Menu', path: '/menu' },
  { label: 'Employees', path: '/employees' },
  { label: 'Billing & Refund', path: '/billing-refund' },
  { label: 'Customer History', path: '/customer-history' },
  { label: 'Waiting Customers', path: '/waiting-customers' },
];

interface EmployeeLayoutProps {
  children: React.ReactNode;
}

const EmployeeLayout: React.FC<EmployeeLayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow flex items-center justify-between px-4 z-50">
        <button onClick={() => setDrawerOpen(true)} className="text-2xl text-gray-700 focus:outline-none">
          <MenuOutlined />
        </button>
        <span className="font-semibold text-lg">Profile</span>
        <BellOutlined className="text-2xl text-purple-500" />
      </header>

      {/* Drawer */}
      <Drawer
        placement="left"
        closable={false}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        bodyStyle={{ padding: 0 }}
        width={260}
      >
        {/* Logo/Header */}
        <div className="flex items-center justify-center h-16 bg-white border-b border-gray-100 mb-2">
          <span className="text-2xl font-bold text-purple-600 tracking-wide">Galaxyo<span className="text-yellow-500">POS</span></span>
        </div>
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              className={({ isActive }) =>
                `px-6 py-3 text-base border-b border-gray-100 transition rounded-none text-left ` +
                (location.pathname === link.path || isActive
                  ? 'bg-purple-50 text-purple-600 font-semibold'
                  : 'text-gray-800 hover:bg-gray-100')
              }
              onClick={() => setDrawerOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </Drawer>

      {/* Main content, padded down for header */}
      <main className="pt-20 px-2 pb-4 max-w-md mx-auto">
        {children}
      </main>
    </div>
  );
};

export default EmployeeLayout;
