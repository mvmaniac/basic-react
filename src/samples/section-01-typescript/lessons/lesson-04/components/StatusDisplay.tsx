type FetchStatus =
  | { state: 'loading' } // 로딩 중일 땐 데이터가 없음
  | { state: 'success'; data: string } // 성공했을 때만 data가 존재함
  | { state: 'error'; error: Error }; // 에러일 때만 error 객체가 존재함

interface StatusDisplayProps {
  status: FetchStatus;
}

export default function StatusDisplay({ status }: StatusDisplayProps) {
  // state 이름표를 확인하는 순간(Narrowing), 타입스크립트는 데이터의 존재를 확신합니다.
  if (status.state === 'success') {
    return <div style={{ color: 'green' }}>✅ {status.data}</div>;
  }

  if (status.state === 'error') {
    return <div style={{ color: 'red' }}>❌ {status.error.message}</div>;
  }

  return <div>⏳ 로딩 중...</div>;
}
