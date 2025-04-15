import React, { Component, ErrorInfo } from 'react';
import './ErrorBoundary.css';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // 여기에 에러 로깅 서비스 호출 추가 가능
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <div className="error-icon">!</div>
            <h2>죄송합니다. 오류가 발생했습니다.</h2>
            <p>문제가 지속되면 고객센터로 문의해주세요.</p>
            <button 
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              다시 시도하기
            </button>
            {process.env.NODE_ENV === 'development' && (
              <details className="error-details">
                <summary>오류 상세 정보</summary>
                <pre>{this.state.error?.toString()}</pre>
                <pre>{this.state.errorInfo?.componentStack}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 