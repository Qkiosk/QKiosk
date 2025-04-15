import React, { useState, useEffect } from 'react';
import MenuList from '../components/MenuList';
import Cart from '../components/Cart';
import CategoryTab from '../components/CategoryTab';
import AlertPopup from '../components/AlertPopup';
import OptionsModal from '../components/OptionsModal';
import { MenuItem } from '../data/menuData';
import { CartItem } from '../types';
import { categories, menuData } from '../data/menuData';
import './KioskApp.css';

function KioskApp() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isCartVisible, setIsCartVisible] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 메뉴 섹션 클래스 계산
  const menuSectionClass = () => {
    const classes = ['menu-section'];
    if (isCartVisible && isMobile) {
      classes.push('cart-open');
    }
    if (cartItems.length > 0 && !isMobile) {
      classes.push('with-cart');
    }
    return classes.join(' ');
  };

  // 장바구니 섹션 클래스 계산
  const cartSectionClass = () => {
    const classes = ['cart-section'];
    if (isCartVisible) {
      classes.push('active');
    }
    if (cartItems.length > 0) {
      classes.push('has-items');
    }
    return classes.join(' ');
  };

  // 앱 컨텐츠 클래스 계산
  const appContentClass = () => {
    const classes = ['app-content'];
    if (cartItems.length > 0 && !isMobile) {
      classes.push('with-cart');
    }
    return classes.join(' ');
  };

  // 장바구니 토글 함수
  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  // 화면 크기에 따라 장바구니 가시성 자동 설정
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      if (!mobile) {
        // 데스크톱에서는 항상 보이게 설정
        setIsCartVisible(true);
      }
      // 모바일에서는 자동으로 장바구니 표시하지 않음
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 컴포넌트 마운트 시 호출

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 메뉴 아이템 클릭 시 옵션 모달 표시 이벤트 리스너
  useEffect(() => {
    const handleShowOptionsModal = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        setSelectedMenuItem(customEvent.detail);
      }
    };

    window.addEventListener('showOptionsModal', handleShowOptionsModal);
    
    return () => {
      window.removeEventListener('showOptionsModal', handleShowOptionsModal);
    };
  }, []);

  const handleMenuItemClick = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const handleCloseModal = () => {
    setSelectedMenuItem(null);
  };

  const handleAddToCart = (menuItem: MenuItem, selectedOptions: { name: string; price: number }[] = []) => {
    const cartItem: CartItem = {
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      image: menuItem.image || '',
      quantity: 1,
      selectedOptions: selectedOptions || []
    };
    
    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.id === cartItem.id && 
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
      );
      
      if (existingItem) {
        return prev.map(item => 
          item.id === cartItem.id && 
          JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, cartItem];
    });
    
    // 모바일에서는 상품 담을 때 자동으로 장바구니 표시하지 않음
    
    // 옵션 모달을 닫습니다
    setSelectedMenuItem(null);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      return;
    }

    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setCartItems([]);
    setShowAlert(true);
    
    // 모바일에서 장바구니를 자동으로 닫음
    if (window.innerWidth <= 768) {
      setIsCartVisible(false);
    }
  };

  const filteredMenuItems = selectedCategory === '전체' 
    ? menuData 
    : menuData.filter(item => item.category === selectedCategory);

  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="kiosk-app">
      <div className="category-section">
        <CategoryTab 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
      </div>

      <div className="kiosk-container">
        <main className={appContentClass()}>
          <div className={menuSectionClass()}>
            <MenuList 
              menuItems={filteredMenuItems} 
              onAddToCart={handleAddToCart}
            />
          </div>
          
          {!isMobile && (
            <div className={cartSectionClass()}>
              <Cart 
                items={cartItems} 
                onUpdateQuantity={handleUpdateQuantity} 
                onCheckout={handleCheckout} 
                onClose={() => setIsCartVisible(false)}
              />
            </div>
          )}
        </main>

        {/* 카트 오버레이 - 모바일에서만 표시 */}
        {isMobile && isCartVisible && (
          <div 
            className="cart-overlay active" 
            onClick={() => setIsCartVisible(false)}
          ></div>
        )}

        {/* 모바일에서는 main 외부에 장바구니를 배치 */}
        {isMobile && (
          <div className={cartSectionClass()}>
            <Cart 
              items={cartItems} 
              onUpdateQuantity={handleUpdateQuantity} 
              onCheckout={handleCheckout} 
              onClose={() => setIsCartVisible(false)}
            />
          </div>
        )}
      </div>

      <button 
        className="cart-toggle" 
        onClick={toggleCart}
        aria-label="장바구니 토글"
      >
        <span className="cart-icon">🛒</span>
        {totalItemCount > 0 && (
          <span className="cart-item-count">{totalItemCount}</span>
        )}
      </button>

      {selectedMenuItem && (
        <OptionsModal 
          item={selectedMenuItem} 
          onClose={handleCloseModal} 
          onConfirm={(selectedOptions) => handleAddToCart(selectedMenuItem, selectedOptions)}
        />
      )}

      {showAlert && (
        <AlertPopup
          message="주문이 완료되었습니다!"
          onClose={() => setShowAlert(false)}
          isVisible={showAlert}
        />
      )}
    </div>
  );
}

export default KioskApp; 