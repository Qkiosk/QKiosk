import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';
import { motion, AnimatePresence } from 'framer-motion';
import './MenuDetailModal.css';

interface MenuDetailModalProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (item: MenuItem, selectedOptions: { name: string; price: number }[]) => void;
}

const MenuDetailModal: React.FC<MenuDetailModalProps> = ({ item, onClose, onAddToCart }) => {
  const [selectedOptions, setSelectedOptions] = useState<{ name: string; price: number }[]>([]);

  const handleOptionToggle = (option: { name: string; price: number }) => {
    setSelectedOptions(prev => {
      const exists = prev.find(opt => opt.name === option.name);
      if (exists) {
        return prev.filter(opt => opt.name !== option.name);
      }
      return [...prev, option];
    });
  };

  const handleAddToCart = () => {
    onAddToCart(item, selectedOptions);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="modal-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="close-button" onClick={onClose}>&times;</button>
          
          <div className="menu-detail">
            <img src={item.image} alt={item.name} className="menu-image" />
            
            <div className="menu-info">
              <h2>{item.name}</h2>
              <p className="description">{item.description}</p>
              
              <div className="info-tags">
                {item.calories && (
                  <span className="tag calories">{item.calories}kcal</span>
                )}
                {item.allergyInfo && item.allergyInfo.length > 0 && (
                  <span className="tag allergy">알레르기 유발 성분</span>
                )}
              </div>

              {item.options && item.options.length > 0 && (
                <div className="options-section">
                  <h3>옵션 선택</h3>
                  <div className="options-grid">
                    {item.options.map((option) => (
                      <label key={option.name} className="option-item">
                        <input
                          type="checkbox"
                          checked={selectedOptions.some(opt => opt.name === option.name)}
                          onChange={() => handleOptionToggle(option)}
                        />
                        <span className="option-name">{option.name}</span>
                        <span className="option-price">+{option.price.toLocaleString()}원</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="price-section">
                <div className="base-price">
                  기본 가격: {item.price.toLocaleString()}원
                </div>
                {selectedOptions.length > 0 && (
                  <div className="options-price">
                    옵션 추가: {selectedOptions.reduce((sum, opt) => sum + opt.price, 0).toLocaleString()}원
                  </div>
                )}
                <div className="total-price">
                  총 금액: {(item.price + selectedOptions.reduce((sum, opt) => sum + opt.price, 0)).toLocaleString()}원
                </div>
              </div>

              <button className="add-to-cart" onClick={handleAddToCart}>
                장바구니에 담기
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MenuDetailModal; 