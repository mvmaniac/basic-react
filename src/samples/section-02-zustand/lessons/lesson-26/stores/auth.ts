import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

interface AuthStore {
  token: string | null;
  isLoggedIn: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}

// [1] createStore는 리액트 훅이 아닌 일반 객체(Store API)를 반환합니다.
export const authStore = createStore<AuthStore>((set) => ({
  token: 'initial-token-123',
  isLoggedIn: true,
  setToken: (token) => set({ token, isLoggedIn: true }),
  logout: () => set({ token: null, isLoggedIn: false }),
}));

// [2] 연결 장치: 바닐라 스토어를 리액트 훅으로 변환합니다.
export const useAuthStore = <T>(selector: (state: AuthStore) => T) => useStore(authStore, selector);
