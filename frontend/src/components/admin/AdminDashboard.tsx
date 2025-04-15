import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });

  useEffect(() => {
    // 실제 API 호출로 대체해야 함
    // 임시 데이터
    setStats({
      totalOrders: 150,
      totalRevenue: 2500000,
      pendingOrders: 12,
      completedOrders: 138,
    });
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>관리자 대시보드</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>총 주문</h3>
          <p className="stat-value">{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>총 매출</h3>
          <p className="stat-value">{stats.totalRevenue.toLocaleString()}원</p>
        </div>
        <div className="stat-card">
          <h3>대기 주문</h3>
          <p className="stat-value">{stats.pendingOrders}</p>
        </div>
        <div className="stat-card">
          <h3>완료 주문</h3>
          <p className="stat-value">{stats.completedOrders}</p>
        </div>
      </div>
      
      <div className="admin-actions">
        <Link to="/admin/menu" className="admin-action-card">
          <h3>메뉴 관리</h3>
          <p>메뉴 추가, 수정, 삭제</p>
        </Link>
        <Link to="/admin/orders" className="admin-action-card">
          <h3>주문 관리</h3>
          <p>주문 상태 관리 및 처리</p>
        </Link>
        <Link to="/admin/users" className="admin-action-card">
          <h3>사용자 관리</h3>
          <p>사용자 정보 관리</p>
        </Link>
        <Link to="/admin/billing" className="admin-action-card">
          <h3>결제 관리</h3>
          <p>결제 내역 및 환불 처리</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard; 