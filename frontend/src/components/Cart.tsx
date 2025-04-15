import React from 'react';
import { CartItem } from '../types';
import './Cart.css';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onCheckout: () => void;
  onClose?: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onCheckout, onClose }) => {
  const totalAmount = items.reduce((sum, item) => {
    const optionsTotal = item.selectedOptions?.reduce((acc, opt) => acc + opt.price, 0) ?? 0;
    return sum + (item.price + optionsTotal) * item.quantity;
  }, 0);

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>장바구니</h2>
        {onClose && (
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        )}
      </div>
      
      {items.length === 0 ? (
        <div className="cart-empty">
          <p>장바구니가 비어있습니다</p>
        </div>
      ) : (
        <div className="cart-items">
          {items.map((item) => (
            <div key={`${item.id}-${JSON.stringify(item.selectedOptions)}`} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                {item.selectedOptions && item.selectedOptions.length > 0 && (
                  <div className="cart-item-options">
                    {item.selectedOptions.map((option, index) => (
                      <span key={option.name} className="option-tag">
                        {option.name}
                        {index < item.selectedOptions!.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                )}
                <div className="cart-item-price">
                  {((item.price + (item.selectedOptions?.reduce((acc, opt) => acc + opt.price, 0) ?? 0)) * item.quantity).toLocaleString()}원
                </div>
              </div>
              <div className="cart-item-quantity">
                <button 
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="quantity-button"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="quantity-button"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="cart-footer">
        <div className="cart-total">
          <span>총 주문금액</span>
          <span className="total-price">{totalAmount.toLocaleString()}원</span>
        </div>
        <button 
          className="checkout-button" 
          disabled={items.length === 0}
          onClick={onCheckout}
        >
          주문하기
        </button>
      </div>
    </div>
  );
};

export default Cart; 