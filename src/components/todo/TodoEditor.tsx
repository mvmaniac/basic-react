import { useState } from 'react';

import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';

import { useCreateTodo } from '@/queries/todo.mutation.ts';

export default function TodoEditor() {
  const { mutate, isPending } = useCreateTodo();
  const [content, setContent] = useState('');

  const handleContentAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    handleAddClick();
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleAddClick = () => {
    if (content.trim() === '') return;
    mutate(content);
    setContent('');
  };

  return (
    <div className="flex gap-2">
      <Input
        value={content}
        placeholder="새로운 할 일을 입력하세요..."
        onChange={handleContentChange}
        onKeyUp={handleContentAdd}
      />
      <Button disabled={isPending} onClick={handleAddClick}>
        추가
      </Button>
    </div>
  );
}
