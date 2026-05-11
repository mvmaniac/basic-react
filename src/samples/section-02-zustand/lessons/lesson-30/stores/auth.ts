import { create } from 'zustand';

import { logger } from '@/samples/section-02-zustand/lessons/lesson-30/stores/middleware/logger.ts';

interface AuthState {
  user: string | null;
  login: (name: string) => void;
}

const useAuthStore = create<AuthState>()(
  logger(
    (set) => ({
      user: null,
      login: (name) => set({ user: name }),
    }),
    'AuthStore',
  ),
);

export const useUser = () => useAuthStore((state) => state.user);
export const useLogin = () => useAuthStore((state) => state.login);
