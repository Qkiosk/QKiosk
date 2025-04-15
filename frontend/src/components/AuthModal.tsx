import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AuthModal.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'reset';
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  businessNumber?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    businessNumber: '',
    businessName: '',
    address: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push('비밀번호는 8자 이상이어야 합니다');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('대문자를 포함해야 합니다');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('소문자를 포함해야 합니다');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('숫자를 포함해야 합니다');
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('특수문자(!@#$%^&*)를 포함해야 합니다');
    }
    return errors;
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }

    if (mode !== 'reset') {
      if (!formData.password) {
        newErrors.password = '비밀번호를 입력해주세요';
      } else {
        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length > 0) {
          newErrors.password = passwordErrors.join(', ');
        }
      }
    }

    if (mode === 'signup') {
      if (!formData.name) {
        newErrors.name = '이름을 입력해주세요';
      }
      if (!formData.businessNumber) {
        newErrors.businessNumber = '사업자 등록번호를 입력해주세요';
      } else if (!/^\d{10}$/.test(formData.businessNumber)) {
        newErrors.businessNumber = '올바른 사업자 등록번호 형식이 아닙니다';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (mode === 'login') {
        // TODO: 로그인 API 호출
        console.log('로그인:', { email: formData.email, password: formData.password });
      } else if (mode === 'signup') {
        // TODO: 회원가입 API 호출
        console.log('회원가입:', formData);
      } else if (mode === 'reset') {
        // TODO: 비밀번호 재설정 API 호출
        console.log('비밀번호 재설정:', formData.email);
      }
    } catch (error) {
      console.error('Error:', error);
      // TODO: 에러 처리
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 실시간 유효성 검사를 위해 에러 초기화
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSocialLogin = (provider: 'google' | 'kakao' | 'naver') => {
    // TODO: 소셜 로그인 구현
    console.log(`${provider} 로그인`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="auth-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="auth-modal-content"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <button className="close-button" onClick={onClose}>&times;</button>
            
            <div className="auth-header">
              <h2>
                {mode === 'login' && '로그인'}
                {mode === 'signup' && '회원가입'}
                {mode === 'reset' && '비밀번호 재설정'}
              </h2>
              {mode !== 'reset' && (
                <p className="auth-switch">
                  {mode === 'login' ? '계정이 없으신가요? ' : '이미 계정이 있으신가요? '}
                  <button 
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    className="switch-button"
                  >
                    {mode === 'login' ? '회원가입' : '로그인'}
                  </button>
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {mode === 'signup' && (
                <>
                  <div className="form-group">
                    <label htmlFor="name">이름 *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="businessNumber">사업자 등록번호 *</label>
                    <input
                      type="text"
                      id="businessNumber"
                      name="businessNumber"
                      value={formData.businessNumber}
                      onChange={handleChange}
                      placeholder="'-' 없이 10자리 숫자"
                      required
                      className={errors.businessNumber ? 'error' : ''}
                    />
                    {errors.businessNumber && (
                      <span className="error-message">{errors.businessNumber}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="businessName">상호명</label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">주소</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phoneNumber">전화번호</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="'-' 없이 숫자만 입력"
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="email">이메일 *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              {mode !== 'reset' && (
                <div className="form-group">
                  <label htmlFor="password">비밀번호 *</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className={errors.password ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '숨기기' : '보기'}
                    </button>
                  </div>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
              )}

              {mode === 'signup' && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">비밀번호 확인 *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  {errors.confirmPassword && (
                    <span className="error-message">{errors.confirmPassword}</span>
                  )}
                </div>
              )}

              <button 
                type="submit" 
                className={`submit-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  mode === 'login' ? '로그인' : 
                  mode === 'signup' ? '회원가입' : 
                  '비밀번호 재설정 링크 받기'
                )}
              </button>

              {mode === 'login' && (
                <button
                  type="button"
                  className="forgot-password"
                  onClick={() => setMode('reset')}
                >
                  비밀번호를 잊으셨나요?
                </button>
              )}
            </form>

            {mode !== 'reset' && (
              <div className="social-login">
                <p className="divider">또는</p>
                <div className="social-buttons">
                  <button
                    type="button"
                    className="social-button google"
                    onClick={() => handleSocialLogin('google')}
                  >
                    Google로 계속하기
                  </button>
                  <button
                    type="button"
                    className="social-button kakao"
                    onClick={() => handleSocialLogin('kakao')}
                  >
                    카카오로 계속하기
                  </button>
                  <button
                    type="button"
                    className="social-button naver"
                    onClick={() => handleSocialLogin('naver')}
                  >
                    네이버로 계속하기
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal; 