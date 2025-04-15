import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PaymentModal.css';

interface PaymentModalProps {
  totalAmount: number;
  onClose: () => void;
  onConfirm: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ totalAmount, onClose, onConfirm }) => {
  const [step, setStep] = useState<'method' | 'processing' | 'complete'>('method');
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const handlePayment = useCallback(() => {
    if (!selectedMethod) return;
    
    setStep('processing');
    // 실제 결제 처리는 여기서 구현
    setTimeout(() => {
      setStep('complete');
      setTimeout(() => {
        onConfirm();
      }, 2000);
    }, 2000);
  }, [selectedMethod, onConfirm]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && step === 'method') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose, step]);

  useEffect(() => {
    // 모달이 열릴 때 스크롤 방지
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div 
      className="payment-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-title"
    >
      <motion.div 
        className="payment-content"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {step === 'method' && (
            <motion.div
              key="method"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="payment-step"
            >
              <div className="payment-header">
                <h3 id="payment-title">결제 방법 선택</h3>
                <button 
                  className="close-button" 
                  onClick={onClose}
                  aria-label="결제 창 닫기"
                >
                  &times;
                </button>
              </div>
              
              <div 
                className="payment-methods"
                role="radiogroup"
                aria-label="결제 수단 선택"
              >
                {['신용카드', '간편결제', '현금'].map(method => (
                  <label 
                    key={method} 
                    className={`payment-method ${selectedMethod === method ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={selectedMethod === method}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      aria-label={`${method} 선택`}
                    />
                    <span className="method-name">{method}</span>
                  </label>
                ))}
              </div>

              <div className="payment-summary">
                <div className="total-amount" aria-live="polite">
                  <span>총 결제금액</span>
                  <span className="amount">{totalAmount.toLocaleString()}원</span>
                </div>
                <button 
                  className="pay-button"
                  disabled={!selectedMethod}
                  onClick={handlePayment}
                  aria-label={`${totalAmount.toLocaleString()}원 결제하기`}
                >
                  결제하기
                </button>
              </div>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="payment-step processing"
              role="alert"
              aria-live="assertive"
            >
              <div className="loading-spinner" aria-hidden="true"></div>
              <h3>결제 처리중...</h3>
              <p>잠시만 기다려주세요.</p>
            </motion.div>
          )}

          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="payment-step complete"
              role="alert"
              aria-live="assertive"
            >
              <div className="success-icon" aria-hidden="true">✓</div>
              <h3>결제 완료</h3>
              <p>주문이 성공적으로 완료되었습니다.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(PaymentModal); 