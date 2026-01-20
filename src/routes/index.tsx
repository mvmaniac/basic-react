import { Route, Routes } from 'react-router';

import AuthLayout from '@/layouts/AuthLayout.tsx';

import SignInPage from '@/pages/auth/SignInPage.tsx';
import SignUpPage from '@/pages/auth/SignUpPage.tsx';
import CounterPage from '@/pages/counter/CounterPage.tsx';
import IndexPage from '@/pages/IndexPage.tsx';
import TodoDetailPage from '@/pages/todo/TodoDetailPage.tsx';
import TodoListPage from '@/pages/todo/TodoListPage.tsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/counter" element={<CounterPage />} />
      <Route path="/todo-list" element={<TodoListPage />} />
      <Route path="/todo-list/:id" element={<TodoDetailPage />} />

      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}
