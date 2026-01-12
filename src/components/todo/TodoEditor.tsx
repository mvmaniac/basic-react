import { useState } from 'react';

import { useCreateTodo } from '@/stores/todo-store';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TodoEditor() {
  const createTodo = useCreateTodo();
  const [content, setContent] = useState('');

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleAddClick = () => {
    if (content.trim() === '') return;
    createTodo(content);
    setContent('');
  };

  return (
    <div className="flex gap-2">
      <Input
        value={content}
        placeholder="새로운 할 일을 입력하세요..."
        onChange={handleContentChange}
      />
      <Button onClick={handleAddClick}>추가</Button>
    </div>
  );
}
