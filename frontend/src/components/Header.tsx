import React, { useState } from 'react';
import AuthModal from './AuthModal';
import './Header.css';

const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">키오스크</h1>
        <div className="auth-buttons">
          <button 
            className="login-button"
            onClick={() => handleOpenAuth('login')}
          >
            로그인
          </button>
          <button 
            className="signup-button"
            onClick={() => handleOpenAuth('signup')}
          >
            회원가입
          </button>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </header>
  );
};

export default Header; 