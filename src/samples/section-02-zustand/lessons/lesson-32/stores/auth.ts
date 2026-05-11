import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

interface User {
  name: string;
  role: string;
  id: string;
  lastActive: number;
}

interface AuthState {
  user: User | null;
  login: (user: User) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
}));

export const useUserName = () => useAuthStore((state) => state.user?.name);
export const useLogin = () => useAuthStore((state) => state.login);

export const useSidebarState = () =>
  useAuthStore(
    useShallow((state) => ({
      name: state.user?.name,
      role: state.user?.role,
    })),
  );
