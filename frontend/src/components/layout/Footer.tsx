import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>푸드코트 키오스크</h3>
          <p>편리한 주문 시스템으로 즐거운 식사 시간을 보내세요.</p>
        </div>
        <div className="footer-section">
          <h3>연락처</h3>
          <p>전화: 02-1234-5678</p>
          <p>이메일: info@foodcourt.com</p>
        </div>
        <div className="footer-section">
          <h3>운영시간</h3>
          <p>평일: 10:00 - 22:00</p>
          <p>주말: 10:00 - 21:00</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 푸드코트 키오스크. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 