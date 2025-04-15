import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import KioskApp from '../pages/KioskApp';
import AdminLayout from '../components/layout/AdminLayout';
import StoreManagement from '../pages/admin/StoreManagement';
import MenuManagement from '../pages/admin/MenuManagement';
import OrderManagement from '../pages/admin/OrderManagement';
import EmployeeManagement from '../pages/admin/EmployeeManagement';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 키오스크 앱 라우트 */}
        <Route path="/" element={<KioskApp />} />
        <Route path="/kiosk" element={<KioskApp />} />
        
        {/* 관리자 라우트 */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="store" element={<StoreManagement />} />
          <Route path="menu" element={<MenuManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="employees" element={<EmployeeManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router; 