import React from 'react';

export interface MenuItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  onAddToCart: (id: number) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ id, name, price, image, onAddToCart }) => {
  return (
    <div className="menu-item">
      <img src={image} alt={name} className="menu-item-image" />
      <div className="menu-item-info">
        <h3>{name}</h3>
        <p className="price">{price.toLocaleString()}원</p>
        <button onClick={() => onAddToCart(id)}>주문 추가</button>
      </div>
    </div>
  );
};

export default MenuItem; 