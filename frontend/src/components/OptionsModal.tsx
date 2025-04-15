import React, { useState, useEffect } from 'react';
import { MenuItem } from '../data/menuData';
import './OptionsModal.css';

interface OptionsModalProps {
  item: MenuItem;
  onClose: () => void;
  onConfirm: (selectedOptions: { name: string; price: number; }[]) => void;
}

const OptionsModal: React.FC<OptionsModalProps> = ({ item, onClose, onConfirm }) => {
  const [selectedOptions, setSelectedOptions] = useState<{ name: string; price: number; }[]>([]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleOptionToggle = (option: { name: string; price: number; }) => {
    setSelectedOptions(prev => {
      const exists = prev.find(opt => opt.name === option.name);
      if (exists) {
        return prev.filter(opt => opt.name !== option.name);
      }
      return [...prev, option];
    });
  };

  const handleConfirm = () => {
    onConfirm(selectedOptions);
  };

  const totalPrice = item.price + selectedOptions.reduce((sum, opt) => sum + opt.price, 0);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="options-modal"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>{item.name} 옵션 선택</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          <div className="menu-item-preview">
            <div className="preview-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="preview-details">
              <h4>{item.name}</h4>
              <div className="preview-price">{item.price.toLocaleString()}원</div>
              <p className="preview-description">{item.description}</p>
            </div>
          </div>

          {item.calories !== undefined && (
            <div className="options-section">
              <h4>영양 정보</h4>
              <div className="calorie-info">{item.calories}kcal</div>
              {item.allergyInfo && item.allergyInfo.length > 0 && (
                <div className="allergy-info">
                  <span>알레르기 정보: </span>
                  {item.allergyInfo.join(', ')}
                </div>
              )}
            </div>
          )}

          {item.options && item.options.length > 0 && (
            <div className="options-section">
              <h4>옵션 선택</h4>
              <div className="option-list">
                {item.options.map((option) => (
                  <div
                    key={option.name}
                    className="option-item"
                    onClick={() => handleOptionToggle(option)}
                  >
                    <div className="option-info">
                      <div className={`option-checkbox ${selectedOptions.some(opt => opt.name === option.name) ? 'checked' : ''}`}>
                        {selectedOptions.some(opt => opt.name === option.name) && '✓'}
                      </div>
                      <span className="option-name">{option.name}</span>
                    </div>
                    {option.price > 0 && (
                      <span className="option-price">+{option.price.toLocaleString()}원</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <div className="total-price">
            <span className="total-price-label">총 금액</span>
            <span className="total-price-value">{totalPrice.toLocaleString()}원</span>
          </div>
          <button className="add-to-cart-button" onClick={handleConfirm}>
            장바구니에 담기
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionsModal; 