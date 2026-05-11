import { Component } from 'react';

import type { ErrorInfo, ReactNode } from 'react';

// 1. Props 설계: 무엇을 감싸고, 실패 시 무엇을 보여줄 것인가?
interface Props {
  children: ReactNode; // 무엇이든 담을 수 있는 보자기
  fallback: ReactNode; // 에러 발생 시 보여줄 대피소 UI
}

// 2. State 설계: 에러 발생 여부와 에러 객체를 보관함
interface State {
  hasError: boolean;
  error: unknown; // 정체를 알 수 없는 에러를 위해 unknown 사용
}

export default class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // [메서드]: 에러 발생 시 상태를 '에러 모드'로 즉시 전환합니다.
  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, error };
  }

  // [메서드]: 에러의 상세 정보를 외부 로그 서비스에 기록할 때 사용합니다.
  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    console.error('🚨 에러 감지 지점 정보:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      let errorMessage = '알 수 없는 시스템 오류가 발생했습니다.';

      // [핵심 절차]: unknown 에러의 신분을 확인하여 타입을 좁힙니다.
      if (this.state.error instanceof Error) {
        errorMessage = this.state.error.message;
      }

      return (
        <div
          style={{
            padding: '30px',
            border: '2px solid red',
            borderRadius: '12px',
            backgroundColor: '#fff5f5',
          }}
        >
          <h2 style={{ color: '#e53e3e' }}>시스템 보호 모드 작동 중</h2>
          <p style={{ fontSize: '1.1rem' }}>
            에러 내용: <strong>{errorMessage}</strong>
          </p>
          <div style={{ marginTop: '20px' }}>{this.props.fallback}</div>
        </div>
      );
    }

    // 에러가 없다면 평소처럼 자식 컴포넌트들을 렌더링합니다.
    return this.props.children;
  }
}
