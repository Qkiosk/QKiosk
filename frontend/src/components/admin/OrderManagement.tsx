import React, { useState, useEffect } from 'react';
import { OrderStatus } from '../../types';
import './OrderManagement.css';

interface Order {
  id: number;
  orderNumber: string;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  userId: number;
  username: string;
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');

  useEffect(() => {
    // 실제 API 호출로 대체해야 함
    // 임시 데이터
    const mockOrders: Order[] = [
      {
        id: 1,
        orderNumber: 'ORD-001',
        items: [
          { id: 1, name: '불고기 버거', quantity: 2, price: 6500 },
          { id: 4, name: '감자튀김', quantity: 1, price: 3000 },
        ],
        totalAmount: 16000,
        status: 'preparing',
        createdAt: '2023-04-07T10:30:00',
        userId: 1,
        username: 'user1',
      },
      {
        id: 2,
        orderNumber: 'ORD-002',
        items: [
          { id: 2, name: '치즈 버거', quantity: 1, price: 5500 },
          { id: 6, name: '콜라', quantity: 1, price: 2000 },
        ],
        totalAmount: 7500,
        status: 'ready',
        createdAt: '2023-04-07T10:35:00',
        userId: 2,
        username: 'user2',
      },
    ];
    setOrders(mockOrders);
  }, []);

  const handleStatusChange = (orderId: number, newStatus: OrderStatus) => {
    // 실제 API 호출로 대체해야 함
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter((order) => order.status === filterStatus);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="order-management">
      <h1>주문 관리</h1>
      
      <div className="filter-section">
        <h2>주문 필터</h2>
        <div className="filter-buttons">
          <button
            className={`filter-button ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            전체
          </button>
          <button
            className={`filter-button ${filterStatus === 'preparing' ? 'active' : ''}`}
            onClick={() => setFilterStatus('preparing')}
          >
            준비 중
          </button>
          <button
            className={`filter-button ${filterStatus === 'ready' ? 'active' : ''}`}
            onClick={() => setFilterStatus('ready')}
          >
            준비 완료
          </button>
          <button
            className={`filter-button ${filterStatus === 'completed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('completed')}
          >
            완료
          </button>
        </div>
      </div>
      
      <div className="orders-list">
        <h2>주문 목록</h2>
        <div className="orders-grid">
          {filteredOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>주문 #{order.orderNumber}</h3>
                <span className={`status-badge ${order.status}`}>
                  {order.status === 'preparing' && '준비 중'}
                  {order.status === 'ready' && '준비 완료'}
                  {order.status === 'completed' && '완료'}
                </span>
              </div>
              
              <div className="order-info">
                <p>주문자: {order.username}</p>
                <p>주문 시간: {formatDate(order.createdAt)}</p>
                <p>총 금액: {order.totalAmount.toLocaleString()}원</p>
              </div>
              
              <div className="order-items">
                <h4>주문 항목</h4>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.name} x {item.quantity} ({item.price.toLocaleString()}원)
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="order-actions">
                {order.status === 'preparing' && (
                  <button
                    onClick={() => handleStatusChange(order.id, 'ready')}
                    className="status-button ready"
                  >
                    준비 완료
                  </button>
                )}
                {order.status === 'ready' && (
                  <button
                    onClick={() => handleStatusChange(order.id, 'completed')}
                    className="status-button complete"
                  >
                    완료
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement; 