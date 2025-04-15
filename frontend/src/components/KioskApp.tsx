import React, { useState } from 'react';
import MenuList from './MenuList';
import Cart from './Cart';
import CategoryTab from './CategoryTab';
import OrderComplete from './OrderComplete';
import menuData from '../data/menuData';
import { CartItem, MenuItem } from '../types';
import './KioskApp.css';

const KioskApp: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [orderNumber, setOrderNumber] = useState<number>(0);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  // 카테고리 목록 생성 (중복 제거)
  const categories = ['전체', ...Array.from(new Set(menuData.map((item) => item.category)))];

  // 현재 카테고리에 맞는 메뉴만 필터링
  const filteredMenuItems = selectedCategory === '전체'
    ? menuData
    : menuData.filter((item) => item.category === selectedCategory);

  // 장바구니에 아이템 추가
  const handleAddToCart = (id: number) => {
    const menuItem = menuData.find((item) => item.id === id);
    if (!menuItem) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { id, name: menuItem.name, price: menuItem.price, quantity: 1 }];
      }
    });
  };

  // 장바구니 아이템 수량 업데이트
  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  // 주문 처리
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    // 랜덤 주문번호 생성 (10 ~ 99)
    const newOrderNumber = Math.floor(Math.random() * 90) + 10;
    setOrderNumber(newOrderNumber);
    setOrderComplete(true);
    setCartItems([]);
  };

  // 새 주문 시작
  const handleNewOrder = () => {
    setOrderComplete(false);
  };

  return (
    <div className="kiosk-app">
      <header className="kiosk-header">
        <h1>푸드코트 키오스크</h1>
      </header>

      {orderComplete ? (
        <OrderComplete orderNumber={orderNumber} onNewOrder={handleNewOrder} />
      ) : (
        <div className="kiosk-content">
          <div className="menu-section">
            <CategoryTab
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <MenuList items={filteredMenuItems} onAddToCart={handleAddToCart} />
          </div>
          <div className="cart-section">
            <Cart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default KioskApp; 