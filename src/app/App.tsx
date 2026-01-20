import AppProviders from '@/app/AppProviders.tsx';

import AppRoutes from '@/routes';

export default function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}
