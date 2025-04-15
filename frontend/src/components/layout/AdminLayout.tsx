import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import './AdminLayout.css';

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      <Header />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout; 