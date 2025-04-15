import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
  autoHideDuration?: number;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onClose,
  autoHideDuration = 5000
}) => {
  React.useEffect(() => {
    if (onClose) {
      const timer = setTimeout(onClose, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [onClose, autoHideDuration]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="error-message"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="error-message-content">
            <span className="error-icon">⚠️</span>
            <p>{message}</p>
            {onClose && (
              <button
                className="close-button"
                onClick={onClose}
                aria-label="닫기"
              >
                ×
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage; 