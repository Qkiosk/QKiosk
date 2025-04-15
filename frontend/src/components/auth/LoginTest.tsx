import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { testAccounts } from '../../data/testAccounts';
import './Auth.css';

const LoginTest: React.FC = () => {
  const { login, user, logout } = useAuth();
  const [testResult, setTestResult] = useState<string[]>([]);

  const addTestResult = (result: string) => {
    setTestResult(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testLogin = async (email: string, password: string, expectedRole: string) => {
    try {
      await login(email, password);
      if (user?.role === expectedRole) {
        addTestResult(`✅ 로그인 성공 (${expectedRole})`);
      } else {
        addTestResult(`❌ 역할 불일치: 예상 ${expectedRole}, 실제 ${user?.role}`);
      }
    } catch (error) {
      addTestResult(`❌ 로그인 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  };

  const testLogout = async () => {
    try {
      await logout();
      addTestResult('✅ 로그아웃 성공');
    } catch (error) {
      addTestResult(`❌ 로그아웃 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  };

  const runAllTests = async () => {
    setTestResult([]);
    addTestResult('테스트 시작...');

    // 관리자 로그인 테스트
    await testLogin(testAccounts.admin.email, testAccounts.admin.password, 'admin');
    await testLogout();

    // 일반 사용자 로그인 테스트
    await testLogin(testAccounts.user.email, testAccounts.user.password, 'user');
    await testLogout();

    // 잘못된 비밀번호 테스트
    await testLogin(testAccounts.admin.email, 'wrongpassword', 'admin');
    await testLogout();

    addTestResult('테스트 완료');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>로그인 테스트</h2>
        <button onClick={runAllTests} className="auth-button">
          전체 테스트 실행
        </button>
        <div className="test-results">
          {testResult.map((result, index) => (
            <div key={index} className="test-result-item">
              {result}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginTest; 