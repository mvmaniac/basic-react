import { Button } from '@/components/ui/button.tsx';

import http from '@/samples/section-02-zustand/lessons/lesson-26/api/http.ts';
import {
  authStore,
  useAuthStore,
} from '@/samples/section-02-zustand/lessons/lesson-26/stores/auth.ts';

export default function Lesson26Page() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const token = useAuthStore((state) => state.token);

  const handleApiCall = () => {
    void http.get('/posts/1');
  };

  const handleExternalLogout = () => {
    authStore.setState({ token: null, isLoggedIn: false });
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <p>로그인 상태: {isLoggedIn ? '✅' : '❌'}</p>
      <p>현재 토큰: {token ?? '없음'}</p>

      <Button onClick={handleApiCall}>API 호출 테스트</Button>
      <Button onClick={handleExternalLogout} style={{ marginLeft: '10px', color: 'red' }}>
        외부에서 로그아웃 (setState)
      </Button>
    </div>
  );
}
