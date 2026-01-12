import { Route, Routes } from 'react-router';

import AuthLayout from '@/layouts/AuthLayout';

import SignInPage from '@/pages/auth/SignInPage';
import SignUpPage from '@/pages/auth/SignUpPage';
import CounterPage from '@/pages/counter/CounterPage';
import IndexPage from '@/pages/IndexPage';
import TodoDetailPage from '@/pages/todo/TodoDetailPage';
import TodoListPage from '@/pages/todo/TodoListPage';

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
