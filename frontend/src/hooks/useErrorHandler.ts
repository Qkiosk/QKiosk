import { useState, useCallback } from 'react';

interface ErrorState {
  message: string;
  code?: string;
  details?: any;
}

export const useErrorHandler = () => {
  const [error, setError] = useState<ErrorState | null>(null);

  const handleError = useCallback((error: any) => {
    let errorState: ErrorState;

    if (error.response) {
      // API 에러 처리
      errorState = {
        message: error.response.data.message || '서버 오류가 발생했습니다.',
        code: error.response.status.toString(),
        details: error.response.data
      };
    } else if (error.request) {
      // 네트워크 에러 처리
      errorState = {
        message: '네트워크 연결에 실패했습니다.',
        code: 'NETWORK_ERROR',
        details: error.request
      };
    } else {
      // 기타 에러 처리
      errorState = {
        message: error.message || '알 수 없는 오류가 발생했습니다.',
        code: 'UNKNOWN_ERROR',
        details: error
      };
    }

    setError(errorState);
    
    // 개발 환경에서는 콘솔에 에러 로깅
    if (process.env.NODE_ENV === 'development') {
      console.error('Error details:', errorState);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError
  };
};

export default useErrorHandler; 