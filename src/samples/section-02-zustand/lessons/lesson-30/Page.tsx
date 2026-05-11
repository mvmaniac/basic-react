import { Button } from '@/components/ui/button.tsx';

import { useLogin, useUser } from '@/samples/section-02-zustand/lessons/lesson-30/stores/auth.ts';

export default function Lesson30Page() {
  const user = useUser();
  const login = useLogin();

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <p>
        상태: <strong>{user ?? '로그인 안 됨'}</strong>
      </p>
      <Button onClick={() => login('리액트 시니어')} style={{ padding: '10px 20px' }}>
        &apos;리액트 시니어&apos;로 로그인
      </Button>
      <p style={{ marginTop: '20px', color: '#666' }}>버튼을 누른 뒤 F12 콘솔을 확인하세요!</p>
    </div>
  );
}
