import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AlertPopup.css';

interface AlertPopupProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const AlertPopup: React.FC<AlertPopupProps> = ({ 
  message, 
  isVisible, 
  onClose, 
  duration = 3000 
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="alert-popup"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          role="alert"
          aria-live="polite"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertPopup; 