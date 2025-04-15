import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="admin-header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="logo">
            KIOSK Admin
          </Link>
          <nav className="main-nav">
            <Link to="/admin/store" className="nav-link">스토어 관리</Link>
            <Link to="/admin/menu" className="nav-link">메뉴 관리</Link>
            <Link to="/admin/orders" className="nav-link">주문 관리</Link>
            <Link to="/admin/employees" className="nav-link">직원 관리</Link>
          </nav>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span className="user-name">관리자</span>
            <button className="logout-button">로그아웃</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 