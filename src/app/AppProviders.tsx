import { BrowserRouter } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { ReactNode } from 'react';

import { ENV } from '@/shared/constants';

interface AppProvidersProps {
  children: ReactNode;
}

const isEnableRqDevtools = ENV.isDev || ENV.enableRqDevtools;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true, // 마운트 시 stale이면 refetch
      refetchOnReconnect: true, // 네트워크 복구 시 refetch
      refetchOnWindowFocus: false, // 해당 브라우저로 포커스 시 refetch 끔
      staleTime: isEnableRqDevtools ? 0 : 1000 * 60, // 개발은 0, 그 이외에는 1분간 fresh 유지 (1000 * 60)
      gcTime: 1000 * 60 * 5, // 5분간 캐시 유지 (기본값)
      retry: 1,
    },
  },
});

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {isEnableRqDevtools && <ReactQueryDevtools />}
        {children}
      </QueryClientProvider>
    </BrowserRouter>
  );
}
