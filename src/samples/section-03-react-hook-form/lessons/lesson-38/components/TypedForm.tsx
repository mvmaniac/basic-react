import { useForm } from 'react-hook-form';

import type { UserProfileForm } from '@/samples/section-03-react-hook-form/lessons/lesson-38/types/form.ts';
import type { SubmitEventHandler } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button.tsx';

export default function TypedForm() {
  // 1. useForm에 제네릭을 주입하여 'UserProfileForm' 규격을 강제합니다.
  const { register, handleSubmit } = useForm<UserProfileForm>({
    defaultValues: {
      userName: '',
      userEmail: '',
      userAge: 0,
      preferences: {
        theme: 'light',
        notifications: true,
      },
    },
    mode: 'onChange', // 실시간 검증 모드
  });

  // 2. SubmitHandler 타입을 사용하여 data 파라미터의 타입을 자동 추론합니다.
  const onSubmit: SubmitHandler<UserProfileForm> = (data) => {
    console.log('데이터 수집 완료:', data);
    alert(`성공: ${data.userName}님 반갑습니다.`);
  };

  const handleFormSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    void handleSubmit(onSubmit)(e);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>무결점 타입 폼 시스템</h2>
      <form
        onSubmit={handleFormSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
        {/* userName이 UserProfileForm에 없으면 여기서 바로 빨간 줄이 뜹니다. */}
        <input {...register('userName')} placeholder="성함 (오타 시 에러)" />
        <input {...register('userEmail')} placeholder="이메일 주소" />
        <input type="number" {...register('userAge')} placeholder="나이" />

        <fieldset style={{ padding: '10px', borderRadius: '5px' }}>
          <legend>환경 설정 (중첩 구조)</legend>
          {/* 점 표기법을 통해 깊은 곳의 타입까지 완벽하게 추론합니다. */}
          <select {...register('preferences.theme')}>
            <option value="light">라이트 모드</option>
            <option value="dark">다크 모드</option>
          </select>
          <br />
          <label>
            <input type="checkbox" {...register('preferences.notifications')} /> 알림 수신 동의
          </label>
        </fieldset>

        <Button
          type="submit"
          style={{
            padding: '10px',
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
          }}
        >
          안전하게 저장하기
        </Button>
      </form>
    </div>
  );
}
