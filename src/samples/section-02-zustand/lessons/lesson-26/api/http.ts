import axios from 'axios';

import { authStore } from '@/samples/section-02-zustand/lessons/lesson-26/stores/auth.ts';

const http = axios.create({ baseURL: '<https://jsonplaceholder.typicode.com>' });

http.interceptors.request.use((config) => {
  // [getState 활용]: 훅 규칙의 제약을 받지 않습니다.
  // 이 메서드는 호출하는 그 순간의 가장 최신 토큰값을 사진 찍듯 즉시 가져옵니다.
  const token = authStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  console.log('✅ 요청 인터셉터: 토큰 주입 성공');
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (err: unknown) => {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      // [setState 활용]: 리액트 밖에서도 유저를 즉시 로그아웃 시킵니다.
      // 이 코드가 실행되면 스토어를 구독 중인 모든 리액트 화면이 즉시 로그아웃 UI로 변합니다.
      authStore.setState({ token: null, isLoggedIn: false });
    }

    if (err instanceof Error) {
      return Promise.reject(err);
    }

    return Promise.reject(new Error('Unknown response interceptor error'));
  },
);

export default http;
