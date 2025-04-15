import React, { useState } from 'react';
import './OrderManagement.css';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  options?: string[];
}

interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'completed' | 'cancelled';
  totalAmount: number;
  orderTime: string;
}

const OrderManagement: React.FC = () => {
  // 임시 데이터
  const [orders] = useState<Order[]>([
    {
      id: 'ORD001',
      tableNumber: 5,
      items: [
        {
          id: '1',
          name: '아메리카노',
          quantity: 2,
          price: 4500,
          options: ['ICE', '샷 추가']
        },
        {
          id: '2',
          name: '치즈케이크',
          quantity: 1,
          price: 6500
        }
      ],
      status: 'pending',
      totalAmount: 15500,
      orderTime: '2024-03-15T10:30:00'
    },
    {
      id: 'ORD002',
      tableNumber: 3,
      items: [
        {
          id: '3',
          name: '카페라떼',
          quantity: 3,
          price: 5000
        }
      ],
      status: 'preparing',
      totalAmount: 15000,
      orderTime: '2024-03-15T10:25:00'
    }
  ]);

  const getStatusBadgeClass = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'preparing': return 'status-preparing';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return '대기중';
      case 'preparing': return '준비중';
      case 'completed': return '완료';
      case 'cancelled': return '취소됨';
      default: return '';
    }
  };

  return (
    <div className="order-management">
      <div className="page-header">
        <h1>주문 관리</h1>
        <div className="order-filters">
          <select className="status-filter">
            <option value="all">전체 주문</option>
            <option value="pending">대기중</option>
            <option value="preparing">준비중</option>
            <option value="completed">완료</option>
            <option value="cancelled">취소됨</option>
          </select>
        </div>
      </div>

      <div className="orders-grid">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <h3>주문 #{order.id}</h3>
                <span className="table-number">테이블 {order.tableNumber}</span>
              </div>
              <div className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                {getStatusText(order.status)}
              </div>
            </div>

            <div className="order-items">
              {order.items.map(item => (
                <div key={item.id} className="order-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    {item.options && item.options.length > 0 && (
                      <span className="item-options">
                        ({item.options.join(', ')})
                      </span>
                    )}
                  </div>
                  <div className="item-quantity">x{item.quantity}</div>
                  <div className="item-price">￦{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-total">
                <span>총 금액</span>
                <span className="total-amount">￦{order.totalAmount.toLocaleString()}</span>
              </div>
              <div className="order-time">
                주문시간: {new Date(order.orderTime).toLocaleTimeString()}
              </div>
              <div className="order-actions">
                {order.status === 'pending' && (
                  <button className="action-button prepare">준비 시작</button>
                )}
                {order.status === 'preparing' && (
                  <button className="action-button complete">준비 완료</button>
                )}
                {(order.status === 'pending' || order.status === 'preparing') && (
                  <button className="action-button cancel">주문 취소</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement; 