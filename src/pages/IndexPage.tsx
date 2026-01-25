import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button.tsx';

export default function IndexPage() {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => () => {
    void navigate(path);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Index</h1>
      <div className="flex gap-2">
        <Button onClick={handleNavigate('/counter')}>Counter</Button>
        <Button onClick={handleNavigate('/todo-list')}>Todo List</Button>
      </div>
    </div>
  );
}
