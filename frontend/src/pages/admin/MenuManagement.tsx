import React, { useState } from 'react';
import './MenuManagement.css';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  isAvailable: boolean;
}

const MenuManagement: React.FC = () => {
  // 임시 데이터
  const [menuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: '아메리카노',
      price: 4500,
      category: '커피',
      description: '깊고 진한 에스프레소의 맛',
      image: '/images/americano.jpg',
      isAvailable: true
    },
    {
      id: '2',
      name: '카페라떼',
      price: 5000,
      category: '커피',
      description: '부드러운 우유와 에스프레소의 조화',
      image: '/images/latte.jpg',
      isAvailable: true
    },
    {
      id: '3',
      name: '치즈케이크',
      price: 6500,
      category: '디저트',
      description: '부드럽고 진한 치즈의 맛',
      image: '/images/cheesecake.jpg',
      isAvailable: true
    }
  ]);

  return (
    <div className="menu-management">
      <div className="page-header">
        <h1>메뉴 관리</h1>
        <button className="primary-button">새 메뉴 추가</button>
      </div>

      <div className="menu-grid">
        {menuItems.map(item => (
          <div key={item.id} className="menu-card">
            <div className="menu-image">
              <img src={item.image} alt={item.name} />
              <div className={`availability-badge ${item.isAvailable ? 'available' : 'unavailable'}`}>
                {item.isAvailable ? '판매중' : '품절'}
              </div>
            </div>
            <div className="menu-content">
              <div className="menu-header">
                <h3>{item.name}</h3>
                <span className="category-tag">{item.category}</span>
              </div>
              <p className="description">{item.description}</p>
              <div className="price">￦{item.price.toLocaleString()}</div>
              <div className="menu-actions">
                <button className="edit-button">수정</button>
                <button className="toggle-button">
                  {item.isAvailable ? '품절 처리' : '판매 시작'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement; 