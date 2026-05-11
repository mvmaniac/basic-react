import { Button } from '@/components/ui/button.tsx';

import { Sidebar } from '@/samples/section-02-zustand/lessons/lesson-32/components/Sidebar.tsx';
import { useLogin, useUserName } from '@/samples/section-02-zustand/lessons/lesson-32/stores/auth.ts';

export default function Lesson32Page() {
  const userName = useUserName();
  const login = useLogin();

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <header
        style={{ borderBottom: '2px solid #eee', paddingBottom: '20px', marginBottom: '30px' }}
      >
        <p>상태: {userName ? <strong>{userName}님 접속 중</strong> : '로그인이 필요합니다.'}</p>
      </header>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        <section style={{ flex: 1 }}>
          <h2>데이터 업데이트 테스트</h2>
          <p style={{ color: '#666', fontSize: '14px' }}>
            버튼을 클릭할 때마다 lastActive 시간은 계속 변하지만, <br />
            <strong>name과 role은 동일한 값</strong>을 보냅니다.
          </p>

          <Button
            onClick={() =>
              login({
                name: '리액트 아키텍트',
                role: 'Premium-VIP',
                id: 'user-123',
                lastActive: Date.now(),
              })
            }
            style={{
              padding: '12px 24px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '10px',
            }}
          >
            유저 정보 업데이트 시도
          </Button>

          <div
            style={{
              marginTop: '20px',
              padding: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '5px',
            }}
          >
            <p style={{ margin: 0, fontSize: '13px' }}>
              💡 <strong>확인 방법:</strong>
              <br />
              F12 콘솔을 열고 버튼을 연타해 보세요. <br />
              스토어 데이터는 변하지만, Sidebar 로그는 더 이상 추가되지 않습니다!
            </p>
          </div>
        </section>

        <Sidebar />
      </div>
    </div>
  );
}
