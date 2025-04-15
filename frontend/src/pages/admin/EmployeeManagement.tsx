import React, { useState } from 'react';
import { Employee } from '../../types';
import './EmployeeManagement.css';

const EmployeeManagement: React.FC = () => {
  // 임시 데이터
  const [employees] = useState<Employee[]>([
    {
      id: 'EMP001',
      storeId: '1',
      name: '김민수',
      email: 'minsu.kim@example.com',
      role: 'MANAGER',
      phoneNumber: '010-1234-5678',
      status: 'ACTIVE',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-03-15T10:30:00Z'
    },
    {
      id: 'EMP002',
      storeId: '1',
      name: '이지원',
      email: 'jiwon.lee@example.com',
      role: 'STAFF',
      phoneNumber: '010-2345-6789',
      status: 'ACTIVE',
      createdAt: '2024-02-01T00:00:00Z',
      updatedAt: '2024-03-15T10:30:00Z'
    },
    {
      id: 'EMP003',
      storeId: '1',
      name: '박서연',
      email: 'seoyeon.park@example.com',
      role: 'STAFF',
      phoneNumber: '010-3456-7890',
      status: 'INACTIVE',
      createdAt: '2024-02-15T00:00:00Z',
      updatedAt: '2024-03-15T10:30:00Z'
    }
  ]);

  const getRoleText = (role: Employee['role']) => {
    switch (role) {
      case 'OWNER': return '점주';
      case 'MANAGER': return '매니저';
      case 'STAFF': return '직원';
      default: return '';
    }
  };

  return (
    <div className="employee-management">
      <div className="page-header">
        <h1>직원 관리</h1>
        <button className="primary-button">새 직원 등록</button>
      </div>

      <div className="employee-grid">
        {employees.map(employee => (
          <div key={employee.id} className="employee-card">
            <div className="employee-header">
              <div className="employee-info">
                <h3>{employee.name}</h3>
                <span className={`role-badge ${employee.role.toLowerCase()}`}>
                  {getRoleText(employee.role)}
                </span>
              </div>
              <div className={`status-indicator ${employee.status.toLowerCase()}`}>
                {employee.status === 'ACTIVE' ? '재직중' : '퇴사'}
              </div>
            </div>

            <div className="employee-details">
              <div className="detail-row">
                <span className="label">이메일</span>
                <span className="value">{employee.email}</span>
              </div>
              <div className="detail-row">
                <span className="label">연락처</span>
                <span className="value">{employee.phoneNumber}</span>
              </div>
              <div className="detail-row">
                <span className="label">입사일</span>
                <span className="value">
                  {new Date(employee.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="employee-actions">
              <button className="edit-button">정보 수정</button>
              {employee.status === 'ACTIVE' ? (
                <button className="deactivate-button">퇴사 처리</button>
              ) : (
                <button className="activate-button">재입사 처리</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeManagement; 