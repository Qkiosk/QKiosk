import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';
import './AdminPage.css';

interface Order {
  id: string;
  items: {
    id: number;
    name: string;
    quantity: number;
    options: { name: string; price: number }[];
  }[];
  totalAmount: number;
  orderDate: Date;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'menu'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleMenuItemEdit = (itemId: number, updates: Partial<MenuItem>) => {
    setMenuItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      )
    );
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>관리자 페이지</h1>
        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            주문 관리
          </button>
          <button
            className={`tab-button ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            메뉴 관리
          </button>
        </div>
      </div>

      <div className="admin-content">
        {activeTab === 'orders' ? (
          <div className="orders-section">
            <h2>주문 목록</h2>
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-header">
                    <span className="order-id">주문번호: {order.id}</span>
                    <span className="order-date">
                      {new Date(order.orderDate).toLocaleString()}
                    </span>
                  </div>
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-menu-item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">x{item.quantity}</span>
                        {item.options.length > 0 && (
                          <div className="item-options">
                            {item.options.map((opt, i) => (
                              <span key={i} className="option-tag">
                                {opt.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="order-footer">
                    <span className="order-total">
                      총 금액: {order.totalAmount.toLocaleString()}원
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                      className={`status-select status-${order.status}`}
                    >
                      <option value="pending">대기중</option>
                      <option value="processing">처리중</option>
                      <option value="completed">완료</option>
                      <option value="cancelled">취소됨</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="menu-section">
            <h2>메뉴 관리</h2>
            <button className="add-menu-button">
              새 메뉴 추가
            </button>
            <div className="menu-list">
              {menuItems.map(item => (
                <div key={item.id} className="menu-item-card">
                  <img src={item.image} alt={item.name} className="menu-image" />
                  <div className="menu-details">
                    <h3>{item.name}</h3>
                    <p className="menu-description">{item.description}</p>
                    <div className="menu-price">{item.price.toLocaleString()}원</div>
                    <div className="menu-actions">
                      <button className="edit-button">수정</button>
                      <button className="delete-button">삭제</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage; 