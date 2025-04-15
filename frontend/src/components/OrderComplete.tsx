import React from 'react';

interface OrderCompleteProps {
  orderNumber: number;
  onNewOrder: () => void;
}

const OrderComplete: React.FC<OrderCompleteProps> = ({ orderNumber, onNewOrder }) => {
  return (
    <div className="order-complete">
      <h2>주문 완료!</h2>
      <div className="order-number">
        <p>주문번호</p>
        <h1>{orderNumber}</h1>
      </div>
      <p className="message">주문이 완료되었습니다. 잠시만 기다려 주세요.</p>
      <button className="new-order-button" onClick={onNewOrder}>
        새 주문하기
      </button>
    </div>
  );
};

export default OrderComplete; 