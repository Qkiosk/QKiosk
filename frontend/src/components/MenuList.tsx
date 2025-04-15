import React from 'react';
import { MenuItem } from '../data/menuData';
import './MenuList.css';

interface MenuListProps {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem, selectedOptions: { name: string; price: number }[]) => void;
}

const MenuList: React.FC<MenuListProps> = ({ menuItems, onAddToCart }) => {
  const formatCalories = (calories: number | undefined) => {
    if (calories === undefined) return null;
    if (calories === 0) return '칼로리 없음';
    return `${calories}kcal`;
  };

  const handleItemClick = (item: MenuItem) => {
    // 옵션이 있는 경우 onAddToCart 바로 호출하지 않고 KioskApp의 handleMenuItemClick에서 처리합니다
    if (item.options && item.options.length > 0) {
      // 모달이 표시되도록 KioskApp에서 처리됩니다
    } else {
      // 옵션이 없는 경우 바로 장바구니에 추가합니다
      onAddToCart(item, []);
    }
  };

  return (
    <div className="menu-list-component">
      <div className="menu-list-container">
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className="menu-item"
              onClick={() => {
                if (item.options && item.options.length > 0) {
                  // 클릭 시 모달 표시를 위해 selectedMenuItem 상태 업데이트
                  const event = new CustomEvent('showOptionsModal', { detail: item });
                  window.dispatchEvent(event);
                } else {
                  // 옵션이 없는 경우 바로 장바구니에 추가
                  onAddToCart(item, []);
                }
              }}
            >
              <div className="menu-item-image-container">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="menu-item-image" 
                  loading="lazy"
                />
                {item.isPopular && <div className="popular-badge badge badge-popular">인기</div>}
                {item.isNew && <div className="new-badge badge badge-new">NEW</div>}
              </div>
              <div className="menu-item-content">
                <div className="menu-item-header">
                  <h3 className="menu-item-name">{item.name}</h3>
                  <div className="info-tags">
                    {item.calories !== undefined && (
                      <span className="calorie-tag">{formatCalories(item.calories)}</span>
                    )}
                  </div>
                </div>
                <p className="menu-item-description">{item.description}</p>
                <div className="price-container">
                  <div className="price">{item.price.toLocaleString()}원</div>
                  {item.options && item.options.length > 0 && (
                    <div className="options-container">
                      {item.options.slice(0, 2).map((option) => (
                        <span key={option.name} className="options-tag">
                          {option.name}
                        </span>
                      ))}
                      {item.options.length > 2 && (
                        <span className="options-tag">+{item.options.length - 2}개 더보기</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuList;