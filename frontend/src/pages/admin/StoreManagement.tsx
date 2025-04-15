import React from 'react';
import { Store } from '../../types';
import './StoreManagement.css';

const StoreManagement: React.FC = () => {
  // 임시 데이터
  const store: Store = {
    id: '1',
    name: '스타벅스 강남점',
    address: '서울특별시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    businessHours: {
      open: '07:00',
      close: '22:00'
    },
    status: 'open',
    tables: 20,
    employees: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return (
    <div className="store-management">
      <div className="page-header">
        <h1>스토어 관리</h1>
        <button className="primary-button">스토어 정보 수정</button>
      </div>

      <div className="store-info-grid">
        <div className="info-card">
          <h3>기본 정보</h3>
          <div className="info-content">
            <div className="info-row">
              <span className="label">스토어명</span>
              <span className="value">{store.name}</span>
            </div>
            <div className="info-row">
              <span className="label">주소</span>
              <span className="value">{store.address}</span>
            </div>
            <div className="info-row">
              <span className="label">연락처</span>
              <span className="value">{store.phone}</span>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h3>운영 정보</h3>
          <div className="info-content">
            <div className="info-row">
              <span className="label">영업 시간</span>
              <span className="value">{store.businessHours.open} - {store.businessHours.close}</span>
            </div>
            <div className="info-row">
              <span className="label">테이블 수</span>
              <span className="value">{store.tables}개</span>
            </div>
            <div className="info-row">
              <span className="label">직원 수</span>
              <span className="value">{store.employees}명</span>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h3>현재 상태</h3>
          <div className="info-content">
            <div className="status-indicator">
              <div className={`status-badge ${store.status}`}>
                {store.status === 'open' ? '영업중' : '영업종료'}
              </div>
            </div>
            <button className="status-toggle-button">
              {store.status === 'open' ? '영업 종료하기' : '영업 시작하기'}
            </button>
          </div>
        </div>

        <div className="info-card">
          <h3>통계</h3>
          <div className="info-content stats-grid">
            <div className="stat-item">
              <span className="stat-value">127</span>
              <span className="stat-label">오늘의 주문</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">￦1.2M</span>
              <span className="stat-label">오늘의 매출</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">98%</span>
              <span className="stat-label">주문 완료율</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">4.8</span>
              <span className="stat-label">평균 평점</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreManagement; 